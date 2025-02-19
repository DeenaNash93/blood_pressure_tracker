const { addSlashes, stripSlashes } = require('slashes');

async function AddUsers(req,res,next){
    let name   = addSlashes(req.body.name);

    const Query = `INSERT INTO users (name) VALUES('${name}')`;
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
async function ReadUsers(req,res,next){
    const Query = `SELECT * FROM users`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    req.user_by_id=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
            req.user_by_id[rows[idx].id]=rows[idx].name;
        }
        req.success=true;
        req.users_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}
async function UpdateUsers(req,res,next){
    let idx    = parseInt(req.body.id);
    let name   = addSlashes(req.body.name);

    let Query = `UPDATE users SET `;
    Query += ` name = '${name}' `;
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
async function DeleteUsers(req,res,next){
    let idx    = parseInt(req.body.id);
    let Query = `DELETE FROM users  `;
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

module.exports = {
    AddUsers: AddUsers,
    ReadUsers:ReadUsers,
    UpdateUsers:UpdateUsers,
    DeleteUsers:DeleteUsers,
}