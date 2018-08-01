import Hammer from 'hammerjs';

export function swipe(slider) {
  let itemList = slider.querySelector('.VerticalSlider-ItemList');
  let sliderMarginTop = parseInt(window.getComputedStyle(slider, null).marginTop, 10);
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);

  manager.on('pan', function(e) {
    let deltaY = e.deltaY;

    let { target } = e;
    if (!target.classList.contains('VerticalSlider-ItemList')) {
      target = target.closest('.VerticalSlider-ItemList');
    }

    let sliderHeight = slider.clientHeight;
    let maxOffset = sliderHeight - sliderMarginTop - target.clientHeight;

    if (sliderHeight < target.clientHeight) {
      if (deltaY > 0) {
        deltaY = 0;
      } else if (deltaY < maxOffset) {
        deltaY = maxOffset;
      }

      var direction = e.offsetDirection;
      var translate3d = `translate3d(0, ${deltaY}px, 0)`;

      if (direction === 8 || direction === 16) {
        let { target } = e;
        if (!target.classList.contains('VerticalSlider-ItemList')) {
          target = target.closest('.VerticalSlider-ItemList');
        }

        target.style.transform = translate3d;
      }
    }
  });
}
