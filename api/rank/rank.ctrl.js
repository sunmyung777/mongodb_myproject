const UserModel=require('../../models/user');
const mongoose=require('mongoose');
// 목록조회 (localhost:3000/music?limit=3)
// - 성공 : limit수만큼 music 객체를 담은 배열을 리턴 (200:OK)
// - 실패 : limit가 숫자형이 아닌 경우 오류(400:Bad Request)

const checkId=(req,res,next)=>{
    const id=req.params.id;
    //valid id check
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).end();
    }
    next();
};

const list=(req,res)=>{
    UserModel.find({},(err,result)=>{
        if(err) return res.status(500).end("유저 정보를 불러오는 도중 서버 에러 발생");
        if(!result) return res.status(404).end("유저 정보 없음");
        res.render("rank/list",{result});
    }).sort({maxscore:-1}).limit(10);
};

module.exports = { list, checkId};