import axios from 'axios'
import { useRouter } from 'vue-router';
const router = useRouter();
const domainPara = 'http://127.0.0.1:443'
const upload = '/ly0/upload-req/image'
const upload_carplate = '/ly0/upload-req/carplate'

// 后端请求
async function request({
    domain,
    url, // 路由
    data // 请求数据
}) {
    let t0 = new Date() // 计时
    try {
        const response = await axios({
            url: (domain ? domain : '') + (url ? url : ''),
            method: 'post',
            dataType: 'json',
            data: data ?? null
        })
        return response // response.data
    } catch (err) {
        console.log('错误：', err)
        return err
    }
}

// ly0后端请求
async function ly0request({
    domain,
    url, // 路由
    data, // 请求数据
}){
    try {
        const response = await request({domain, url, data})

        // session 异常
        if (response.data.sessionStatusCode && response.data.sessionStatusCode !== 0) {
            console.log('session异常', response.data.sessionStatusMessage)

            let ly0session = ly0sessionLoad()
            ly0sessionSave({
                session: {
                    usertbl:
                        ly0session && ly0session.session && ly0session.session.usertbl
                        ? ly0session.session.usertbl
                        : 'ly0d0user',
                },
            })
            ly0sessionLose()
            return { code: 1, message: 'session 异常' }
        }

        return response.data
    } catch (err) {
        console.log('错误：', err)
        return err
    }
}

// 存储过程
async function storpro({
    domain,
    storproName, // 存储过程名称
    data,
    noSession = false, // 不进行session验证
}) {
    try {
        const result = await ly0request({
            domain,
            url: '/ly0/storpro/exec',
            data: {
                noSession:
                    noSession && (noSession === true || noSession === 'true')
                    ? noSession
                    : false,
                ly0session: ly0sessionLoad(),
                storproBody: {
                    storproName,
                    data: data ?? null,
                },
            },
        })
        return result
    } catch (err) {
        console.log('错误：', err)
        return err
    }
}

// session缓存
function ly0sessionSave(ly0session) {
    localStorage.setItem('ly0session', JSON.stringify(ly0session))
}

// session获取
function ly0sessionLoad() {
    return JSON.parse(localStorage.getItem('ly0session'))
}

// session清除
function ly0sessionClear() {
    localStorage.clear()
}

// session丢失
function ly0sessionLose() {
    let ly0session = ly0sessionLoad(),
        lose = false,
        route = ''
    if (
        !ly0session ||
        !ly0session.session ||
        !ly0session.session.usertbl ||
        !ly0session.session.id_user
    ) {
        lose = true
        switch (ly0session.session.usertbl) {
        case 'ly0d0user':
            route = '/'
            break
        case 'ly0d7guest':
            route = '/mall/*'
            break
        }
    }
    if (lose) {
        router.replace({ path: route })
    }
    return lose
}

// session丢失
function ly0sessionLoseWithUsertbl(usertbl) {
    let ly0session = ly0sessionLoad(),
        lose = false,
        route = ''
    if (
        !ly0session ||
        !ly0session.session ||
        !ly0session.session.usertbl ||
        !ly0session.session.id_user ||
        ly0session.session.usertbl !== usertbl
    ) {
        lose = true
        switch (usertbl) {
            case 'ly0d0user':
                route = '/'
                break
            case 'ly0d7guest':
                route = '/mall/*'
                break
        }
    }
    if (lose) {
        router.replace({ path: route })
    }
    return lose
}

export default {
    domain: domainPara,
    upload,
    upload_carplate,
    request,
    ly0request,
    storpro,
    ly0sessionSave,
    ly0sessionLoad,
    ly0sessionClear,
    ly0sessionLose,
    ly0sessionLoseWithUsertbl,
}
