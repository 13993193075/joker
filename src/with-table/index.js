// with-table数据模板

// scopeThis.tableData.data 表格数据
// scopeThis.tableData.total 查询总记录数
// scopeThis.tableProps 表格属性

// scopeThis.formData 表单数据，用于查询、新增、修改等
// scopeThis.formProps 表单属性

// scopeThis.queryInit.formData 查询初始化相关 - 表单数据
// scopeThis.queryInit.sort 排序
// scopeThis.queryInit.pageSize 页记录数
// scopeThis.queryInit.currentPage 默认当前页号

// scopeThis.query.formData 当前查询相关 - 表单数据
// scopeThis.query.sort 排序
// scopeThis.query.pageSize 页记录数
// scopeThis.query.currentPage 默认当前页号

// scopeThis.pgData.query 页面数据查询对象
// scopeThis.pgData.data 页面数据

// scopeThis.storpro.refresh 存储过程 - 数据刷新
// scopeThis.storpro.getPgData 获取页面数据
// scopeThis.storpro.insertOne 新增一条记录
// scopeThis.storpro.updateOne 修改一条记录
// scopeThis.storpro.deleteOne 删除一条记录

// scopeThis.find.formProps 查询表单属性

// scopeThis.insertOne.formData
// scopeThis.insertOne.formProps 新增一条记录表单属性

// scopeThis.updateOne.formData
// scopeThis.updateOne.formProps 修改一条记录表单属性

// scopeThis.doc.formData
// scopeThis.doc.formProps 选中记录表单属性

import { getCurrentInstance } from 'vue'
import { ly0 as ly0request } from '../request/index.js'
import {unclassified as beanUnclass} from '@yoooloo42/bean'

const {proxy} = getCurrentInstance()
const ly0default = {
    pageSize: 10,
    currentPage: 1,
}

// 数据刷新
const refresh = async ({scopeThis}) => {
    const result = await ly0request.ly0.storpro({
        storproName: scopeThis.storpro.refresh,
        data: {
            query: scopeThis.query && scopeThis.query.formData ? scopeThis.query.formData : null,
            sort: scopeThis.query && scopeThis.query.sort ? scopeThis.query.sort : null,
            limit: scopeThis.query && scopeThis.query.pageSize ? scopeThis.query.pageSize : ly0default.pageSize,
            page: scopeThis.query && scopeThis.query.currentPage ? scopeThis.query.currentPage : ly0default.currentPage,
        }
    })
    if(result.code === 0){
        scopeThis.tableData = {
            data: result.data,
            total: result.total
        }
    }
    return {code: result.code, message: result.message}
}

// 数据重载
const reload = async ({scopeThis}) => {
    scopeThis.query = scopeThis.queryInit
        ? beanUnclass.deepClone.deepClone(scopeThis.queryInit) : null
    const result = await refresh({scopeThis})
    proxy.$message(result.code === 0 ? '数据已重载' : '数据重载错误')
}

// 获取页面数据
const getPgData = async ({scopeThis}) => {
    const result = await ly0request.ly0.storpro({
        storproName: scopeThis.storpro.getPgData,
        data: scopeThis.pgData && scopeThis.pgData.query ? scopeThis.pgData.query : null,
    })
    if(result.code === 0){
        scopeThis.pgData = beanUnclass.deepClone.deepMerge(scopeThis.pgData, {data: result.data})
        proxy.$message('已获取页面数据')
        return
    }
    proxy.$message('获取页面数据错误')
}

// 页面初始化
const init = async ({scopeThis}) => {
    if(scopeThis.pgData) {
        await getPgData({scopeThis})
    }
    await reload({scopeThis})
}

// 弹出查询页面
const popupFind = async ({scopeThis}) => {
    scopeThis.formData = scopeThis.query && scopeThis.query.formData
        ? beanUnclass.deepClone.deepClone(scopeThis.query.formData) : null
    scopeThis.TableProps.query.sort = scopeThis.query && scopeThis.query.sort
        ? JSON.parse(JSON.stringify(scopeThis.query.sort)) : null
    scopeThis.TableProps.query.pageSize = scopeThis.query && scopeThis.query.pageSize
        ? scopeThis.query.pageSize : ly0default.pageSize
    scopeThis.TableProps.query.currentPage = scopeThis.query && scopeThis.query.currentPage
        ? scopeThis.query.currentPage : ly0default.currentPage
    scopeThis.formProps = beanUnclass.deepClone.deepClone(scopeThis.find.formProps)
    // 弹出窗口
    scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 弹出新增一条记录页面
const popupInsertOne = async ({scopeThis}) => {
    scopeThis.formData = beanUnclass.deepClone.deepClone(scopeThis.insertOne.formData)
    scopeThis.formProps = beanUnclass.deepClone.deepClone(scopeThis.insertOne.formProps)
    // 弹出窗口
    scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
        scopeThis.formProps.popup,
        {visible: true}
    )
}

// 提交查询
const submitFind = async ({scopeThis}) => {
    scopeThis.query.formData = scopeThis.formData
        ? beanUnclass.deepClone.deepClone(scopeThis.formData) : null
    scopeThis.query.sort = scopeThis.tableProps.query && scopeThis.tableProps.query.sort
        ? JSON.parse(JSON.stringify(scopeThis.tableProps.query.sort)) : null
    scopeThis.query.pageSize = scopeThis.tableProps.query && scopeThis.tableProps.query.pageSize
        ? scopeThis.tableProps.query.pageSize : ly0default.pageSize
    scopeThis.query.currentPage = scopeThis.tableProps.query && scopeThis.tableProps.query.currentPage
        ? scopeThis.tableProps.query.currentPage : ly0default.currentPage
    const result = await refresh({scopeThis})
    if(result.code === 0){
        // 关闭窗口
        scopeThis.formProps.popup = beanUnclass.deepClone.deepMerge(
            scopeThis.formProps.popup,
            {visible: false}
        )
        proxy.$message('查询已提交并刷新数据')
    }else{
        proxy.$message('查询错误')
    }
}

export default {
    refresh,
    reload,
    getPgData,
    init,
    popupFind,
    popupInsertOne,
    submitFind
}
