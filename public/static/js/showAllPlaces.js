async function init() {
  const placeList = await fetch("http://localhost:8000/api/places/test?place_code=1", {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": ""
      },
  }).then(res => res.json());
    const placeData = placeList["data"]["rows"];
    //현재위치 파라미터로 받아오기
    const search = location.search.substring(1);
    const data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    var lat = data["lat"];
    var lon = data["lon"];

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
    const imageSrc1 = 'http://hohoco.dothome.co.kr/img/marker.png';
    const imageSize1 = new kakao.maps.Size(23, 32);
    // 현재 위치                                    
    const markerMain = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lon),
          image:    new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          map:      map
        });

    placeData.forEach((data) => {
     var distance = calcDist(lat, lon, data.lon, data.lat);
     if (distance < 500) {
      displayMarker(coords, data[i].store_name, storename, address, phone, menu, bed, tableware, meetingroom, diapers, playroom, carriage, nursingroom, chair, Examination_item, fare);
        }

    });

 
  




}
function calcDist(lat1, lng1, lat2, lng2) {
  var ret = 0;
  var latA = 111;
  var lngB = 88.8;
  ret = Math.sqrt(
      Math.pow((Math.abs(lat1 - lat2) * latA), 2) +
      Math.pow((Math.abs(lng1 - lng2) * lngB), 2)
  ) * 1000; //m
  return ret.toFixed(2);
}

init();

