# CROSSid API

## 1	회원 정보 조회	
### [GET / POST]	 /oauth/user/info	
*  엑세스토큰으로 해당 회원의 정보를 조회.
```
{ 
*CLIENT_ID :   클라이언트 아이디, 
*CLIENT_SECRET :  시크릿코드, 
*ACCESS_TOKEN :  회원의 엑세스토큰
 }
```

```
{
USER_SEQ: 회원의 키값,
CUSTOMS_ID_NO: 개인통관고유부호,
EMAIL: 이메일(아이디),
USER_NM: 이름,
PHONE_NO: 휴대폰번호,
SEX: 성별,
BIRTH: 생년월일,
POINT: 포인트,
USER_PHOTO: 이미지(사용x),
ADDRESS: 집주소,
ZIP_CODE: 우편번호,
ADDRESS_DETAIL: { },
ADDRESS_LIST: [ 
  /// 배송주소록 목록 
    {
 ADDRESS_SEQ : 배송주소록 키값, 
 ADDRESS : 배송지 주소, 
 ZIP_CD : 배송지 우편번호
 ADDRESS_NM : 배송지 명칭, 
 CUSTOMS_ID_NO : 수취인 개인통관고유부호, 
 DEFAULT_YN : 기본배송지 여부 ( 1 = 기본배송지, 0 = x ), 
 NAME : 수취인명, 
 PHONE_NO : 수취인 휴대폰번호, 
 TEL : 수취인 전화번호
} , {...}
   ]
}
```

## 2	엑세스토큰 재발급	
### [POST]	/login/tokenrefresh
* 엑세스토큰이 만료되었을경우 리플레시토큰을 사용하여 재발급
```
{ 
CLIENT_ID :   클라이언트 아이디, 
CLIENT_SECRET :  시크릿코드, 
REFRESH_TOKEN :  리플레시 토큰
 }"	"(JSON)
 { 
 ACCESS_TOKEN : 재발급된 엑세스토큰, 
 REFRESH_TOKEN : 리플레시 토큰 
}
```



## 3	포인트 사용	
### [POST]	/oauth/user/point/use 
* 회원사 사이버머니 충전 등 의 이유로 크로스아이디의 포인트를 사용할 경우 사용됩니다.
```
{
*CLIENT_ID :   클라이언트 아이디, 
*CLIENT_SECRET :  시크릿코드, 
*ACCESS_TOKEN :  회원의 엑세스토큰, 
*POINT : 사용될 포인트, 
INFO : 포인트 사용건에 대한 내용 (
 미입력시 "" 회원사명 - 포인트사용[사용된포인트] "" 로 입력됩니다.
 )
}
```
```
{ 
status : 성공여부 (true / false), 
msg : 내용 ( 성공시 빈 문자열 ) , 
POINT : 완료후 잔여포인트
}
```


## 4	배송지 추가	
### [POST]	/oauth/user/address/add
* 배송지 추가시 사용됩니다. ( 최대 15개 까지 등록 가능합니다. )  (주소 입력시  기본주소 * 상세주소 로 입력)
```
{ 
* ACCESS_TOKEN : 엑세스토큰, 
* CLIENT_ID : 클라이언트 아이디, 
* CLIENT_SECRET : 시크릿코드
* ADDRESS_NM : 배송지 명칭, 
* NAME : 수취인명, 
* PHONE_NO : 수취인 휴대폰번호,
TEL : 수취인 전화번호,
* ADDRESS : 배송지 주소,
* ZIP_CD : 우편번호, 
* CUSTOMS_ID_NO : 개인통관고유부호,
DEFAULT_YN : 기본배송지 여부 (기본배송지 일경우 1, 아닐경우 0 혹은 미입력)
}
```
```
 { 
 status : 성공여부 (true / false), 
 msg : 내용, 
 ADDRESS_SEQ : 배송주소록 키값(수정, 삭제시 사용됩니다.)
}
```

## 5	배송지 수정	
### [POST]	/oauth/user/address/update
* (주소 입력시  기본주소 * 상세주소 로 입력)
```
{ 
* ADDRESS_SEQ : 배송지 키값,  
* ACCESS_TOKEN : 엑세스토큰, 
* CLIENT_ID : 클라이언트 아이디, 
* CLIENT_SECRET : 시크릿코드
* ADDRESS_NM : 배송지 명칭, 
* NAME : 수취인명, 
* PHONE_NO : 수취인 휴대폰번호,
TEL : 수취인 전화번호,
* ADDRESS : 배송지 주소,
* ZIP_CD : 우편번호, 
* CUSTOMS_ID_NO : 개인통관고유부호,
DEFAULT_YN : 기본배송지 여부 (기본배송지 일경우 1, 아닐경우 0 혹은 미입력) 
}
```
```
 { 
 status : 성공여부 (true / false), 
 msg : 내용
}
``` 


