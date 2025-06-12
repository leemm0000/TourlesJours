var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  spaceBetween: 20,
  loop: true,
  autoplay: true,
  speed: 3000,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    }
  }
});

// 추천 상품 클릭하면 정보 띄우기
let recommend_menu_btn = document.querySelectorAll(".menu-zone .swiper .swiper-slide .card button");
let info_card = document.querySelector(".info-card");
let close_btn_info = document.querySelector(".recommend-menu .close-btn-info");
// 설명창 태그들
let kr_name = document.querySelector(".kr-name");
let en_name = document.querySelector(".en-name");
let info_text = document.querySelector(".info-wrap > p");
let kcal = document.querySelector(".ingredient-wrap .kcal");
let saturatedFat = document.querySelector(".ingredient-wrap .saturatedFat");
let sugar = document.querySelector(".ingredient-wrap .sugar");
let sodium = document.querySelector(".ingredient-wrap .sodium");
let protein = document.querySelector(".ingredient-wrap .protein");
let caffeine = document.querySelector(".ingredient-wrap .caffeine");
let allergy = document.querySelector(".ingredient-wrap .allergy");
let gram = document.querySelector(".ingredient-wrap .gram");
// 추천 메뉴 info 보여주기
recommend_menu_btn.forEach((rmb) => {
  rmb.addEventListener("click", () => {
    info_card.classList.add("active");
    //빵
    if (rmb.dataset.number < 100) {
      infoView(menus.breads, rmb);
    }
    // 케이크
    else if (rmb.dataset.number < 200) {
      infoView(menus.cakes, rmb);
    }
    // 델리
    else if (rmb.dataset.number < 300) {
      infoView(menus.deli, rmb);
    }
    // 음료
    else if (rmb.dataset.number < 400) {
      infoView(menus.drinks, rmb);
    }
    //스낵
    else if (rmb.dataset.number < 500) {
      infoView(menus.deserts, rmb);
    }
  })
});
close_btn_info.addEventListener("click", () => {
  info_card.classList.remove("active");
});

// info창에 문자열 할당하는 함수
function infoView(ob_list, ob) {
  for (number in ob_list) {
    if (ob.dataset.number == ob_list[number].type) {
      kr_name.textContent = ob_list[number].name;
      en_name.textContent = ob_list[number].en_name;
      info_text.textContent = ob_list[number].info;
      kcal.textContent = ` (${ob_list[number].kcal}kcal)`;
      saturatedFat.textContent = ` (${ob_list[number].saturatedFat}g)`;
      sugar.textContent = ` (${ob_list[number].sugar}g)`;
      sodium.textContent = ` (${ob_list[number].sodium}mg)`;
      protein.textContent = ` (${ob_list[number].protein}g)`;
      caffeine.textContent = ` (${ob_list[number].caffeine}mg)`;
      allergy.textContent = ` ${ob_list[number].allergy}`;
      gram.textContent = ` ${ob_list[number].gram}g`;
    }
  }
}

// 카테고리 선택
// 대분류
let major_category = document.querySelectorAll(".major-category-list > li > label > input");
// 서브 카테고리 wrap
let subcategory = document.querySelector(".subcategory");
// 카테고리 리스트
let subcategory_list = document.querySelectorAll(".subcategory-list");
// 서브 카테고리 버튼
let subcategory_list_btn = document.querySelectorAll(".subcategory-list button");
// 메뉴 리스트
let menu_list = document.querySelectorAll(".menu-wrap .card-wrap .card > button");
// 검색 칸
let menusearch = document.getElementById("menusearch");
// 검색 버튼
let menusearch_btn = document.querySelector(".search-menu .search button");
let ob_category_name = ["breads", "cakes", "deli", "deserts", "drinks"];
// 대분류 선택한거 변수에 할당
let select_major_category;
// 검색에 성공한 메뉴 개수
let find_menu_count;
// 모든 메뉴 info창
let info_cards = document.querySelectorAll(".info-card");
// 보여줄 메뉴 캐수
let view_number = 8;
// 현재 보여주고 있는 메뉴 수
let curr_number = 8;
let more_button = document.querySelector(".menu-wrap > button.more-btn");

