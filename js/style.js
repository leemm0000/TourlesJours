// -------------- header 내려오면 색 바꿈 --------------
let header = document.querySelector(".header");
window.addEventListener("scroll",()=>{
  if(window.scrollY > 100){
    header.classList.add("active");
  }
  else{
    header.classList.remove("active");
  }
})
// -------------- header 메뉴 열기 --------------
let primary_manus = document.querySelectorAll(".nav .primary-menu > li > a")
let mega_menu;
primary_manus.forEach((menu)=>{
  menu.addEventListener("mouseenter",()=>{
    mega_menu = menu.nextElementSibling;
    if(mega_menu != null){
      mega_menu.classList.add("active");
      menu.classList.add("active");

      mega_menu.addEventListener("mouseenter",()=>{
        mega_menu.classList.add("active");
        menu.classList.add("active");
    })
    }
  })
  menu.addEventListener("mouseleave",()=>{
    if(mega_menu != null){
      mega_menu.classList.remove("active");
      menu.classList.remove("active");

      mega_menu.addEventListener("mouseleave",()=>{
        mega_menu.classList.remove("active");
        menu.classList.remove("active");
      })
    }
  })
})

// -------------- 모바일 메뉴 열기 --------------
let mobile_primary_manus = document.querySelectorAll(".mobile-nav .primary-menu > li > a");
let mobile_mega_menu = document.querySelectorAll(".mobile-nav .primary-menu > li > .mega-menu");
let hamburger = document.querySelector(".hamburger");
let hamburger_close = document.querySelector(".hamburger-close");
mobile_primary_manus.forEach((menu)=>{
  menu.addEventListener("click",()=>{
    mega_menu = menu.nextElementSibling;
    if(mega_menu != null){
      if(mega_menu.classList.contains("active")){
        mega_menu.classList.remove("active");
        menu.classList.remove("active");
      }
      else{
        for(mmm of mobile_mega_menu){
          mmm.classList.remove("active");
        }
        for(mpm of mobile_primary_manus){
          mpm.classList.remove("active");
        }
        mega_menu.classList.add("active");
        menu.classList.add("active");
      }
    }
  })
})
hamburger.addEventListener("click",()=>{
  document.querySelector(".mobile-nav").classList.add("active");
  console.log("클릭");
})
hamburger_close.addEventListener("click",()=>{
  document.querySelector(".mobile-nav").classList.remove("active");
})

// -------------- nav 돋보기 클릭 --------------
let reading_glasses = document.querySelectorAll(".reading-glasses");
let search_header = document.querySelector(".search-header");
let close_btn = document.querySelector(".close-btn");
reading_glasses.forEach((icon)=>{
  icon.addEventListener("click",()=>{
    search_header.classList.add("active");
  })
})
close_btn.addEventListener("click",()=>{
  search_header.classList.remove("active");
})

// -------------- 창업 섹션 클릭 --------------
let startup_box = document.querySelectorAll(".startUp .partner-box .box");
let startup_box_a = document.querySelectorAll(".startUp .partner-box .box > a");

startup_box_a.forEach((box, index)=>{
  box.addEventListener("click",()=>{
    if(box.parentElement.classList.contains("active")){
      window.open("franchise.html");
    }
    else{
      for(sb of startup_box){
        sb.classList.remove("active");
      }
      startup_box[index].classList.add("active");
    }
  })
})

window.test = localStorage.getItem('test');
// 매장 검색하기 버튼 클릭시 넘어감
let search_button = document.querySelector(".search-button");
if(search_button){
  search_button.addEventListener("click",()=>{
  // window.test = document.querySelector(".search-box-search").value;
  localStorage.setItem("test", document.querySelector(".search-box-search").value);
  window.open("findStore.html");
})
}


//sns 반응형

document.addEventListener("DOMContentLoaded", function (){
  const btn = document.querySelector(".sns-toggle-btn");
  const page2 = document.querySelector(".g-page2");
  if(btn != null){
    const text = btn.querySelector(".text");
    const arrow = btn.querySelector(".arrow");

    btn.addEventListener("click", function () {
      const isOpen = page2.classList.toggle("show");
  
      text.textContent = isOpen ? "닫기" : "더 보기";
  
      // 아이콘 클래스 토글
      arrow.classList.toggle("fa-chevron-down", !isOpen);
      arrow.classList.toggle("fa-chevron-up", isOpen);
    });
  }
});