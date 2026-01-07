import { withTable } from '@yoooloo42/joker'

export default {
    formProps: {
        popup: {
            switch: true,
            visible: false,
            title: "新增"
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
                await withTable.submitInsertOne({scopeThis})
            }
        }
    },
    formData: {
        _id: null,
        id_business: null,
        businesstype_code: "",
        businesstype_text: "",

        amount: 0,
        amount0: 0,
        process_code: "",
        process_text: "",
        method_code: "",
        method_text: "",
        status_code: "",
        status_text: "",
        time: null,
        end: null,
        note: "",
        rec: "",

        wxzf_appid: "",
        wxzf_mchid: "",
        wxzf_code_url: "",
        wxzf_out_trade_no: "",
        wxzf_transaction_id: "",
        wxzf_trade_type: "",
        wxzf_trade_state: "",
        wxzf_trade_state_desc: "",
        wxzf_bank_type: "",
        wxzf_success_time: "",
        wxzf_payer_openid: "",
        wxzf_amount_total: 0
    }
}
