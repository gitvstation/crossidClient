var express = require('express');
var router = express.Router();
const request = require('request');
const common = require('../common/common');
const serialize = require('php-serialize');



/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.post('/returnUrl', returnUrl);
router.get('/getUserInfo', getUserInfo);
router.get('/usePoint', usePoint_view);
router.post('/usePoint', usePoint);

router.get('/address', address_view);
router.post('/address/add', address_add);
router.post('/address/update', address_update);
router.post('/address/delete', address_delete);

router.get('/tokenrefresh', function (req, res, next) {
    (async function () {
        await common.token_refresh();
    })()
});

async function returnUrl(req,res,next){
    /// 설정한 RETURN URL 에 회원의 엑세스토큰과 리플레시 토큰 이 전달됩니다.
        let data = req.body;
        req.session.ACCESS_TOKEN = data.ACCESS_TOKEN;
        req.session.REFRESH_TOKEN = data.REFRESH_TOKEN;
        res.send(req.body);
}


async function getUserInfo(req,res,next){
    /// 발급받은 엑세스토큰으로 회원의 정보를 조회할 수 있습니다.

    // 크로스아이디 인가서버에 http 요청 -- 회원정보를 호출합니다. -- /common/common.js -  common.reuqest 참고
   let user = await common.request('get',common.crossUrl+'/oauth/user/info',{ACCESS_TOKEN:req.session.ACCESS_TOKEN});
   user = user.body;
    if(user.code == '512' && req.query.reload != '1'){
        //// 토큰이 만료되었을 경우
        await common.token_refresh(req);
        req.query.reload = '1'; // 재요청 여부 확인을 위함
        // 회원정보 재 요청을 위함
        getUserInfo(req,res,next);
    }
    else {
        req.session.user = user;
        res.json(user);
    }
}

async function usePoint_view(req,res,next){
    res.render('point',req.session.user);
}

async function usePoint(req,res,next){
    let data = {
        ACCESS_TOKEN:req.session.ACCESS_TOKEN,
        POINT : req.body.POINT,
        INFO : '테스트 - 포인트사용['+req.body.POINT+']'
    };
    let resp = await common.request('post',common.crossUrl+'/oauth/user/point/use',data);

    if(resp.body.status){
        /// 포인트 사용요청 성공시
        req.session.user.POINT = resp.body.POINT;
    }
    else{
        /// 실패시
    }
    res.render('point',req.session.user);
}


async function address_view(req,res,next){
    res.render('address',req.session.user);
}


async function address_add(req,res,next){
    let data = req.body;
    data.ACCESS_TOKEN = req.session.ACCESS_TOKEN;
    delete data.ADDRESS_SEQ;
    let resp = await common.request('post',common.crossUrl+'/oauth/user/address/add',data);

    if(resp.body.status){
        /// 성공시 처리

    }
    else{
        /// 실패시 처리

    }
    res.render('address',req.session.user);
}

async function address_update(req,res,next){
    let data = req.body;
    data.ACCESS_TOKEN = req.session.ACCESS_TOKEN;

    let resp = await common.request('post',common.crossUrl+'/oauth/user/address/update',data);

    if(resp.body.status){
        /// 성공시

    }
    else{
        /// 실패시

    }
    res.render('address',req.session.user);
}

async function address_delete(req,res,next){
    let data = req.body;
    data.ACCESS_TOKEN = req.session.ACCESS_TOKEN;

    let resp = await common.request('post',common.crossUrl+'/oauth/user/address/delete',data);

    if(resp.body.status){
        /// 성공시

    }
    else{
        /// 실패시

    }
    res.render('address',req.session.user);
}

module.exports = router;
