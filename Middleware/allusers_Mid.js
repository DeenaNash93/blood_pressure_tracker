const { addSlashes, stripSlashes } = require('slashes');
const history = require('./history_Mid.js');


async function ReadAllUsers(req,res,next){
    let month=req.body.month;
    let year=req.body.year;
    let user_id=req.body.user_id;
    let sumOfHighVal=0, sumOfLowVal=0,sumOfPulse=0;
    let cntHighVal=0,cntLowVal=0,cntPulse=0;
    let Query = ` SELECT *,`;
    Query+=`  DATE_FORMAT(date, "%d-%m-%Y") AS`;
    Query+=`  formatted_date`;
    Query+=`  FROM blood_pressure_values`;
    Query+= ` WHERE MONTH(date) =`;
    Query+= ` ${month} `;
    Query+=`  AND YEAR(date) =`;
    Query+= `${year} `;
    Query+= `AND id_user = '${user_id}' `;
    Query+=`  ORDER BY date`;
    const promisePool = db_pool.promise();
    let rows=[];

    try {
        [rows] = await promisePool.query(Query);
        console.log(rows)
        for(let idx in rows){
            rows[idx].date = stripSlashes(rows[idx].formatted_date);
            sumOfHighVal += parseFloat(rows[idx].high_val) || 0;
            sumOfLowVal += parseFloat(rows[idx].low_val) || 0;
            sumOfPulse += parseFloat(rows[idx].pulse) || 0;
            cntHighVal+=(history.IsDeviation1(rows[idx].high_val))?1:0;
            cntLowVal+=(history.IsDeviation2(rows[idx].low_val))?1:0;
            cntPulse+=(history.IsDeviation3(rows[idx].pulse))?1:0;
        }
        console.log("high,low,pulse", sumOfHighVal, sumOfLowVal, sumOfPulse)
        req.success=true;
        req.all_users_data=rows;
        if (rows.length > 0) {
            req.high_Val_avg = sumOfHighVal / rows.length;
            req.low_Val_avg = sumOfLowVal / rows.length;
            req.pulse_avg = sumOfPulse / rows.length;
        } else {
            req.high_Val_avg = 0;
            req.low_Val_avg = 0;
            req.pulse_avg = 0;
        }
        req.cntHighVal=(cntHighVal);
        req.cntLowVal=(cntLowVal);
        req.cntPulse=(cntPulse);
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}


module.exports = {
    ReadAllUsers:ReadAllUsers,
}