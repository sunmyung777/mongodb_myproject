const QuizModel=require("../../models/quiz");
const BigclassModel=require("../../models/bigclass");
const MiddleclassModel=require("../../models/middleclass");
const mongoose=require('mongoose');
const quiz = require("../../models/quiz");

const randomly=(range,number,now)=>{
    const checklist=[];
    const randomlist=[];
    checklist[0]=now;
    for(var p=0;p<number;p++){
        var check=Math.floor(Math.random()*range+1);
        while(checklist.indexOf(check)!=-1) {
            check=Math.floor(Math.random()*range+1);
        }
        checklist[p+1]=check;
        randomlist[p]=check;
    }
    return randomlist;
}
const quizData=(req,res)=>{
    QuizModel.aggregate([{$sample: {size: 1}}],(err,quiz_result)=>{
        if(err) return res.status(500).end("문제 출제 도중 에러");
        BigclassModel.find({},(err1,big_result)=>{
            if(err1) return res.status(500).end("빅클래스 로드 중 에러");
            MiddleclassModel.find({},(err2,middle_result)=>{
                const quizlist=[[],[],[],[]];
                if(err2) return res.status(500).end("미들클래스 로드 중 에러");
                    
                    const quiztype=Math.floor(Math.random()*2+1);

                    if(quiztype==1){
                        quizlist[0][0]=quiz_result[0].bigclass;
                        const randomlist=randomly(Object.keys(big_result).length,3,quizlist[0][0]);
                        for(var j=0;j<=3;j++){
                            if(j!=0) quizlist[j][0]=randomlist[j-1];
                            for(k=0;k<Object.keys(big_result).length;k++){
                                if(big_result[k].classnum===quizlist[j][0]) {
                                    quizlist[j][1]=big_result[k].title;
                                }
                            }
                        }
                    }
                    else if(quiztype==2){
                        quizlist[0][0]=quiz_result[0].middleclass;
                        const randomlist=randomly(Object.keys(middle_result).length,3,quizlist[0][0]);
                        for(var j=0;j<=3;j++){
                            if(j!=0) quizlist[j][0]=randomlist[j-1];
                            for(k=0;k<Object.keys(middle_result).length;k++){
                                if(middle_result[k].classnum===quizlist[j][0]) {
                                    quizlist[j][1]=middle_result[k].title;
                                }
                            }
                        }
                    }
                    console.log("quiztype:",quiztype);
                    quizlist.sort(() => Math.random() - 0.5);
                    console.log("after",quizlist);
                    return res.json({quizlist,quiztype,quiz_result});
            });//quizlist : 문제 코드, quiztype : 문제 유형, big : 대분류, middle : 중분류, quiz_result :문제
        });
    });
}
const list = (req, res) => {
    return res.render("quiz/list");
};
const create = (req, res) => {
    const { job, bigclass,middleclass } = req.body;
    BigclassModel.findOne({bigclass:bigclass},(find1_err,find1_res)=>{
        //bigclass에서 일치하는 값을 찾을 수 없음
        if(find1_err) res.status(404).end("빅클래스를 찾을 수 없음");
        MiddleclassModel.findOne({middleclass:middleclass},(find2_err,find2_res)=>{
            //middleclass가 일치하지 않음.
            if(find2_err) res.status(404).end("미들클래스를 찾을 수 없음");
            QuizModel.create({ job, bigclass,middleclass },(err,result)=>{
                if(err) res.status(500).end();
                res.status(201).json(result);
            });
        });
    });
};
const update = (req, res) => {
    const id=req.params.id;
    const { job, bigclass,middleclass }=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    QuizModel.findByIdAndUpdate(id,{ job, bigclass,middleclass },{new:true} ,(err,result)=>{
        if(err) return res.status(400).end();
        if(!result) return res.status(404).end();
        res.json(result);
    })
};

// 삭제 (localhost:3000/api/music/:id)
// 성공 : id에 해당하는 객체를 배열에서 삭제 후 결과 배열 리턴(200: OK)
// 실패 : id가 숫자가 아닌 경우(400: Bad Request)
//        해당하는 id가 없는 경우 (404: Not Found)
const remove = (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    QuizModel.findByIdAndDelete(id,(err,result)=>{
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
const waitquiz=(req,res)=>{
    return res.render("quiz/ready");
}
module.exports = { list ,create,update,remove,quizData,waitquiz};