"use strict"
const search = location.search.substring(1);
const data = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
let keyword = data["keyword"];
let lat  = data["lat"];
let lon = data["lon"]; 
 
console.log(keyword);

function getResult(address) {
     Print.postMessage(address);
}
// 장소 검색 객체를 생성합니다
var ps = new kakao.maps.services.Places();
// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new kakao.maps.InfoWindow({
    zIndex: 1
});
// 키워드로 장소를 검색합니다
searchPlaces();
// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {


    //var keyword = document.getElementById('keyword').value;
    if (!keyword.replace(/^\\s+|\s+$/g, '')) {
        getResult('null');
        return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB, {
        location: new kakao.maps.LatLng(lat,lon)
    });
}
// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data);
        // 페이지 번호를 표출합니다
        //displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        getResult('null');
        return;
    } else if (status === kakao.maps.services.Status.ERROR) {
        getResult('null');
        return;
    }
}
// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
    var listEl = document.getElementById('placesList'),
        menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(),
        bounds = new kakao.maps.LatLngBounds(),
        listStr = '';
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    for (var i = 0; i < places.length; i++) {

        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

        fragment.appendChild(itemEl);
    }
    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    //map.setBounds(bounds);
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
    var address = "'" + places.address_name + "'";
    var el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index + 1) + '"></span>' +
        '<div class="info" onclick="getResult(' + address + ')" >' +
        '   <h5 >' + places.place_name + '</h5>';
    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
            '   <span class="jibun gray">' + places.address_name + '</span>';
    } else {
        itemStr += '    <span>' + places.address_name + '</span>';
    }
    itemStr += '  <span class="tel">' + places.phone + '</span>' +
        '</div>';
    el.innerHTML = itemStr;
    el.className = 'item';
    //console.log(places.road_address_name);
    console.log(places.address_name);
    return el;

}

function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
        el.removeChild(el.lastChild);
    }
}