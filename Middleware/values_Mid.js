const { addSlashes, stripSlashes } = require('slashes');

async function AddValues(req,res,next){

    let user_id   = (req.body.user_id   === undefined)      ? -1: parseInt(req.body.user_id    );
    let high_Val  = (req.body.high_Val  === undefined)      ? 0 : parseInt(req.body.high_Val   );
    let low_Val   = (req.body.low_Val   === undefined)      ? 0 : parseInt(req.body.low_Val    );
    let pulse     = (req.body.pulse     === undefined)      ? 0 : parseInt(req.body.pulse      );
    let date       = (req.body.date      === undefined)      ? "" : addSlashes(req.body.date    );

    let Query = "INSERT INTO blood_pressure_values ";
    Query+= "(`id_user`,`high_val`,`low_val`, `pulse`, `date`)";
    Query+= "VALUES";
    Query+= `('${user_id}','${high_Val}','${low_Val}','${pulse}','${date}')`;

    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;
    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
}


async function ReadValues(req,res,next)
{
    let Query = 'SELECT *';
    Query   += ',DATE_FORMAT(date,"%d-%m-%Y") AS formatted_date  ';
    Query   += ' FROM  blood_pressure_values ';
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows)
        {
            rows[idx].date = stripSlashes(rows[idx].formatted_date);
            delete rows[idx].formatted_date;
        }
        req.success=true;
        req.all_values=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function UpdateValues(req,res,next){
    let idx      = parseInt(req.body.values_id);
    let high_Val = parseInt(req.body.high_Val) ;
    let low_Val  = parseInt(req.body.low_Val) ;
    let pulse    = parseInt(req.body.pulse);
    let date  =  addSlashes(req.body.date);

    let Query = `UPDATE blood_pressure_values SET `;
    Query += ` high_val     = '${high_Val  }', `;
    Query += ` low_val      = '${low_Val   }', `;
    Query += ` pulse        = '${pulse     }', `;
    Query += ` date         = '${date      }' ` ;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function DeleteValues(req,res,next){
    let idx    = parseInt(req.body.values_id);
    let Query = `DELETE FROM blood_pressure_values   `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success = rows.affectedRows > 0
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

module.exports =
    {
    AddValues: AddValues,
    ReadValues:ReadValues,
    UpdateValues:UpdateValues,
    DeleteValues:DeleteValues,
}