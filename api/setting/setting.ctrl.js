const BigclassModel=require("../../models/bigclass");
const MiddleclassModel=require("../../models/middleclass");
const mongoose=require('mongoose');

const biglist = (req, res) => {
    BigclassModel.find((err,result)=>{
        if(err) return res.status(500).end();
        // res.render("quiz/list",{ result });
        res.json(result);
    }).limit(10);
};

const middlelist = (req, res) => {
    MiddleclassModel.find((err,result)=>{
        if(err) return res.status(500).end();
        // res.render("quiz/list",{ result });
        res.json(result);
    }).limit(10);
};
const bigcreate = (req, res) => {
    const {classnum, title } = req.body;
    BigclassModel.findOne({classnum:classnum},(find_error,find_result)=>{
        if(find_error) return res.status(500).send("생성 전 classnum검색중 오류");
        if(find_result) return res.status(400).send("이미 있는 클래스번호");
        BigclassModel.create({classnum, title},(err, result)=>{
            if(err) res.status(500).send("서버 에러 발생");
            res.status(201).json(result);
        });
    });
    
};
//에러 발생 수발 왜 에러뜨는데 ㅅㅂ
const middlecreate = (req, res) => {
    const { classnum, title } = req.body;   
    MiddleclassModel.findOne({classnum:classnum},(find_error,find_result)=>{
        if(find_error) return res.status(500).send("생성 전 classnum검색중 오류");
        if(find_result) return res.status(400).send("이미 있는 클래스번호");
        MiddleclassModel.create({classnum,title},(err,result)=>{
            if(err) res.status(500).send("서버 에러 발생");
            res.status(201).json(result);
        });
    });
    
};

const bigupdate = (req, res) => {
    const id=req.params.id;
    const {classnum,title }=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    BigclassModel.findByIdAndUpdate(id,{classnum,title },{new:true} ,(err,result)=>{
        if(err) return res.status(400).end();
        if(!result) return res.status(404).end();
        res.json(result);
    })
};

const middleupdate = (req, res) => {
    const id=req.params.id;
    const {classnum,title }=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    MiddleclassModel.findByIdAndUpdate(id,{classnum,title },{new:true} ,(err,result)=>{
        if(err) return res.status(400).end();
        if(!result) return res.status(404).end();
        res.json(result);
    })
};

// 삭제 (localhost:3000/api/music/:id)
// 성공 : id에 해당하는 객체를 배열에서 삭제 후 결과 배열 리턴(200: OK)
// 실패 : id가 숫자가 아닌 경우(400: Bad Request)
//        해당하는 id가 없는 경우 (404: Not Found)
const bigremove = (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    BigclassModel.findByIdAndDelete(id,(err,result)=>{
        if(err) return res.status(400).end();
        if(!result) return res.status(404).end();
        res.json(result);
    });
    // MusicModel.findByIdAndRemove(id,(err,result)=>{
    //     if(err) return res.status(400).end();
    //     if(!result) return res.status(404).end();
    //     res.json(result);
    // });
};
const middleremove = (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    BigclassModel.findByIdAndDelete(id,(err,result)=>{
        if(err) return res.status(400).end();
        if(!result) return res.status(404).end();
        res.json(result);
    });
    // MusicModel.findByIdAndRemove(id,(err,result)=>{
    //     if(err) return res.status(400).end();
    //     if(!result) return res.status(404).end();
    //     res.json(result);
    // });
};
module.exports = { biglist ,middlelist,bigcreate,middlecreate,bigupdate,middleupdate,bigremove,middleremove};