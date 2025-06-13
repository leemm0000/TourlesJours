kakao.maps.load(function () {
  window.onload = function () {
    let result_list = document.querySelector(".result-list");
    let list = [];
    let markers = [];
    let infowindows = [];

    function list_view() {
      result_list.innerHTML = "";
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

    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3
    };
    const map = new kakao.maps.Map(mapContainer, mapOption);
    const geocoder = new kakao.maps.services.Geocoder();
    const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

    if (typeof test !== "undefined" && test.trim() !== "") {
      for (store in stores) {
        for (st of stores[store]) {
          if (st.name.includes(test) || st.location.includes(test)) {
            list.push(st);
          }
        }
      }
      if (list.length !== 0) {
        list_view();
        displayMarkers(list[0]);
        result_list.firstChild.classList.add("active");
      }
    }

    const search_btn = document.querySelector(".search-btn");
    const input_search = document.querySelector(".search");

    search_btn.addEventListener("click", () => {
      list = [];
      result_list.innerHTML = "";
      if (input_search.value && input_search.value.trim() !== "") {
        for (store in stores) {
          for (st of stores[store]) {
            if (st.name.includes(input_search.value) || st.location.includes(input_search.value)) {
              list.push(st);
            }
          }
        }
        if (list.length !== 0) {
          list_view();
          displayMarkers(list[0]);
          result_list.firstChild.classList.add("active");
        }
      }
    });

    result_list.addEventListener("click", (e) => {
      let target = e.target.closest("li");
      if (!target) return;
      for (rl of result_list.querySelectorAll("li")) {
        rl.classList.remove("active");
      }
      target.classList.add("active");

      let name = target.querySelector(".store-name")?.textContent;
      let location = target.querySelector(".store-location")?.textContent;
      let call = target.querySelector(".store-call")?.textContent;
      displayMarkers({ name, location, call });
    });

    let selects = document.querySelectorAll(".select > div");
    let select_li = document.querySelectorAll(".select > div > ul > li");
    let region = document.querySelector(".region-list");
    let city = document.querySelector(".city-list");
    let select_region;

    selects.forEach(select => {
      select.addEventListener("click", () => {
        if (select.classList.contains("active")) {
          select.classList.remove("active");
        } else {
          for (s of selects) s.classList.remove("active");
          select.classList.add("active");
        }
      });
    });

    select_li.forEach((li, index) => {
      li.addEventListener("click", () => {
        if (index !== 0) {
          region.previousElementSibling.textContent = li.textContent;
          city.textContent = "";
          result_list.innerHTML = "";
          let sub_list = [];
          list = [];
          select_region = li;
          city.previousElementSibling.textContent = "시/군/구 선택";

          switch (li.textContent) {
            case "서울":
              sub_list = ["중구", "강남구", "마포구", "송파구"]; break;
            case "대전":
              sub_list = ["서구", "중구", "유성구", "동구", "대덕구"]; break;
            case "대구":
              sub_list = ["북구", "중구", "동구"]; break;
            case "청주":
              sub_list = ["청원구", "상당구", "서원구", "흥덕구"]; break;
            case "인천":
              sub_list = ["남동구", "미추홀구", "부평구", "서구"]; break;
            case "부산":
              sub_list = ["중구", "부산진구", "사상구"]; break;
            case "울산":
              sub_list = ["남구", "북구"]; break;
          }

          list_view();
          for (store in stores) {
            for (st of stores[store]) {
              if (st.location.includes(li.textContent)) list.push(st);
            }
          }

          if (list.length !== 0) {
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
      });
    });

    city.addEventListener("click", (e) => {
      let target = e.target;
      list = [];
      result_list.innerHTML = "";
      target.parentElement.previousElementSibling.textContent = target.textContent;

      if (target.textContent === "시/군/구 선택") {
        for (store in stores) {
          for (st of stores[store]) {
            if (st.location.includes(select_region.textContent)) list.push(st);
          }
        }
      } else {
        for (store in stores) {
          for (st of stores[store]) {
            if (st.location.includes(target.textContent) && st.location.includes(select_region.textContent)) {
              list.push(st);
            }
          }
        }
      }

      if (list.length !== 0) {
        list_view();
        displayMarkers(list[0]);
        result_list.firstChild.classList.add("active");
      }
    });

    function displayMarkers(address) {
      markers.forEach(marker => marker.setMap(null));
      markers = [];
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
          infowindows.push(infowindow);
        } else {
          console.warn(`주소를 찾을 수 없습니다: ${address}`);
        }
      });
    }
  };
});
