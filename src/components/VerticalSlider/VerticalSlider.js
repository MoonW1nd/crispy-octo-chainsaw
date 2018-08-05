import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.VerticalSlider-ItemList');
  let sliderMarginTop = parseInt(window.getComputedStyle(slider, null).marginTop, 10);
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList);
  const verticalPan = panHandler.vertical(20);
  const horizontalPan = panHandler.horizontal(20);

  manager.on('pan', function(e) {
    let deltaY = e.deltaY;
    let deltaX = e.deltaX;

    let sliderWidth = slider.clientWidth;
    let sliderHeight = slider.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth > 650) {
      verticalPan(e);
    } else {
      horizontalPan(e);
    }
  });
}

function verticalPan(parent, list, margin) {
  let sumOffset = 0;
  return event => {
    const listHeight = list.clientHeight;
    const parentHeight = parent.clientHeight;
    const maxOffset = parentHeight - listHeight - margin;
    let { deltaY } = event;

    if (parentHeight < listHeight) {
      sumOffset += deltaY / 2;
      if (sumOffset > 0) {
        sumOffset = 0;
      } else if (sumOffset < maxOffset) {
        sumOffset = maxOffset;
      }

      const direction = event.offsetDirection;
      const translate3d = `translate3d(0, ${sumOffset}px, 0)`;

      if (direction === Hammer.DIRECTION_UP || direction === Hammer.DIRECTION_DOWN) {
        list.style.transform = translate3d;
      }
    }
  };
}
