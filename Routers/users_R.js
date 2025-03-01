const express = require('express');
const router = express.Router();
module.exports = router;

const users_Mid=require("../Middleware/users_Mid");

router.post('/',[users_Mid.AddUsers], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: "server error"});
    }
});
router.get('/',[users_Mid.ReadUsers], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json(
            {
                msg         :"ok",
                data        :req.users_data,
                users_by_id :req.users_by_id
            });
    } else {
        return res.status(500).json({message:"server error"});
    }

});
router.put('/', [users_Mid.UpdateUsers], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message:"server error"});
    }
});
router.delete('/',[users_Mid.DeleteUsers], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message:"server error"});
    }
});