import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.RowSlider-ItemsList');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList);
  const horizontalPanMobile = panHandler.horizontal(40);
  const horizontalPanDesktop = panHandler.horizontal(80);

  manager.on('pan', function(e) {
    let sliderWidth = slider.clientWidth;
    let sliderHeight = slider.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth > 850) {
      horizontalPanDesktop(e);
    } else {
      horizontalPanMobile(e);
    }
  });
}

export default {
  swipe,
};
