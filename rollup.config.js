import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

import vue from 'rollup-plugin-vue';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import external from 'rollup-plugin-peer-deps-external';

// 判断是否为生产环境（通过运行命令时传入的环境变量判断）
const isProduction = process.env.NODE_ENV === 'production';

export default {
    // 入口文件
    input: 'src/index.js',

    // 插件列表 (Rollup 是通过插件扩展功能的)
    plugins: [
        // 1. **外部依赖 (External):** 必须放在最前面。
        //    它标记哪些导入是外部的，防止后续插件尝试去处理或解析它们。
        external(),

        // 2. **处理 Vue SFC (Vue):** 紧随其后。
        //    它接收 .vue 文件，并输出 .js (渲染函数) 和 .css (样式)。
        vue({
            target: 'browser',
            css: true,
        }),

        // 3. **模块解析 (Resolve):** 必须在 Vue 之后，CommonJS 之前。
        //    它让 Rollup 知道如何定位 Vue 插件输出的 JS 文件中可能存在的 node_modules 导入。
        resolve(),

        // 4. **CommonJS 转换 (CommonJS):** 必须在 Resolve 之后，Babel 之前。
        //    它将那些非 ES 模块格式的依赖转换为 Rollup 可以理解的 ES Modules 格式。
        commonjs(),

        // 5. **语法转换 (Babel):** 放在所有解析和转换之后。
        //    它处理 Vue 插件和 CommonJS 插件输出的最终 JavaScript 代码。
        babel({
            // 排除 node_modules
            exclude: 'node_modules/**',
            // 开启运行时 helper
            babelHelpers: 'bundled',
            // 确保 Vue 组件内的 JSX/TSX 等被正确处理
            presets: ['@babel/preset-env'],
        }),

        // 6. **样式处理 (PostCSS):** 放在所有代码转换之后。
        //    它接收 Vue 插件导出的 CSS，并进行处理（例如抽取或压缩）。
        postcss({
            // 抽取 CSS 到单独的文件（推荐，或内联）
            extract: 'dist/bundle.css',
        }),

        // 7. **代码压缩 (Terser):** 放在最后（通常只在生产环境）。
        isProduction && terser(),
    ],

    // 将 Vue 设为外部依赖 (如果 external() 插件没起作用，手动添加)
    external: [
        'vue',
        'element-plus'
    ],

    // 输出配置
    output: [
        {
            // CommonJS 格式 (通常用于 Node.js 环境，对应 package.json 的 "main")
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: true,
        },
        {
            // ES Module 格式 (通常用于现代浏览器和打包工具，对应 package.json 的 "module")
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: true,
        }
    ],
};