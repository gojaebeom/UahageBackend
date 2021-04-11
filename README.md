## Uahage Backend 

### get started 🚀
1. 적당한 경로에 프로젝트를 받아주세요.( Please take the project in the right path ) <br/>
`git clone https://github.com/gojaebeom/uahage-backend.git`

2. root 경로에서 `npm install` 명령어를 통해 의존성 모듈들을 설치해주세요.<br/>( Install dependency modules through `npm install` command in root path. )

2. `npm run dev` 명령어 또는 `npm start` 명령어로 서버를 시작할 수 있습니다.<br/>( You can start the server with the command `npm run dev` or the command `npm start`. )

### setting .env file ⚙
- root derectory 에 .env 파일이 존재해야합니다. 
  - .env 파일은 mysql 서버의 주소, 비밀번호 등 민감한 정보를 담고 있어 github에 올리지 않습니다.

### warning 💣
- create, update, delete 와 같은 api는 보안에 관련된 설정이 필수입니다.<br/>(Security-related settings are required for api such as create, update, delete.)

예를 들어 update, delete 의 경우 자기 자신만 자신의 정보를 수정하거나 삭제할 수 있습니다. 예전엔 session<->cookie 방식을 주로 사용하였지만, 지금은 javascript web token(JWT) 방식을 사용할 수도 있고, 어떤 것을 사용하던 수정 , 삭제 요청을 받을 경우 client의 정보를 확인하여 검증하는 미들웨어가 필요합니다. 이 부분도 이야기를 같이 해보면 좋을것 같습니다. ( 로그인 API가 존재하지 않아 아직 인증 관련 미들웨어를 만들 수 없습니다 ..)
<br>
For example, update, delete allows only yourself to modify or delete your information. You can use the session<->cookie method in the past, but now you can use the javascript web token (JWT) method, or you need middleware that verifies the client's information when you receive a modification or deletion request. I think we should talk about this as well. (The login API does not exist, so we cannot create authentication-related middleware yet.)
