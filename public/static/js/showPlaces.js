 
 "use strict"
 //이미지 설정 및 기타 설정
  const imageSrc = 'http://hohoco.dothome.co.kr/img/path.gif'; 
  const imageSize = new kakao.maps.Size(34 , 34);
  const imageOption = {offset: new kakao.maps.Point(13, 34)};
  const imageSrc1 = 'http://hohoco.dothome.co.kr/img/marker.png';
  const imageSize1 = new kakao.maps.Size(23, 32);
  let placeMarkers = [];
  let clusterMarker = [];
  let clickedOverlay = null;
  const search = location.search.substring(1);
  const data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
  
  let lat  = data["lat"];
  let lon = data["lon"];
  let type = data["type"];
  let url = "";


  async function init() {
  // 모든 데이터 받아오기 
    if(type==='allsearch'){
      let place_code = data["place_code"];
      url = "http://localhost:8000/api/places/test?place_code="+place_code+"&type=all"
      console.log(url);
    }
    else if(type==='filter'){
      let menu= data["menu"];
      let bed = data["bed"];
      let tableware = data["tableware"];
      let meetingroom = data["meetingroom"];
      let diapers = data["diapers"];
      let playroom = data["playroom"];
      let carriage = data["carriage"];
      let nursingroom= data["nursingroom"];
      let chair= data["chair"];
      url = "http://localhost:8000/api/places/test?place_code=1&type=filter&menu="+menu+"&bed="+bed+"&tableware="+tableware+"&meetingroom="+meetingroom+"&diapers="+diapers+"&playroom="+playroom+"&carriage="+carriage+"&nursingroom="+nursingroom+"&chair="+chair+"";
      console.log(url);
     }else{
      url = "http://localhost:8000/api/places/test?place_code=1&type=all"
      console.log(url);
     }
 
  const placeList = await fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': "application/json",
        "Authorization": ""
      },
  }).then(res => res.json());
    const placeData = placeList["data"]["rows"];
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
    if(type=="destination"){
      let destination = new kakao.maps.CustomOverlay({
            content: `<div style="padding: 0px 15px 0px 15px;   border-radius:25px;  box-shadow:0px 3px 2px #888; background-color:#f06292;  background: #f06292      center;" >
                             <h1> 목적지 </h1>
                       </div>`,
            map:map ,
            position:new kakao.maps.LatLng(lat, lon),
            yAnchor: 1.0,
            xAnchor: 0.3,
        });
    }else{
      const markerMain = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(lat, lon),
        image:    new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
        map:      map
      });
    }
   //거리에 해당하는 마커 찍어주기    
    placeData.forEach(function(v, i) {
      let distance = calcDist(lat, lon, placeData[i].lat, placeData[i].lon);
      if(distance<1000){ displayMarker(placeData[i]);};
    });
    
     //마커 -> 클러스터
     clusterer.addMarkers(clusterMarker);

 // 🍎 식당마커 찍어주기
    function displayMarker(placeData) {
      let placeMarker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(placeData.lat, placeData.lon),
          image:  new kakao.maps.MarkerImage(imageSrc1, imageSize1),
          map: map
      });
      placeMarkers.push(placeMarker);
      clusterMarker.push(placeMarker);
       console.log(placeData.bed);
      let content = `
      <div id="custom-overlay" class="customoverlay" onclick="getresult('${placeData.name}|${placeData.address}|${placeData.phone}|${placeData.carriage}|${placeData.bed}|${placeData.tableware}|${placeData.nursingroom}|${placeData.meetingroom}|${placeData.diapers}|${placeData.playroom}|${placeData.chair}|${placeData.menu}|${placeData.examination}|${placeData.fare}');"> 
          <a>
            <span class="title">${placeData.name}</span> 
          </a> 
      </div>`;

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
      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
        if (CustomOverlay != null) {
        CustomOverlay.setMap(null);
        }
      });
   };
    //클러스터 확대
      kakao.maps.event.addListener(clusterer, 'clusterclick', function(cluster) {
      let level = map.getLevel() - 1;
          map.setLevel(level, {
                  anchor: cluster.getCenter()
              });
      });
     // 현재위치로 이동
      const setCenterButton = document.querySelector(".btn");
      setCenterButton.addEventListener('click', function( e ){
        let moveLatLon = new kakao.maps.LatLng(lat,lon);
        map.panTo(moveLatLon);
      });
      // 마커 클러스터 지우기
      function setMarkers() {
        placeMarkers.forEach(function(v, i) {
          placeMarkers[i].setMap(null);
        });
        clusterer.clear();
      }
      // 드래그하여 이동한 중심좌표 기준으로 마커, 클러스터 다시 찍어주기
      kakao.maps.event.addListener(map, 'dragend', function() {
        setMarkers();
        var moveLatLon = map.getCenter();
        placeMarkers = [];
        clusterMarker = [];
        placeData.forEach(function(v, i) {
          let distance = calcDist(moveLatLon.Ma, moveLatLon.La, placeData[i].lat, placeData[i].lon);
          if(distance<1000){ displayMarker(placeData[i]);};
        });
        clusterer.addMarkers(clusterMarker);
      
    });
}
init();

function getresult(result) {
   console.log(result);
  Print.postMessage(result);
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



