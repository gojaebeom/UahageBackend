// import router ✨
const router = require("express").Router();
const { index, show, create, update, _delete, findByOptions } = require("./user.controller");

// default api ✨
//GET /users
router.get("/", index); 
/** 
* @README 💡
------------------------------------------------------------------
기본적인 rest api 를 제외한 나머지 api들은 `GET users/find?option=[value]`
형태로 통합하려고 합니다. 
기존의 닉네임 값을 받아와 닉네임이 존재하는지 채크, 또는 이메일을 가지고 있는 유저
모두 해당합니다.
------------------------------------------------------------------*/
// GET /users/find?option=[value]
router.get("/find-by-options", findByOptions);
// GET /users/:id
router.get("/:id", show);
// POST /users
router.post("/", create);
// PUT /users/:nickname
router.put("/:nickname", update);
// DELETE /users/:id
router.delete("/:id", _delete);


// export router ✨
module.exports = router;

