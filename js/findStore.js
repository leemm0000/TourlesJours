window.onload = function () {
  // 검색 결과 보여주는 리스트
  let result_list = document.querySelector(".result-list");
  // 검색 결과 담아두는 리스트
  let list = [];
  let markers = [];
  let infowindows = [];
  // 찾은 매장을 화면에 보여줌
  function list_view() {
    result_list.innerHTML = "";
    // 화면에 찾은 매장을 보여줌
    for (item of list) {
      let li = document.createElement("li");
      li.innerHTML = `
          <div>
          <span class="location-icon"></span>
          <h3 class="store-name">${item.name}</h3>
          <p class="store-location">${item.location}</p>
          <p class="store-call">${item.call}</p>
          </div>
          `;
      result_list.appendChild(li);
    }
    result_list = document.querySelector(".result-list");
  }
  var mapContainer = document.getElementById('map'),
    mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };
  var map = new kakao.maps.Map(mapContainer, mapOption);
  var geocoder = new kakao.maps.services.Geocoder();
  //var ps = new kakao.maps.services.Places();
  var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  // 메인페이지에서 검색한 값이 있으면
  if (test != "" && test.trim() != "") {
    for (store in stores) {
      for (st of stores[store]) {
        if (st.name.includes(test) || st.location.includes(test)) {
          list.push(st);
        }
      }
    }
    // 매장이 있으면 함수 실행
    if (list.length != 0) {
      list_view();
      displayMarkers(list[0]);
      result_list.firstChild.classList.add("active");
    }
  }


  // 검색하기
  let search_btn = document.querySelector(".search-btn");
  let input_search = document.querySelector(".search");
  // 검색 버튼 눌렀을 때
  search_btn.addEventListener("click", () => {
    // 빈 리스트로 초기화
    list = [];
    result_list.innerHTML = "";
    if (input_search.value != null && input_search.value.trim() != "") {
      for (store in stores) {
        for (st of stores[store]) {
          if (st.name.includes(input_search.value) || st.location.includes(input_search.value)) {
            list.push(st);
          }
        }
      }
      // 매장이 있으면 함수 실행
      if (list.length != 0) {
        list_view();
        displayMarkers(list[0]);
        result_list.firstChild.classList.add("active");
      }
    }
  })
  // li클릭시 지도에 표시
  result_list.addEventListener("click", (e) => {
    let target = e.target;
    for (rl of result_list.querySelectorAll("li")) {
      rl.classList.remove("active");
    }
    target.classList.add("active");
    let name = target.querySelector(".store-name")?.textContent;
    let location = target.querySelector(".store-location")?.textContent;
    let call = target.querySelector(".store-call")?.textContent;
    displayMarkers({ name, location, call });
  })

  let selects = document.querySelectorAll(".select > div");
  let select_li = document.querySelectorAll(".select > div > ul > li");
  // 도/시
  let region = document.querySelector(".region-list");
  // 시/ 군/ 구
  let city = document.querySelector(".city-list");
  let select_region;
  // 리스트 키고 끄기
  selects.forEach(select => {
    select.addEventListener("click", () => {
      // 리스트가 켜있으면 끄기
      if (select.classList.contains("active")) {
        select.classList.remove("active");
      }
      else {
        for (s of selects) {
          s.classList.remove("active");
        }
        select.classList.add("active");
      }
    })
  })
  // 도/시 선택
  select_li.forEach((li, index) => {
    li.addEventListener("click", () => {
      // 첫번째 li선택시 아무일도 X
      if (index != 0) {
        // 선택한 리스트 값을 부모에 덮어씌기
        region.previousElementSibling.textContent = li.textContent;
        city.textContent = "";
        result_list.innerHTML = "";
        let sub_list = [];
        list = [];
        select_region = li;
        city.previousElementSibling.textContent = "시/군/구 선택";
        switch (li.textContent) {
          case "서울":
            sub_list = ["중구", "강남구", "마포구", "송파구"];
            break;
          case "대전":
            sub_list = ["서구", "중구", "유성구", "동구", "대덕구"];
            break;
          case "대구":
            sub_list = ["북구", "중구", "동구"];
            break;
          case "청주":
            sub_list = ["청원구", "상당구", "서원구", "흥덕구"];
            break;
          case "인천":
            sub_list = ["남동구", "미추홀구", "부평구", "서구"];
            break;
          case "부산":
            sub_list = ["중구", "부산진구", "사상구"];
            break;
          case "울산":
            sub_list = ["남구", "북구"];
            break;
        }
        list_view()
        for (store in stores) {
          for (st of stores[store]) {
            if (st.location.includes(li.textContent)) {
              list.push(st);
            }
          }
        }
        // 매장이 있으면 함수 실행
        if (list.length != 0) {
          list_view();
          displayMarkers(list[0]);
          result_list.firstChild.classList.add("active");
        }
        sub_list.unshift("시/군/구 선택");
        for (sl of sub_list) {
          let li = document.createElement("li");
          li.textContent = sl;
          city.appendChild(li);
        }
      }
    })
  })
  // 시/군/구 선택
  city.addEventListener("click", (e) => {
    let target = e.target;
    list = [];
    result_list.innerHTML = "";
    target.parentElement.previousElementSibling.textContent = target.textContent;
    if (target.textContent == "시/군/구 선택") {
      for (store in stores) {
        for (st of stores[store]) {
          if (st.location.includes(select_region.textContent)) {
            list.push(st);
          }
        }
      }
    }
    else {
      for (store in stores) {
        for (st of stores[store]) {
          if (st.location.includes(target.textContent) && st.location.includes(select_region.textContent)) {
            list.push(st);
          }
        }
      }
    }
    // 매장이 있으면 함수 실행
    if (list.length != 0) {
      list_view();
      displayMarkers(list[0]);
      result_list.firstChild.classList.add("active");
    }
  })

  // 지도에 위치 표시해주는 함수
  function displayMarkers(address) {
    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    // 기존 인포윈도우 닫기
    infowindows.forEach(iw => iw.close());
    infowindows = [];
    geocoder.addressSearch(address.location, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        let marker = new kakao.maps.Marker({
          map: map,
          position: coords
        });
        markers.push(marker);

        if (markers.length === 1) {
          map.setCenter(coords);
          map.setLevel(4);
        }

        let infowindow = new kakao.maps.InfoWindow({
          content: `<div class='info-wrap'>
          <h3 class="store-name">${address.name}</h3>
          <p class="store-location">${address.location}</p>
          <p class="store-call">${address.call}</p>
        </div>`
        });

        infowindow.open(map, marker);
        infowindows.push(infowindow); // 새로 연 인포윈도우 저장

      } else {
        console.warn(`주소를 찾을 수 없습니다: ${address}`);
      }
    });
  }
}