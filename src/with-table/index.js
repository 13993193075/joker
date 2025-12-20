// with-table数据模板

// 表格数据
// scopeThis.tableData.data
// scopeThis.tableData.total 查询总记录数
// scopeThis.tableProps 表格属性

// 表单数据，用于查询、新增一条记录、修改一条记录、详细信息等
// scopeThis.formData
// scopeThis.formProps 表单属性

// 查询初始化相关
// scopeThis.queryInit.formData 表单数据
// scopeThis.queryInit.sort 排序
// scopeThis.queryInit.pageSize 页记录数
// scopeThis.queryInit.currentPage 默认当前页号

// 当前查询相关
// scopeThis.query.formData 表单数据
// scopeThis.query.sort 排序
// scopeThis.query.pageSize 页记录数
// scopeThis.query.currentPage 默认当前页号

// 页面数据附加
// scopeThis.pgData.query 查询对象
// scopeThis.pgData.data

// 存储过程
// scopeThis.storpro.refresh 数据刷新
// scopeThis.storpro.getPgData 获取页面数据附加
// scopeThis.storpro.insertOne 新增一条记录
// scopeThis.storpro.updateOne 修改一条记录
// scopeThis.storpro.deleteOne 删除一条记录

// 查询表单
// scopeThis.find.formProps

// 新增一条记录
// scopeThis.insertOne.formData 表单数据初始值
// scopeThis.insertOne.formProps 表单属性

// 修改一条记录
// 表单数据继承行记录的值
// scopeThis.updateOne.formProps 表单属性

// 详细信息
// 表单数据继承行记录的值
// scopeThis.doc.formProps 表单属性

import { ElMessageBox, ElMessage } from 'element-plus'
import { ly0 as ly0request } from '../request/index.js'
import {unclassified as beanUnclass} from '@yoooloo42/bean'

const ly0default = {
    pageSize: 10
}

// 数据刷新
const refresh = async ({scopeThis, message}) => {
    scopeThis.tableProps.table.loading.visible = true
    const result = await ly0request.storpro({
        storproName: scopeThis.storpro.refresh,
        data: {
            query: scopeThis.query && scopeThis.query.formData ? scopeThis.query.formData : null,
            sort: scopeThis.query && scopeThis.query.sort ? scopeThis.query.sort : null,
            limit: scopeThis.query && scopeThis.query.pageSize ? scopeThis.query.pageSize : ly0default.pageSize,
            page: scopeThis.query && scopeThis.query.currentPage ? scopeThis.query.currentPage : 1,
        }
    })
    scopeThis.tableProps.table.loading.visible = false
    if(result.code === 0){
        beanUnclass.deepClone.deepMerge(scopeThis.tableData, {
            data: result.data,
            total: result.total
        })
        if(!!message){
            ElMessage('数据已刷新')
        }
    }else{
        if(!!message){
            ElMessage('数据刷新错误')
        }
    }
    return {code: result.code, message: result.message}
}

// 数据重载
const reload = async ({scopeThis}) => {
    scopeThis.query = scopeThis.queryInit
        ? beanUnclass.deepClone.deepClone(scopeThis.queryInit) : null
    const result = await refresh({scopeThis})
    ElMessage(result.code === 0 ? '数据已重载' : '数据重载错误')
}

// 获取页面数据附加
const getPgData = async ({scopeThis}) => {
    const result = await ly0request.storpro({
        storproName: scopeThis.storpro.getPgData,
        data: scopeThis.pgData && scopeThis.pgData.query ? scopeThis.pgData.query : null,
    })
    if(result.code === 0){
        scopeThis.pgData = beanUnclass.deepClone.deepMerge(scopeThis.pgData, {data: result.data})
        ElMessage('已获取页面数据')
        return
    }
    ElMessage('获取页面数据错误')
}

// 初始化
const init = async ({scopeThis}) => {
    if(scopeThis.pgData) {
        await getPgData({scopeThis})
    }
    await reload({scopeThis})
}

