(function () {
  var currentSlide = 0;
  function previous(slides) {
    currentSlide--;
    if (currentSlide <= 0) {
      currentSlide = 0;
    }
    scroll(slides[currentSlide]);
  }
  function next(slides) {
    currentSlide++;
    if (currentSlide >= slides.length) {
      currentSlide = slides.length - 1;
    }
    scroll(slides[currentSlide]);
  };
  function scroll(slide) {
    var from = window.scrollY;
    var to = slide.offsetTop;
    var step = Math.floor(Math.abs(to - from) / 10);
    var scrollStep = function () {
      var next;
      if (from >= to) {
        next = from - step;
        if (next <= to) {
          window.scrollTo(0, to);
          return;
        }
      } else {
        next = from + step;
        if (next > to) {
          window.scrollTo(0, to);
          return;
        }
      }
      window.scrollTo(0, next);
      window.requestAnimationFrame(scrollStep);
      from = next;
    };
    window.requestAnimationFrame(scrollStep);
  };

  document.addEventListener("DOMContentLoaded", function(event) {
    var slides = document.querySelectorAll('section.slide');
    document.addEventListener('keydown', function (event) {
      if (event.keyCode === 38) {
        event.preventDefault();
        previous(slides);
      }
      if (event.keyCode === 40) {
        event.preventDefault();
        next(slides);
      }
    });
    var delta;
    var startPosition;
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length !== 1) {
        return;
      }
      event.preventDefault();
      delta = 0;
      startPosition = event.touches[0].pageY;
    });
    document.addEventListener('touchmove', function (event) {
      if (event.touches.length !== 1) {
        return;
      }
      event.preventDefault();
      delta = event.touches[0].pageY - startPosition;
    });
    document.addEventListener('touchend', function (event) {
      event.preventDefault();
      if (Math.abs(delta) < 50) {
        return;
      }
      if (delta < 0) {
        next(slides);
      } else {
        previous(slides);
      }
    });
    var wheeled;
    document.addEventListener('mousewheel', function (event) {
      event.preventDefault();
      if (Math.abs(event.wheelDeltaY) < 50) {
        return;
      }
      var wheelTime = new Date();
      if (wheeled && wheelTime.getTime() - wheeled.getTime() < 1000) {
        return;
      }
      if (event.wheelDeltaY < 0) {
        next(slides);
      } else {
        previous(slides);
      }
      wheeled = wheelTime;
    });
  });
})();
