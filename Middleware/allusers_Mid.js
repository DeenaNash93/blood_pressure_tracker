const { addSlashes, stripSlashes } = require('slashes');
const history = require('./history_Mid.js');

async function ReadUsers(req,res,next){
    let month=req.body.month;
    let year=req.body.year;
    let Query = ` SELECT *,`;
    Query+=`  DATE_FORMAT(date, "%d-%m-%Y") AS`;
    Query+=`  formatted_date`;
    Query+=`  FROM blood_pressure_values`;
    Query+= ` WHERE MONTH(date) =`;
    Query+= ` ${month} `;
    Query+=`  AND YEAR(date) =`;
    Query+= `${year} `;
    Query += `  ORDER BY id_user ASC, date ASC`;
    const promisePool = db_pool.promise();
    let rows=[];

    try
    {
        [rows] = await promisePool.query(Query);
        console.log("  חזר מה sql",rows);
        let avgOfHighVal = [];
        let avgOfLowVal = [];
        let avgOfPulse = [];
        let cntHighVal = [];
        let cntLowVal = [];
        let cntPulse = [];
        let user_by_id=[];
        let index = 0;
        let totalCount = 0; // סופר את מספר הרשומות לכל משתמש
        let id_user = null;

        req.all_users_data = [];
        if (rows.length === 0) {
            req.all_users_data = [];
            req.success = true;
            return next();
        }
        if (rows.length > 0)
        {
            id_user = rows[0].id_user;
            avgOfHighVal[index] = 0;
            avgOfLowVal[index] = 0;
            avgOfPulse[index] = 0;
            cntHighVal[index] = 0;
            cntLowVal[index] = 0;
            cntPulse[index] = 0;
            totalCount = 0;
            user_by_id[index]=id_user;
            for (let idx = 0; idx < rows.length; idx++) {
                rows[idx].date = stripSlashes(rows[idx].formatted_date);

                if (rows[idx].id_user !== id_user)
                {
                    if (totalCount > 0) {
                        avgOfHighVal[index] /= totalCount;
                        avgOfLowVal[index] /= totalCount;
                        avgOfPulse[index] /= totalCount;
                    } else {
                        avgOfHighVal[index] = 0;
                        avgOfLowVal[index] = 0;
                        avgOfPulse[index] = 0;
                    }

                    // שמירת הנתונים של המשתמש הקודם
                    req.all_users_data[index] = {
                        id_user:user_by_id[index],
                        high_val: parseFloat(avgOfHighVal[index]),
                        cnt_high: parseInt(cntHighVal[index]),
                        low_val: parseFloat(avgOfLowVal[index]),
                        cnt_low: parseInt(cntLowVal[index]),
                        pulse: parseFloat(avgOfPulse[index]),
                        cnt_pulse: parseInt(cntPulse[index])
                    };

                    // התחלה חדשה למשתמש הבא
                    index++;
                    id_user = rows[idx].id_user;
                    avgOfHighVal[index] = 0;
                    avgOfLowVal[index] = 0;
                    avgOfPulse[index] = 0;
                    cntHighVal[index] = 0;
                    cntLowVal[index] = 0;
                    cntPulse[index] = 0;
                    totalCount = 0;
                    user_by_id[index]=id_user;
                }

                avgOfHighVal[index] += parseFloat(rows[idx].high_val) || 0;
                avgOfLowVal[index] += parseFloat(rows[idx].low_val) || 0;
                avgOfPulse[index] += parseFloat(rows[idx].pulse) || 0;
                cntHighVal[index] += (history.IsDeviation1(rows[idx].high_val)) ? 1 : 0;
                cntLowVal[index] += (history.IsDeviation2(rows[idx].low_val)) ? 1 : 0;
                cntPulse[index] += (history.IsDeviation3(rows[idx].pulse)) ? 1 : 0;
                totalCount++;
            }

            // חישוב ממוצע עבור המשתמש האחרון
            avgOfHighVal[index] /= totalCount;
            avgOfLowVal[index] /= totalCount;
            avgOfPulse[index] /= totalCount;

            // שמירת הנתונים של המשתמש האחרון
            req.all_users_data[index] = {
                id_user:user_by_id[index],
                high_val: parseFloat(avgOfHighVal[index]),
                cnt_high: parseInt(cntHighVal[index]),
                low_val: parseFloat(avgOfLowVal[index]),
                cnt_low: parseInt(cntLowVal[index]),
                pulse: parseFloat(avgOfPulse[index]),
                cnt_pulse: parseInt(cntPulse[index])
            };

            req.success = true;
        } else
        {
            req.all_users_data = [];
        }
    } catch (err) {
        req.success = false;
        console.log(err);
    }

    next();
}

module.exports = {
    ReadUsers:ReadUsers,
}