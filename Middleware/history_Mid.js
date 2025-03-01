const { addSlashes, stripSlashes } = require('slashes');

function IsDeviation1(high_val)
{
    const avg_high_val=120;
    const deviation=20;
    let deviation_h;
    if(high_val>avg_high_val)
    {
       deviation_h= (high_val-avg_high_val)*100/avg_high_val;
       return (deviation_h>=deviation);

    }
    else if(high_val<avg_high_val)
    {
       deviation_h= (avg_high_val-high_val)*100/avg_high_val;
        return (deviation_h>=deviation);
    }

    return false;
}
function IsDeviation2(low_val)
{
    const avg_low_val=80;
    const deviation=20;
    let deviation_l;

    if(low_val>avg_low_val)
    {
        deviation_l= (low_val-avg_low_val)*100/avg_low_val;
        return (deviation_l>=deviation);

    }
    else if(low_val<avg_low_val)
    {
        deviation_l= (avg_low_val-low_val)*100/avg_low_val;
        return (deviation_l>=deviation);
    }
    return false;
}
function IsDeviation3(pulse)
{
    const avg_pulse=80;
    const deviation=20;
    let deviation_p;
    if(pulse>avg_pulse)
    {
        deviation_p= (pulse-avg_pulse)*100/avg_pulse;
        return (deviation_p>=deviation);

    }
    else if(pulse<avg_pulse)
    {
        deviation_p= (avg_pulse-pulse)*100/avg_pulse;
        return (deviation_p>=deviation);
    }
    return false;
}

async function GetValsBetweenDates(req,res,next){
    let min_date=req.body.min_date;
    let max_date=req.body.max_date;
    let idx=req.body.user_id;
    console.log(min_date,max_date,idx);
    let Query = 'SELECT *';
    Query   += ',DATE_FORMAT(date,"%d-%m-%Y") AS formatted_date  ';
    Query   += ' FROM  blood_pressure_values ';
    Query+=`  WHERE date BETWEEN`;
    Query+=` '${min_date}' AND '${max_date}'`;
    Query += ` AND id_user = ${idx}`;
    Query += ` ORDER BY date`;

    const promisePool = db_pool.promise();
    let rows=[];
    req.arr_history=[];
    req.is_bold=[];
    try {
        [rows] = await promisePool.query(Query);
        if (!rows || rows.length === 0)
        {
            console.log("לא הוחזרו נתונים מ sql");
            req.arr_history=rows;
            req.success=true;
        }
        else {
            for(let idx in rows){
                rows[idx].date = rows[idx].formatted_date;
                req.is_bold[idx]=[];
                req.is_bold[idx][0]=IsDeviation1(rows[idx].high_val);
                console.log(rows[idx].high_val);
                req.is_bold[idx][1]=IsDeviation2(rows[idx].low_val);
                console.log(rows[idx].low_val);
                req.is_bold[idx][2]=IsDeviation3(rows[idx].pulse);
                console.log(rows[idx].pulse);
            }
            req.success=true;
            req.arr_history=rows;

        }

    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

module.exports = {
    GetValsBetweenDates: GetValsBetweenDates,
    IsDeviation1:IsDeviation1,
    IsDeviation2:IsDeviation2,
    IsDeviation3:IsDeviation3,

}