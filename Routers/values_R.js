const express = require('express');
const router = express.Router();
module.exports = router;

const values_Mid=require("../Middleware/values_Mid");

router.post('/',[values_Mid.AddValues], (req, res) => {
    if(req.success){
        res.status(200).json({msg:"ok",Last_Id:req.insertId});
    } else {
        return res.status(500).json({message: "server error"});
    }
});
router.get('/',[values_Mid.ReadValues], (req, res) => { //Read - קבלת רשימה
    if(req.success){
        res.status(200).json(
            {
                msg         :"ok",
                data        :req.all_values,
                values_by_id:req.values_by_id
            });
    } else {
        return res.status(500).json({message: "server error"});
    }

});
router.put('/', [values_Mid.UpdateValues], (req, res) => { //Update - עריכה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message:"server error"});
    }
});
router.delete('/',[values_Mid.DeleteValues], (req, res) => { // Delete - מחיקה
    if(req.success){
        res.status(200).json({msg:"ok"});
    } else {
        return res.status(500).json({message: "server error"});
    }
});