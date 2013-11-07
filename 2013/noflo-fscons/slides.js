(function () {
  var currentSlide = 0;
  function previous(slides) {
    currentSlide--;
    window.location.hash = '#' + currentSlide;
  }
  function next(slides) {
    currentSlide++;
    window.location.hash = '#' + currentSlide;
  };
  var scrolling = false;
  var to;
  function scroll(slide) {
    var from = window.scrollY;
    to = slide.offsetTop;
    var step = Math.floor(Math.abs(to - from) / 10);
    var scrollStep = function () {
      var next;
      if (from >= to) {
        next = from - step;
        if (next <= to) {
          window.scrollTo(0, to);
          scrolling = false;
          return;
        }
      } else {
        next = from + step;
        if (next > to) {
          window.scrollTo(0, to);
          scrolling = false;
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
    if (!window.location.hash) {
      window.location.hash = '#0';
    }
    setTimeout(function () {
      processHash(window.location.hash);
    }, 1000);
    function processHash(hash) {
      var parts = hash.split('#');
      if (parts.length < 2) {
        return;
      }
      currentSlide = parseInt(parts[1]);
      if (isNaN(currentSlide)) {
        window.location.hash = '#0';
        return;
      }
      if (currentSlide >= slides.length) {
        window.location.hash = '#' + (slides.length - 1);
        return;
      }
      if (currentSlide < 0) {
        window.location.hash = '#0';
        return;
      }
      scroll(slides[currentSlide]);
    };
    window.addEventListener('hashchange', function (event) {
      processHash(event.newURL);
    });
    window.addEventListener('resize', function (event) {
      setTimeout(function () {
        window.scrollTo(0, slides[currentSlide].offsetTop);
      }, 500);
    });
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
