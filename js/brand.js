let targetLink = document.querySelectorAll('.tab_menu a');
let targetContent = document.querySelectorAll('#container > div');

// 초기 설정: 모든 콘텐츠 숨기고 첫 번째 탭만 보이게
for (let x = 0; x < targetContent.length; x++) {
  targetContent[x].style.display = 'none';
}
document.getElementById('tab1').style.display = 'block';
targetLink[0].classList.add('active');

for(let i = 0; i < targetLink.length; i++){
  targetLink[i].addEventListener('click', function(e){
    e.preventDefault(); 
    let orgTarget = e.target.getAttribute('href');
    let tabTarget = orgTarget.replace('#', '');

    // 모든 콘텐츠 숨기기
    for(let x = 0; x < targetContent.length; x++){
      targetContent[x].style.display = 'none';
    }

    // 선택된 콘텐츠만 보이기
    document.getElementById(tabTarget).style.display = 'block';

    // active 클래스 제어
    for(let j = 0; j < targetLink.length; j++){
      targetLink[j].classList.remove('active');
    }
    e.target.classList.add('active');
  });
}



//last bread 
const breads = document.querySelectorAll('.bread');

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('show');
    observer.unobserve(entry.target);
  });
}, appearOptions);

breads.forEach(bread => {
  appearOnScroll.observe(bread);
});