"use strict"
async function init() {
    const placeList = await fetch("api/places?place_code=1&lat=35.1449589&lon=126.9216603&pageNumber=0", {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          "Authorization": ""
        },
    }).then(res => res.json())
    
    console.log(placeList);

    //현재위치 파라미터로 받아오기
    const search = location.search.substring(1);
    const data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    const lat = data["lat"];
    const lon = data["lon"];
    //지도 초기값 설정
    const mapContainer = document.getElementById('map');  
    const mapOption = {
            center: new kakao.maps.LatLng(lat, lon),  
            level:5
        };
    //지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);  
    //이미지 설정
    const imageSrc = 'http://hohoco.dothome.co.kr/img/path.gif'; 
    const imageSize = new kakao.maps.Size(34 , 34);
    const imageOption = {offset: new kakao.maps.Point(13, 34)};  
    //현재위치 마커 생성
    const marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(lat, lon),
            image: new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
            map:map
        });
}
init();

