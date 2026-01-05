import { withTable } from '@yoooloo42/joker'

export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "修改"
        },
        cols: [
            {
                items: [
                    {
                        inputType: "input",
                        label: "金额",
                        fieldName: "amount0",
                        style: {width: "100px"}
                    },
                    {
                        inputType: "select",
                        label: "用户自主支付方式",
                        fieldName: "method_code",
                        item_fieldLabel: "text",
                        item_fieldValue: "code",
                        hdlGetItems({scopeThis}){
                            return scopeThis.pgData.data.arrMethod
                        },
                        style: {width: "200px"}
                    },
                    {
                        inputType: "input",
                        label: "备注",
                        fieldName: "note",
                        style: {width: "400px"}
                    }
                ]
            }
        ],
        submit: {
            async handle({scopeThis}){
                await withTable.submitUpdateOne({scopeThis})
            }
        }
    }
}
