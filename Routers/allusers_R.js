const express = require('express');
const router = express.Router();
module.exports = router;

const allusers_Mid=require("../Middleware/allusers_Mid");

router.post('/',[allusers_Mid.ReadAllUsers], (req, res) => {
    if(req.success)
    {
        res.status(200).json(
            {
            msg:"ok",all_users_data:req.all_users_data,
            high_Val_avg: req.high_Val_avg,
            low_Val_avg:req.low_Val_avg,
            pulse_avg:req.pulse_avg,
            cntHighVal: req.cntHighVal,
            cntLowVal:req.cntLowVal,
            cntPulse:req.cntPulse
            });
    }
    else {
        return res.status(500).json({message: "server error"});
    }
});