## 6	배송지 삭제	
### [POST]	/oauth/user/address/delete
* 배송지 삭제시 사용됩니다.
```
 { 
* ADDRESS_SEQ : 배송지 키값,  
* ACCESS_TOKEN : 엑세스토큰, 
* CLIENT_ID : 클라이언트 아이디, 
* CLIENT_SECRET : 시크릿코드 
}
```
```{ 
 status : 성공여부 (true / false), 
 msg : 내용 
 }
 ```
 
 
## 7	구매내역 추가 ( 구매시 사용 )	
### [POST]	/oauth/user/order
* 상품 구매시 사용됩니다.
```
 {
* CLIENT_ID : 클라이언트 아이디,
* CLIENT_SECRET : 시크릿코드,
* ACCESS_TOKEN : 엑세스토큰,
* RECIEVER_NM : 수취인명,
* RECIEVER_ADDRESS : 수취인 주소,
* RECIEVER_ADD_ZIP_CODE : 수취인 우편번호,
* RECIEVER_CUSTOMS_NO : 개인통관고유부호,
* RECIEVER_PHONE_NO : 수취인 휴대폰번호,
SHIP_MEMO : 배송메모,
* ITEM_SUM_PRICE : 상품 전체 가격,
* DELIVERY_PRICE : 배송비,
* PAY_METHOD : 결제타입 0=무통장 / 1=신용카드 / 2=계좌이체 / 3=가상계좌 / 4=기타,
* ORIGIN_PRICE : 총합가격(할인, 포인트사용전 총합 가격),
* BUY_PRICE : 결제금액,
* ITEM_NAME : 상품명(여러상품 구매시 대표적인 상품명 1개, 혹은 xxx상품 외 3개),
USE_POINT : 사용한 포인트,
DIS_PRICE : 할인된 가격,
* ORDER_NO : 주문번호(회원사에서 사용하는 자체 주문번호(키값)),
* ORDER_URL : 해당 주문건에 대한 상세페이지 주소,
* GOODS : (구매한 상품들 배열)[
{
* ITEM_ORIGIN_CD : 상품번호 ( 회원사에서 사용하는 키값 ),
* ITEM_ORIGIN_URI : 상품 페이지 주소,
* ITEM_NM : 상품명,
* ITEM_ORDER_NO : 상품의 주문번호,
* ITEM_PHOTO : 해당 상품 대표이미지(썸네일 등) 주소,
ITEM_INFO : 상품 설명,
* BUY_PRICE :  상품가격,
* ORIGIN_PRICE : 회원사에서 상품시 지불한 현지 통화 가격 ,
* CURRENCY : 통화(
 원화 : KRW, 엔화 : JPY  ( 일본 구매대행인 경우 JPY 입력 )
),
* CONTURY : 상품 국가,
WEIGHT : 무게,
* EA : 수량
} , { … }
]
}
```
```
 { 
 status : 성공여부 (true / false), 
 msg : 내용 
 }
 ```
     
     
     
 # 회원사 API
 ## 1	주문내역 조회	
 ### [GET]	/crossid/order
 * 크로스아이디에 저장된 주문정보를 갱신하기 위해 사용됩니다. 
    ( 배송상태 등 확인 위함 )
 ```
 { 
 CLIENT_ID :   클라이언트 아이디, 
 CLIENT_SECRET :  시크릿코드,
 USER_SEQ : 회원의 키값(크로스아이디 기준 배열로 전달됨, 해당 회원의 주문정보 반환 요청할 때 사용될 예정),
 ORDER_NO : 주문번호(회원사 기준, 배열로 전달됨, 특정 주문서들의 주문정보 반환 요청시 사용될 예정)
  }
  ```
  ```
 [{ 
 * ORDER_NO : 주문번호, 
 SHIP_STAT : 주문상태( 0=주문완료 / 1=결제완료 / 2=주문접수 / 3=출고준비 / 4=출고완료 / 5=배송중 / 6=배송완료 / 7=구매완료 / 8=취소 / 9 = 취소완료 / 11 = 교환 / 12 = 교환완료 / 13 = 반품 / 14 = 반품완료 ), 
 ITEMS : [ 
 {
  INVOICE_NO : 송장번호(예-PJP01…..), 
  INVOICE_NO2 : 송장번호2, 
 * ITEM_ORDER_NO : 상품 주문번호, 
 * SHIP_STAT : 배송상태 
 }, {...}
 ]
 }]
 ```
 
 # 에러코드
 ### [511]
 * 잘못된 요청입니다! 관리자에게 문의하세요.    
 >로그인시 입력된 클라이언트 정보( 클라이언트 아이디, 시크릿코드 ) 의 값이 잘못되었을 경우.  
 ### [512]  
 * 토큰값이 유효하지 않습니다.	  
 > 엑세스토큰의 유호기간이 만료되었거나, 잘못되었을 경우.
 ### [513]  
 * 토큰에 대한 클라이언트 정보가 맞지 않습니다.
 > 토큰 발급시 입력된 클라이언트 정보와 엑세스토큰과 같이 입력된 클라이언트 정보가 일치하지 않을경우.
 ### [514]
 * 필수값이 누락되었습니다. ({컬럼명})	
 > 필수로 입력되어야 하는 값이 입력되지 않았을경우.