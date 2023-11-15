class Slider {
  sliderContainer;
  sliderContent;
  sliderProgress;
  previousBtn;
  nextBtn;
  nbSlides;
  currentSlide = 0;
  currentTranslate = "0%";

  progressBallList = [];

  constructor(sliderId) {
    this.sliderContainer = document.querySelector("#" + sliderId);
    this.sliderContent = this.sliderContainer.querySelector(".slider-content");
    this.sliderProgress = this.sliderContainer.querySelector(
      "#sliderProgress>div"
    );

    this.nbSlides = this.sliderContainer.querySelectorAll(".slide").length;

    this.previousBtn = document.querySelector("#previous");
    this.nextBtn = document.querySelector("#next");

    this.previousBtn.addEventListener("click", this.previous.bind(this));
    this.nextBtn.addEventListener("click", this.next.bind(this));

    this.sliderContent.style.width =
      "calc(var(--slider-width) * " + this.nbSlides + ")";
    // progress icon

    for (let i = 0; i < this.nbSlides; i++) {
      let progressBall = document.createElement("span");
      progressBall.className = i == 0 ? "progressBall actif" : "progressBall";

      this.sliderProgress.appendChild(progressBall);

      this.progressBallList.push(progressBall);

      this.progressBallList[i].addEventListener("click", (e) => {
        this.currentSlide = i;
        this.translate();
        this.setProgressBall();
      });
    }
  }

  next() {
    this.currentSlide++;

    if (this.currentSlide >= this.nbSlides) this.currentSlide = 0;

    this.translate();
    this.setProgressBall();
  }

  previous() {
    this.currentSlide--;

    if (this.currentSlide < 0) this.currentSlide = this.nbSlides - 1;

    this.translate();
    this.setProgressBall();
  }

  goTo(slideIndex) {
    if (slideIndex < 0 || slideIndex >= this.nbSlides) return;

    this.currentSlide = slideIndex;
    this.translate();
    this.setProgressBall();
  }

  translate() {
    this.sliderContent.style.transform =
      "translate(" + (-100 / this.nbSlides) * this.currentSlide + "%)";
  }

  setProgressBall() {
    for (const progressBall of this.progressBallList) {
      progressBall.className = "progressBall";
    }

    this.progressBallList[this.currentSlide].className += " actif";
  }

  autoGoNext() {
    mySlider.next();
    setTimeout(() => {
      this.autoGoNext();
    }, 15000);
  }
}

let mySlider = new Slider("mySlider");
mySlider.autoGoNext();
