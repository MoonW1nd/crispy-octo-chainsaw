import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.RowSlider-ItemsList');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList, manager);
  const horizontalPan = panHandler.horizontal(40);

  manager.on('pan', function(e) {
    let sliderWidth = slider.clientWidth;
    let sliderHeight = slider.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth <= 850) {
      horizontalPan(e);
    }
  });
}

export default {
  swipe,
};
