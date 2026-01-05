export default {
    fun({records}){
        let unpaid = 0, // 未支付
            started = 0, // 支付中
            succeeded = 0, // 支付成功
            failed = 0; // 支付失败

        records.forEach(i=>{
            if(i.status_code === '0'){
                unpaid = unpaid + i.amount
            }else if(i.status_code === '1'){
                started = started + i.amount
            }else if(i.status_code === '2'){
                succeeded = succeeded + i.amount
            }else if(i.status_code === '3'){
                failed = failed + i.amount
            }
        })

        return {
            sum: succeeded + started + unpaid,
            succeeded,
            started,
            failed,
            unpaid,
        }
    }
}