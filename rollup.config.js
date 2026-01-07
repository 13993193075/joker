import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import json from "@rollup/plugin-json";
import nodePolyfills from 'rollup-plugin-node-polyfills';
import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import url from "@rollup/plugin-url";
import vue from 'rollup-plugin-vue';

// 判断是否为生产环境（通过运行命令时传入的环境变量判断）
const isProduction = process.env.NODE_ENV === 'production';

export default {
    // 入口文件
    input: 'src/index.js',

    // 提示在 node_modules/file-saver/dist/FileSaver.min.js 文件中，顶层的 this 被重写为 undefined
    // 针对 file-saver 库，最常见的修复方法是调整 Rollup 配置，告诉它在这个特定的模块中，
    // 顶层的 this 应该是什么。您可以将其设置为 'window'，因为 file-saver 是一个浏览器环境库
    context: 'window',

    onwarn(warning, warn) {
        // 忽略来自 node_modules 的循环依赖警告
        if (warning.code === 'CIRCULAR_DEPENDENCY' && warning.ids.some(id => id.includes('node_modules'))) {
            return;
        }
        warn(warning);
    },

    // 插件列表 (Rollup 是通过插件扩展功能的)
    // Rollup 配置的关键在于插件顺序，这对确保每个插件在正确的时间作用于代码至关重要
    plugins: [
        // --- 阶段一：确定外部依赖和资源加载 ---

        // 1. **排除对等依赖 (External):** 必须放在**最前面**
        //    作用：将 'vue', 'element-plus' 等标记为外部依赖，防止 Rollup 打包它们
        external(),

        // 2. **JSON 文件处理 (JSON):** 尽早处理，确保 JSON 文件能被其他插件（如 CommonJS）识别
        json(),

        // 3. **资源 URL 处理 (URL):** 处理图片和字体，将其转换为 base64 或文件引用
        url({
            include: ['**/*.png', '**/*.jpg', '**/*.svg', '**/*.gif', '**/*.woff', '**/*.woff2', '**/*.ttf'], // 明确指定需要处理的图片类型
            // limit: 10 * 1024, // 小于 10KB 的图片转为 base64
            // 目标文件夹：将这些资源复制到哪里（例如：dist/assets）
            destDir: 'dist/assets',
            // 在代码中引用时的公共路径
            publicPath: '/assets/', // 确保这与您的项目部署路径匹配
            fileName: 'assets/[name].[hash].[ext]', // 输出文件名格式
        }),

        // --- 阶段二：代码转换与模块解析 ---

        // 4. **处理 Vue SFC (Vue):** 接收 .vue 文件，输出可识别的 JavaScript 和 CSS
        vue({
            target: 'browser',
            css: true,
        }),

        // 5. **模块解析 (Resolve):** 必须在 Vue 之后，CommonJS 之前
        //    作用：告诉 Rollup 如何从 node_modules 中定位模块，并处理导入路径
        resolve({
            // 🚨 关键配置 1：优先使用库中定义的浏览器兼容版本
            browser: true,
            // 🚨 关键配置 2：明确告诉 Rollup 不要尝试捆绑 Node.js 内置模块（现在由 nodePolyfills 处理）
            preferBuiltins: false,
        }),

        // 6. **CommonJS 转换 (CommonJS):** 必须在 Resolve 之后，Babel 之前
        //    作用：将那些非 ES Module 格式（特别是来自 node_modules 的）的依赖转换为 Rollup 可以处理的 ES Modules
        commonjs({
            esmExternals: true,
            defaultIsModuleExports: true,

            /*
            // 启用此选项，帮助 Rollup 更好地处理 CommonJS 模块的命名和默认导出
            // 解决 "default" is not exported 的核心选项
            transformMixedEsModules: true,

            // 🚨 新增：手动配置 CommonJS 模块的命名导出
            // 告诉 Rollup 'file-saver' 这个模块导出了 'saveAs'，
            // 并且其默认导出 (default) 就是 'saveAs' 函数。
            // 这样 Rollup 在处理 import * as FileSaverModule from 'file-saver' 时就不会报错。
            namedExports: {
                // --- 1. 解决 file-saver 报错 ---
                // 告诉 Rollup：该模块导出 'saveAs' 函数，并且它就是 'default' 导出。
                'node_modules/file-saver/dist/FileSaver.min.js': [
                    'saveAs',
                    'default'
                ],

                // --- 2. 解决 quill 报错 ---
                // 解决 vue-quill 尝试导入 'default' 失败的问题.
                'node_modules/quill/dist/quill.js': [
                    'Quill',
                    'default'
                ],

                // --- 3. 解决 quill-delta 间接依赖的报错 ---
                // 解决 Circular dependency 附近的另一个 default 错误.
                'node_modules/quill-delta/dist/Iterator.js': [
                    'default'
                ]
            }
            */
        }),

        // 7. **🚨 Node.js Polyfills 插件 :** 必须在nodeResolve解析和 CommonJS 之后
        //    作用：预先为依赖中使用的 'util', 'stream' 等 Node.js 核心模块提供浏览器端的替代品
        nodePolyfills(),

        // 8. **语法转换 (Babel):** 放在所有解析和转换之后
        //    作用：将 ES Next/JSX/TypeScript 语法转换为目标环境（presets: ['@babel/preset-env']）兼容的 JS 代码
        babel({
            // 排除 node_modules，通常不需要对依赖库进行 Babel 转换
            exclude: 'node_modules/**',
            // 确保 Babel helper（如 _extends）在输出中被捆绑一次
            babelHelpers: 'bundled',
            // 确保 Vue 组件内的 JSX/TSX 等被正确处理
            presets: [
                ['@babel/preset-env', {
                    // 确保目标环境是现代浏览器
                    targets: '> 0.25%, not dead',
                }],
            ],
        }),

        // 9. **样式处理 (PostCSS):** 放在所有代码转换之后
        //    作用：接收 Vue 插件导出的 CSS，并进行处理（Autoprefixer、压缩等）
        postcss({
            extract: 'dist/bundle.css', // 抽取 CSS 到单独的文件（推荐，或内联）

            // 明确指定使用 Sass
            // 警告通常是由于 PostCSS 内部的某个 loader 依赖于旧的 Sass API
            preprocessor: 'sass',
            modules: false,
            // Rollup 的 postcss 插件通常能与 url 插件配合工作，
            // 它会发现 CSS 中的 url() 并交给 url 插件处理
            use: [
                ['sass', {
                    // 显式声明使用现代 API
                    api: 'modern',
                    // 或者使用新的编译器选项
                    silenceDeprecations: ['legacy-js-api'],
                }]
            ],
        }),

        // --- 阶段三：优化与输出 ---

        // 10. **代码压缩 (Terser):** 放在最后，只在生产环境执行
        isProduction && terser(),
    ].filter(Boolean), // 移除条件为 false 的插件 (如开发环境下的 terser)

    // 外部依赖 (显式列出，与 external() 插件协同)
    external: [
        'vue',
        'element-plus'
    ],

    // 输出配置
    output: [
        {
            // CommonJS 格式 (通常用于 Node.js 环境或 require() 导入，对应 package.json 的 "main")
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
            exports: 'named',
        },
        {
            // ES Module 格式 (通常用于现代浏览器和Vite/Webpack 等打包工具，对应 package.json 的 "module")
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
            exports: 'named',
        }
    ],
};