let show_list = [...menu_list];
console.log(bread);
// 서브 페이지 열었을때 메뉴 on
for (let i = 0; i < view_number; i++) {
  menu_list[i].parentElement.classList.add("active");
}

menusearch_btn.addEventListener("click", () => {
  // 검색어 있으면 검색 O
  find_menu_count = 0;
  let select_menu_list = null;
  if (menusearch.value != null && menusearch.value.trim() != "") {
    // 메뉴 전체 꺼주기
    // 메뉴 설명 리셋
    for (ic of info_cards) {
      ic.classList.remove("active");
    }
    // 소분류 클릭 리셋
    for (slb of subcategory_list_btn) {
      slb.classList.remove("active");
    }
    for (ml of menu_list) {
      ml.parentElement.classList.remove("active");
    }
    show_list = [];
    curr_number = 0;
    // 각 카테고리별로 해당 단어가 있는지 필터링 후 배열 생성
    for (let i = 0; i < ob_category_name.length; i++) {
      for (menu in menus[ob_category_name[i]]) {
        select_menu_list = Object.values(menus[ob_category_name[i]]).filter((menu) => {
          if (menu.name.includes(menusearch.value)) {
            find_menu_count++;
            return menu;
          }
        })
      }
      // 생성한 배열에 있는 단어와 실제 있는 카드 켜주기
      for (let i = 0; i < select_menu_list.length; i++) {
        for (ml of menu_list) {
          if (ml.dataset.number == select_menu_list[i].type) {
            //ml.parentElement.classList.add("active");
            show_list.push(ml);
          }
        }
      }
    }
    show_menu();
    if (find_menu_count == 0) {
      document.querySelector(".none-wrap").classList.add("active");
    }
    else { document.querySelector(".none-wrap").classList.remove("active"); }
  }
  else {
    // 메뉴 설명 리셋
    for (ic of info_cards) {
      ic.classList.remove("active");
    }
    // 소분류 클릭 리셋
    for (slb of subcategory_list_btn) {
      slb.classList.remove("active");
    }
    for (ml of menu_list) {
      ml.parentElement.classList.remove("active");
    }
    curr_number = 0;
    show_list = [...menu_list];
    show_menu();
    document.querySelector(".none-wrap").classList.remove("active");
  }
})

// 대분류 선택
major_category.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.querySelector(".none-wrap").classList.remove("active"); 
    // 메뉴 설명 리셋
    for (ic of info_cards) {
      ic.classList.remove("active");
    }
    // 소분류 클릭 리셋
    for (slb of subcategory_list_btn) {
      slb.classList.remove("active");
    }
    for (ml of menu_list) {
      ml.parentElement.classList.remove("active");
    }
    // 이미 클릭한 카테고리 또 클릭하면 전체 메뉴 보여줌
    if (btn.parentElement.classList.contains("active")) {
      btn.parentElement.classList.remove("active");
      curr_number = 0;
      show_list = [...menu_list];
      show_menu();
      // 소분류 끄기
      subcategory.classList.remove("active");
      select_major_category = null;
    }
    else {
      // 대분류 선택시 카테고리 켜줌
      for (let i = 0; i < major_category.length; i++) {
        major_category[i].checked = false;
        major_category[i].parentElement.classList.remove("active")
        subcategory_list[i].classList.remove("active");
      }
      btn.checked = true;
      select_major_category = btn;
      subcategory.classList.add("active");
      btn.parentElement.classList.add("active");
      subcategory_list[index].classList.add("active");

      // 카테고리에 맞는 메뉴만 on
      show_list = [];
      curr_number = 0;
      for (ml of menu_list) {
        if (Number(btn.value) <= Number(ml.dataset.number) && Number(ml.dataset.number) < Number(btn.value) + 99) {
          //ml.parentElement.classList.add("active");
          show_list.push(ml);
        }
        else {
          //ml.parentElement.classList.remove("active");
        }
      }
      show_menu();
    }
  })
})
// 소카테고리 선택
subcategory_list_btn.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    document.querySelector(".none-wrap").classList.remove("active"); 
    for (ic of info_cards) {
      ic.classList.remove("active");
    }
    for (ml of menu_list) {
      ml.parentElement.classList.remove("active");
    }
    if (btn.classList.contains("active")) {
      btn.classList.remove("active");
      show_list = [];
      curr_number = 0;
      for (ml of menu_list) {
        if (Number(select_major_category.value) <= Number(ml.dataset.number) && Number(ml.dataset.number) < Number(select_major_category.value) + 99) {
          // ml.parentElement.classList.add("active");
          show_list.push(ml);
        }
        else {
          //ml.parentElement.classList.remove("active");
        }
      }
      show_menu();
    }
    else {
      for (slb of subcategory_list_btn) {
        slb.classList.remove("active");
      }
      for (ml of menu_list) {
        ml.parentElement.classList.remove("active");
      }
      btn.classList.add("active");
      show_list = [];
      curr_number = 0;
      // 객체 불러오기
      for (let i = 0; i < ob_category_name.length; i++) {
        for (menu in menus[ob_category_name[i]]) {
          // 객체의 서브타입과 소카테고리 이름이 같으면
          if (menus[ob_category_name[i]][menu].sub_type == btn.dataset.str) {
            for (ml of menu_list) {
              // 메뉴 리스트를 불러와서 같은 메뉴이면 켜줌
              if (ml.dataset.number == menus[ob_category_name[i]][menu].type) {
                // ml.parentElement.classList.add("active");
                show_list.push(ml);
              }
            }
            show_menu();
          }
        }
      }
    }
  })
})

