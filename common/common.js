(function (global) {
    "use strict;"
    const createError = require('http-errors');
    const request = require('request');

    // Class ------------------------------------------------
    let common = {};
    common.clientId = 'e7tqY';
    common.clientSec = 'zceq15-_e';
    common.myurl = "http://222.239.231.50:2222";
    common.crossUrl = "https://crossid.com";

    common.token_refresh = async function(req){
        /*
        /// request.js 를 사용하여 호출할 경우 예제 입니다.
        return new Promise(function (resolve, reject) {
            request.get('http://127.0.0.1:3001/login/tokenrefresh',
                {json:{
                        REFRESH_TOKEN : req.session.REFRESH_TOKEN,
                        CLIENT_ID : common.clientId,
                        CLIENT_SECRET : common.clientSec
                    }},function (err,html,body) {
                    /// 재발급된 엑세스토큰과 리플레시토큰 (json 타입)
                    let tokenData = body;
                    // 세션에 재발급된 엑세스토큰과 리플레시토큰을 저장해줍니다.
                    req.session.ACCESS_TOKEN = tokenData.ACCESS_TOKEN;
                    req.session.REFRESH_TOKEN = tokenData.REFRESH_TOKEN;
                    // 엑세스토큰과 리플레시토큰이 담긴 json 데이터를 리턴
                    return resolve(tokenData);
                });
        });
        */
        let ref = await common.request('get',common.crossUrl+'/login/tokenrefresh',{REFRESH_TOKEN:req.session.REFRESH_TOKEN});
        let tokenData = (ref.body);
        req.session.ACCESS_TOKEN = tokenData.ACCESS_TOKEN;
        req.session.REFRESH_TOKEN = tokenData.REFRESH_TOKEN;
        return tokenData;
    }

    common.request = async function(method,url,data,done){
        return new Promise(function (resolve,reject) {
            method = method.toLowerCase();
            //// 전송하는 데이터에 클라이언트 아이디와 시크릿코드가 포함되도록 설정
            data.CLIENT_ID = common.clientId;
            data.CLIENT_SECRET = common.clientSec;
            request({
                url : url,
                strictSSL: false,
                json:data
            },function(e,a,b){
                /// 기존 request.js 처럼 콜백함수를 이용하여 처리할 수 있도록 하기위함
                if(typeof done == typeof function(){}) return resolve(done(e,a,b));
                else return resolve({error:e,response:a,body:b});
            });
        });
    }

    // Exports ----------------------------------------------
    module["exports"] = common;


})((this || 0).self || global);
