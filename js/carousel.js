const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton =  document.querySelector('.carousel__button--right');
const prevButton =  document.querySelector('.carousel__button--left');
const pausePlayButton = document.querySelector('.carousel__button--pause-play');
const slideWidth = slides[0].getBoundingClientRect().width;

//arrange slides next to one another
const setSlidePosition = (slide, index) =>{
  slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);



const move = (currentSlide, amountToMove, targetSlide) =>{
  track.style.transform = amountToMove;
  currentSlide.classList.remove('current-slide');
  targetSlide.classList.add('current-slide');
  
};

//when i click left, move slides to the left
prevButton.addEventListener('click', e =>{
  const currentSlide = track.querySelector('.current-slide');
  // if we reach the first slide this here will move it back to last slide 
  if(!currentSlide.previousElementSibling){
    const lastIndex = slides.length-1;
    move(currentSlide,`translateX(-${slides[lastIndex].style.left})`,slides[lastIndex])
    return;
  }
  
  const prevSlide = currentSlide.previousElementSibling;
  const amountToMove = `translateX(-${prevSlide.style.left})`;
  move(currentSlide,amountToMove,prevSlide);
});

//when i click right, move slides to the right
nextButton.addEventListener('click', e =>{
  const currentSlide = track.querySelector('.current-slide');
  
  // if we reach the last slide this here will move it back to first slide 
  if(!currentSlide.nextElementSibling){
    move(currentSlide,`translateX(${slides[0].style.left})`,slides[0])
    return;
  }

  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = `translateX(-${nextSlide.style.left})`;
  
  move(currentSlide,amountToMove,nextSlide);
});



//autopilt

const nextImage = () =>{
  nextButton.click();
}

//made a var so i can clear it later
let interval;
const startCarousel = () =>{
  interval = setInterval(nextImage, 4000);  
}
const stopCarousel = () =>{
  clearInterval(interval);
}

//start by default cuz yee
startCarousel();
pausePlayButton.addEventListener('click', ()=>{
  const isPlayed = (pausePlayButton.getAttribute('data-play'));
  if(isPlayed === "true"){
    stopCarousel();
    pausePlayButton.setAttribute('data-play',false);
    pausePlayButton.querySelector('img').src="images/carousal/play.svg";  
  }
  else{
    startCarousel();
    pausePlayButton.setAttribute('data-play',true);
    pausePlayButton.querySelector('img').src="images/carousal/pause.svg";
  }
});

