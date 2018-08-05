import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.GridSlider-ItemsList');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList);
  const horizontalPan = panHandler.horizontal(0);

  manager.on('pan', function(e) {
    let sliderWidth = slider.clientWidth;
    let sliderHeight = slider.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 850) {
      horizontalPan(e);
    }
  });
}

export default {
  swipe,
};
