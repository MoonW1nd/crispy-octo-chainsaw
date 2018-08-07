import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.VerticalSlider-ItemList');
  let button = slider.querySelector('.VerticalSlider-Button');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList, manager);
  const verticalPan = panHandler.vertical(20);
  const horizontalPan = panHandler.horizontal(20);

  manager.on('panstart', () => {
    button.style.opacity = 0;
  });
  manager.on('panend', () => {
    button.style.opacity = 1;
  });
  manager.on('pancancel', () => {
    button.style.opacity = 1;
  });

  manager.on('pan', function(e) {
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

export default {
  swipe,
};