// 弹出 - 查询
const popupFind = async ({scopeThis}) => {
    scopeThis.formData = scopeThis.query && scopeThis.query.formData
        ? beanUnclass.deepClone.deepClone(scopeThis.query.formData) : null
    scopeThis.TableProps.query.sort = scopeThis.query && scopeThis.query.sort
        ? JSON.parse(JSON.stringify(scopeThis.query.sort)) : null
    scopeThis.TableProps.query.pageSize = scopeThis.query && scopeThis.query.pageSize
        ? scopeThis.query.pageSize : ly0default.pageSize
    scopeThis.TableProps.query.currentPage = scopeThis.query && scopeThis.query.currentPage
        ? scopeThis.query.currentPage : 1
    scopeThis.formProps = beanUnclass.deepClone.deepClone(scopeThis.find.formProps)
    // 弹出窗口
    scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出 - 新增一条记录
const popupInsertOne = async ({scopeThis}) => {
    scopeThis.formData = beanUnclass.deepClone.deepClone(scopeThis.insertOne.formData)
    scopeThis.formProps = beanUnclass.deepClone.deepClone(scopeThis.insertOne.formProps)
    // 弹出窗口
    scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出 - 修改一条记录
const popupUpdateOne = async ({scopeThis, formData}) => {
    scopeThis.formData = beanUnclass.deepClone.deepClone(formData) // 继承行记录的值
    scopeThis.formProps = beanUnclass.deepClone.deepClone(scopeThis.UpdateOne.formProps)
    // 弹出窗口
    scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出 - 详细信息
const popupDoc = async ({scopeThis, formData}) => {
    scopeThis.formData = beanUnclass.deepClone.deepClone(formData) // 继承行记录的值
    scopeThis.formProps = beanUnclass.deepClone.deepClone(scopeThis.doc.formProps)
    // 弹出窗口
    scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 提交 - 查询
const submitFind = async ({scopeThis}) => {
    scopeThis.query.formData = scopeThis.formData
        ? beanUnclass.deepClone.deepClone(scopeThis.formData) : null
    scopeThis.query.sort = scopeThis.tableProps.query && scopeThis.tableProps.query.sort
        ? JSON.parse(JSON.stringify(scopeThis.tableProps.query.sort)) : null
    scopeThis.query.pageSize = scopeThis.tableProps.query && scopeThis.tableProps.query.pageSize
        ? scopeThis.tableProps.query.pageSize : ly0default.pageSize
    scopeThis.query.currentPage = scopeThis.tableProps.query && scopeThis.tableProps.query.currentPage
        ? scopeThis.tableProps.query.currentPage : 1
    const result = await refresh({scopeThis})
    if(result.code === 0){
        // 关闭表单窗口
        scopeThis.formProps.popup.visible = false
        ElMessage('查询已提交并刷新数据')
    }else{
        ElMessage('查询错误')
    }
}

// 提交 - 新增一条记录
const submitInsertOne = async ({scopeThis}) => {
    try{
        await ElMessageBox.confirm('新增一条记录, 提交?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning', // 警告图标
        })
        const result = await ly0request.storpro({
            storproName: scopeThis.storpro.insertOne,
            data: scopeThis.formData
        })
        if(result.code === 0){
            // 关闭表单窗口
            scopeThis.formProps.popup.visible = false
            ElMessage('新增一条记录成功')
            scopeThis.query.currentPage = 1
            scopeThis.tableData = {
                data: result.dataNew,
                total: 1
            }
        }else{
            ElMessage('新增一条记录失败')
        }
    }catch(error){
        ElMessage('已取消')
    }
}

// 提交 - 修改一条记录
const submitUpdateOne = async ({scopeThis}) => {
    try{
        await ElMessageBox.confirm('修改一条记录, 提交?', '提示', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning', // 警告图标
        })
        const result = await ly0request.storpro({
            storproName: scopeThis.storpro.updateOne,
            data: scopeThis.formData
        })
        if(result.code === 0){
            // 关闭表单窗口
            scopeThis.formProps.popup.visible = false
            ElMessage('修改一条记录成功')
            const resultRefresh = await refresh({scopeThis})
            if(resultRefresh.code === 0){
                ElMessage('已刷新数据')
            }else{
                ElMessage('刷新错误')
            }
        }else{
            ElMessage('修改一条记录失败')
        }
    }catch(error){
        ElMessage('已取消')
    }
}

// 提交 - 删除一条记录
const submitDeleteOne = async ({scopeThis, formData}) => {
    try{
        await ElMessageBox.confirm('删除一条记录, 提交?', '警告', {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning', // 警告图标
        })
        const result = await ly0request.storpro({
            storproName: scopeThis.storpro.deleteOne,
            data: formData // 继承行记录的值
        })
        if(result.code === 0){
            ElMessage('删除一条记录成功')
            const resultRefresh = await refresh({scopeThis})
            if(resultRefresh.code === 0){
                ElMessage('已刷新数据')
            }else{
                ElMessage('刷新错误')
            }
        }else{
            ElMessage('删除一条记录失败')
        }
    }catch(error){
        ElMessage('已取消')
    }
}

export default {
    refresh,
    reload,
    getPgData,
    init,
    popupFind,
    popupInsertOne,
    popupUpdateOne,
    popupDoc,
    submitFind,
    submitInsertOne,
    submitUpdateOne,
    submitDeleteOne
}
