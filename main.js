// 즉시 실행 익명 함수
// 전역 변수가 아닌 지역 변수로 사용하기 위해
// 전역 변수를 사용하면, 누구나 접근 가능하기 때문에 보호성을 더해주려고.
(() => {
  const actions = {
    birdFlies(key) {
      if (key) {
        // bacticks 표현 주의 => 스트링 내에서 변수활용 할 때
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(${window.innerWidth}px)`;
      } else {
        document.querySelector(
          '[data-index="2"] .bird'
        ).style.transform = `translateX(-100%)`;
      }
    },
    birdFlies2(key) {
      if (key) {
        document.querySelector(
          '[data-index="5"] .bird'
        ).style.transform = `translate(${window.innerWidth}px,${
          -window.innerHeight * 0.7
        }px)`;
      } else {
        document.querySelector('[data-index="5"] .bird').style.transform =
          "translateX(-100%)";
      }
    },
  };

  const stepElems = document.querySelectorAll(".step");
  const graphiclElems = document.querySelectorAll(".graphic-item");
  let currentElem = graphiclElems[0];
  let ioIndex;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1; // 곰해주면 문자를 순자로 타입  전환 가능
    console.log(ioIndex);
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].dataset.index = i;
    graphiclElems[i].dataset.index = i;
  }

  function activate(action) {
    currentElem.classList.add("visible");
    if (action) {
      // 객체 메소드를 호출 할때 .을 이용해 출이 가능하지만 다음과 같은 형태도 가능하다.
      actions[action](true);
    }
  }

  function inactivate(action) {
    currentElem.classList.remove("visible");
    if (action) {
      // 객체 메소드를 호출 할때 .을 이용해 출이 가능하지만 다음과 같은 형태도 가능하다.
      actions[action](false);
    }
  }

  window.addEventListener("scroll", () => {
    let step;
    let boundingRect;
    let temp = 0;

    // 이 코드의 단점은 스크롤 할 떄마다 루프들이 너무 많이 돈다는 단점이 있다.
    // 그래서 눈에 보이는 아이템만 루프를 돌도록 코드를 수정할 것이다.
    // Intersection Observer
    // for (let i = 0; i < stepElems.length; i++) {

    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue; // step에 값 없다면 다음 턴으로
      boundingRect = step.getBoundingClientRect();

      temp++;

      if (
        boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8
      ) {
        inactivate(currentElem.dataset.action);

        currentElem = graphiclElems[step.dataset.index];
        activate(currentElem.dataset.action);
      }
    }
    //console.log(temp);
  });

  // 새록고침시 화면이 처음부터 시작 될 수 있게
  window.addEventListener("load", () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate();
})();

// 이벤트 핸들러 함수는 구체적인 기능들이 기술되어 있으면 좋지 않다.
// 각각의 세세한 기능들을 각각 다른 함수로 쪼개는 것이 좋다.
