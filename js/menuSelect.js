// 메뉴 선택 섹션 js파일
let normal_speed = 5000;

var swiper01 = new Swiper(".mySwiper01", {
  spaceBetween : 20,
  speed: normal_speed,
  loop : true,
  autoplay : {
    delay : 1,
  },
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper02 = new Swiper(".mySwiper02", {
  spaceBetween : 20,
  speed: normal_speed,
  loop : true,
  autoplay : {
    delay : 1,
  },
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper03 = new Swiper(".mySwiper03", {
  spaceBetween : 20,
  loop : true,
  autoplay : {
    delay : 1,
  },
  speed: 5000,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper04 = new Swiper(".mySwiper04", {
  spaceBetween : 20,
  loop : true,
  autoplay : {
    delay : 1,
  },
  speed: 5000,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper05 = new Swiper(".mySwiper05", {
  spaceBetween : 20,
  loop : true,
  autoplay : {
    delay : 1,
  },
  speed: 5000,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper06 = new Swiper(".mySwiper06", {
  spaceBetween : 20,
  loop : true,
  autoplay : {
    delay : 1,
  },
  speed: 5000,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper07 = new Swiper(".mySwiper07", {
  spaceBetween : 20,
  loop : true,
  autoplay : {
    delay : 1,
  },
  speed: 5000,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});
swiper08 = new Swiper(".mySwiper08", {
  spaceBetween : 20,
  loop : true,
  autoplay : {
    delay : 1,
  },
  speed: 5000,
  observer: true,
  observeParents: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
      spaceBetween : 10,
    },
    768:{
      slidesPerView: 4,
    }
  }
});

// 카테고리 버튼
let tab_menu = document.querySelectorAll(".menu .tab-menu .tab-btn");
// 각 카테고리에 맞는 리스트
let menu_list = document.querySelectorAll(".menu .menu-wrap .menu-list");
const swipers = [
  swiper01,
  swiper02,
  swiper03,
  swiper04,
  swiper05,
  swiper06,
  swiper07,
  swiper08
];

tab_menu.forEach((tab, index)=>{
  tab.addEventListener("click",()=>{
    for(ml of menu_list){
      ml.classList.remove("active");
    }
    for(tm of tab_menu){
      tm.classList.remove("active");
    }
    tab_menu[index].classList.add("active");
    menu_list[index].classList.add("active");
    menuSelect(menu_list[index].querySelector(".menu-select-btn"));
    swipers.forEach(swiper => {
      if (swiper) {
        swiper.autoplay.stop();
        swiper.slideTo(0, 0);  // 0번째 슬라이드로 즉시 이동
        swiper.update();
        swiper.autoplay.start();
      }
    });
  })
})
let menu_thumb = document.querySelector(".menu .thumb > img");
let menu_name = document.querySelector(".menu-name");
let menu_info = document.querySelector(".menu-info");
let menu_list_btn = document.querySelectorAll(".swiper .swiper-slide .menu-select-btn");
// 페이지 클릭시 첫번째 값으로 초기화
menuSelect(menu_list_btn[0]);
menu_list_btn.forEach((menu, index)=>{
  menu.addEventListener("click",()=>{
    menuSelect(menu);
  })
})
// 클릭한 메뉴 보여주는 함수
function menuSelect(menu){
  // 빵
  if(menu.dataset.number < 100){
    for(num in menus.breads){
      if(menus.breads[num].type == menu.dataset.number){
        menu_thumb.src = menus.breads[num].url;
        menu_name.textContent = menus.breads[num].name;
        menu_info.textContent = menus.breads[num].info;
      }
    }
  }
  // 케이크
  else if(menu.dataset.number < 200){
    for(num in menus.cakes){
      if(menus.cakes[num].type == menu.dataset.number){
        menu_thumb.src = menus.cakes[num].url;
        menu_name.textContent = menus.cakes[num].name;
        menu_info.textContent = menus.cakes[num].info;
      }
    }
  }
  // 델리
  else if(menu.dataset.number < 300){
    for(num in menus.deli){
      if(menus.deli[num].type == menu.dataset.number){
        menu_thumb.src = menus.deli[num].url;
        menu_name.textContent = menus.deli[num].name;
        menu_info.textContent = menus.deli[num].info;
      }
    }
  }
  // 음료
  else if(menu.dataset.number < 400){
    for(num in menus.drinks){
      if(menus.drinks[num].type == menu.dataset.number){
        menu_thumb.src = menus.drinks[num].url;
        menu_name.textContent = menus.drinks[num].name;
        menu_info.textContent = menus.drinks[num].info;
      }
    }
  }
}