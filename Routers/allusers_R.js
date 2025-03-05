const express = require('express');
const router = express.Router();
module.exports = router;

const allusers_Mid=require("../Middleware/allusers_Mid");

router.post('/',[allusers_Mid.ReadUsers], (req, res) => {
    if(req.success)
    {
        res.status(200).json(
            {
            msg:"ok",
            all_users_data:req.all_users_data
            });
    }
    else {
        return res.status(500).json({message: "server error"});
    }
});