// 메뉴 클릭시 그에 맞는 설명창 on
function view_info(this_) {
  let info = this_.parentElement.querySelector(".info-card");
  // 모바일일 경우 메뉴 이미지가 중앙에 나오기 때문에 전부 초기화 진행
  if (window.innerWidth < 767) {
    for (ic of info_cards) {
      ic.classList.remove("active");
    }
  }

  info.classList.add("active");
  if (this_.dataset.number < 100) {
    menu_infoView(menus.breads, this_, info);
  }
  // 케이크
  else if (this_.dataset.number < 200) {
    menu_infoView(menus.cakes, this_, info);
  }
  // 델리
  else if (this_.dataset.number < 300) {
    menu_infoView(menus.deli, this_, info);
  }
  // 음료
  else if (this_.dataset.number < 400) {
    menu_infoView(menus.drinks, this_, info);
  }
  //스낵
  else if (this_.dataset.number < 500) {
    menu_infoView(menus.deserts, this_, info);
  }
}
// 각 메뉴에 맞는 설명 할당
function menu_infoView(ob_list, ob, info) {
  for (number in ob_list) {
    if (ob.dataset.number == ob_list[number].type) {
      info.querySelector(".kr-name").textContent = ob_list[number].name;
      info.querySelector(".en-name").textContent = ob_list[number].en_name;
      info.querySelector(".info-wrap > p").textContent = ob_list[number].info;
      info.querySelector(".kcal").textContent = ` (${ob_list[number].kcal}kcal)`;
      info.querySelector(".saturatedFat").textContent = ` (${ob_list[number].saturatedFat}g)`;
      info.querySelector(".sugar").textContent = ` (${ob_list[number].sugar}g)`;
      info.querySelector(".sodium").textContent = ` (${ob_list[number].sodium}mg)`;
      info.querySelector(".protein").textContent = ` (${ob_list[number].protein}g)`;
      info.querySelector(".caffeine").textContent = ` (${ob_list[number].caffeine}mg)`;
      info.querySelector(".allergy").textContent = ` ${ob_list[number].allergy}`;
      info.querySelector(".gram").textContent = ` ${ob_list[number].gram}g`;
    }
  }
}
// 설명 끄기
document.querySelectorAll(".menu-wrap .card-wrap .close-btn-info").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.remove("active");
  })
})

// 메뉴 더 보기 버튼
function more_btn() {
  console.log(show_list);
  show_menu();
}

function show_menu() {
  end_number = curr_number + view_number;
  // 마지막이 리스트보다 길면 리스트 마지막 값으로 할당
  if (end_number > show_list.length) {
    end_number = show_list.length;
  }

  for (; curr_number < end_number; curr_number++) {
    show_list[curr_number].parentElement.classList.add("active");
  }

  if (curr_number >= show_list.length) {
    more_button.classList.remove("active");
  }
  else {
    more_button.classList.add("active");
  }
}