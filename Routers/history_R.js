const express = require('express');
const users_Mid = require("../Middleware/users_Mid");
const router = express.Router();
module.exports = router;

const history_Mid=require("../Middleware/history_Mid");

router.post('/',[history_Mid.GetValsBetweenDates], (req, res) => {
    if(req.success){
        res.status(200).json(
            {
                msg         :"ok",
                data        :req.arr_history,
                is_bold     :req.is_bold
            });

    } else {
        return res.status(500).json({message: "error"});
    }

});