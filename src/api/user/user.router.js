"use strict"

// import router ✨
const router = require("express").Router();
const { index, show, create, update, _delete, findByOptions, updateByOptions } = require("./user.controller");

// default api ✨
//GET /users
router.get("/", index); 
/** 
* @README 💡
------------------------------------------------------------------
index, show, create, update, delete 를 제외한 나머지 (조회관련) api들은 `GET users/find-by-options?option=[value]`
형태로 통합하려고 합니다. 
기존의 닉네임 값을 받아와 닉네임이 존재하는지 채크, 또는 이메일에 해당하는 유저 데이터만 보이기 
등등 모두 해당합니다.
< querystring > 
반환값(필수 입력)
select : * 또는 ','로 구분하여 선택적인 값이 가능합니다. ex) nickname,email,gender...
반환타입(선택 입력)
selectType : 
    명시하지 않으면 기본적인 반환값들을 보여주지만, 
    selectType=boolean 을 작성시 값의 유무에 따라 false, true 를 반환합니다.
특정 항목을 통한 조회(선택 입력)
whereColumn : 찾고자 하는 대상의 컬럼명을 입력
whereData : 찾고자 하는 대상의 값을 입력

** 주의사항 **
재사용성을 위해 이렇게 만들었으나.. 현재는 아주 단순한 select 문을 사용할 때만 가능합니다.
다음과 같은 부분을 사용하려면 코드를 확장(수정) 해야합니다.
- 두 개 이상의 where 절을 사용할 수 없습니다.
- join 문을 사용할 수 없습니다.
- order by 역시 구현이 안되어있습니다.( 이부분은 추가만 해주면 되긴합니다 )
- 이외에도 서브쿼리등을 사용하는 부분에 대해선 답도 없는 API 라는 점을 참고해주세용
( 더 좋은 로직이 생각난다면 무조건 수정해서 사용해주시길 바랍니다 , 
구현만 잘 되면 index, show, search api 를 따로 사용할 필요 없이 조회에 관한 api는 이거 하나로 끝낼 수 있을 것 같습니다.)
------------------------------------------------------------------*/
// GET /users/find-by-options?option=[value]
router.get("/find-by-options", findByOptions);
// GET /users/:id
router.get("/:id", show);
// POST /users 
router.post("/", /**@AUTH 보안 관련 미들웨어 필요 */ create);
// PUT /users/:nickname
router.put("/:nickname", /**@AUTH 보안 관련 미들웨어 필요 */ update);
// PATCH /users/:id
router.patch("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ updateByOptions);
// DELETE /users/:id
router.delete("/:id", /**@AUTH 보안 관련 미들웨어 필요 */ _delete);

// export router ✨
module.exports = router;

