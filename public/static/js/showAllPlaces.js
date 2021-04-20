  //이미지 설정 및 기타 설정
  const imageSrc = 'http://hohoco.dothome.co.kr/img/path.gif'; 
  const imageSize = new kakao.maps.Size(34 , 34);
  const imageOption = {offset: new kakao.maps.Point(13, 34)};
  const imageSrc1 = 'http://hohoco.dothome.co.kr/img/marker.png';
  const imageSize1 = new kakao.maps.Size(23, 32);
  let placeMarkers = [];
  let clusterMarker = [];
  let lat;
  let lon;
  let clickedOverlay = null;
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
     lat = data["lat"];  lon = data["lon"];
  
    //지도 초기값 설정
    const mapContainer = document.getElementById('map');  
    const mapOption = {
            center: new kakao.maps.LatLng(lat, lon),  
            level:5
        };
    //지도 생성
    const map = new kakao.maps.Map(mapContainer, mapOption);  
  
    // 클러스터 설정
    var clusterer = new kakao.maps.MarkerClusterer({
      map: map,  
      averageCenter: true,  
      minLevel: 5,  
      calculator: [10, 30, 50],
      disableClickZoom: true, 
      styles: [{ 
              width: '50px',
              height: '50px',
              background: ' #ff6e7f',
              background: '-webkit-linear-gradient(to right,#ff6e7f, #f06292)',
               background: ' linear-gradient(to right, #ff6e7f, #f06292)',
               opacity: '0.7',
              borderRadius: '50%',
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              lineHeight: '50px',
           },   ]   });
    // 🍎 현재 위치 찍어주기                                  
    const markerMain = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(lat, lon),
          image:    new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
          map:      map
        });
   //거리에 해당하는 마커 찍어주기    
    placeData.forEach(function(v, i) {
      let distance = calcDist(lat, lon, placeData[i].lat, placeData[i].lon);
      if(distance<1000){ displayMarker(placeData[i]);};
    });
    
     //마커 -> 클러스터
     clusterer.addMarkers(clusterMarker);

 // 🍎 식당마커 찍어주기
    function displayMarker(placeData) {
      console.log(lat);
      let placeMarker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(placeData.lat, placeData.lon),
            image:  new kakao.maps.MarkerImage(imageSrc1, imageSize1),
            map: map
        });
        placeMarkers.push(placeMarker);
        clusterMarker.push(placeMarker);
      
        let content = '<div style="padding: 0px 28px 0px 15px; \
        border-radius:20px;\
        box-shadow:0px 3px 2px #888;\
        background-color:#f06292;  \
        background: #f06292  url(http://hohoco.dothome.co.kr/img/arrow.png) no-repeat right 4px center; ;\
        background-size: 28px 28px\
        <h1>' + 'placeData.name' + '</h1>' + '</div>';

        let CustomOverlay = new kakao.maps.CustomOverlay({
          position:  new kakao.maps.LatLng(placeData.lat, placeData.lon),
          content: content,
          yAnchor: 2.4,
          clickable: true,
        });
        kakao.maps.event.addListener(placeMarker, 'click', function() {
          if (clickedOverlay != null) {
              clickedOverlay.setMap(null);
          }
          CustomOverlay.setMap(map);
          clickedOverlay = CustomOverlay;
 
      });
   };
    //클러스터 확대
      kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
      let level = map.getLevel() - 1;
          map.setLevel(level, {
                  anchor: cluster.getCenter()
              });
      });
     //
      const setCenterButton = document.querySelector(".btn");
      setCenterButton.addEventListener('click', function( e ){
        let moveLatLon = new kakao.maps.LatLng(lat,lon);
        map.panTo(moveLatLon);
      });
      //
      function setMarkers() {
        placeMarkers.forEach(function(v, i) {
          placeMarkers[i].setMap(null);
        });
        clusterer.clear();
      }

      kakao.maps.event.addListener(map, 'dragend', function() {
       console.log("드래그 중입니다");
        // 지도 중심좌표를 얻어옵니다 
        var moveLatLon = map.getCenter();
        setMarkers(); // 마커 and 클러스터 지우기
        placeMarkers = [];
        clusterMarker = [];

        placeData.forEach(function(v, i) {
          let distance = calcDist(moveLatLon.lat, moveLatLon.lon, placeData[i].lat, placeData[i].lon);
          console.log(distance);
          if(distance<1000){ displayMarker(placeData[i]);};
        });
        clusterer.addMarkers(clusterMarker);
      
    });
}



// 거리계산 함수   
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

