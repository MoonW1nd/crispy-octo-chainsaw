import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function presetsSwipe(preset, type) {
  let itemList = preset.querySelector('.Filter-TypesList');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(preset, itemList, manager);

  let horizontalPan;
  if (type === 'temperature') {
    horizontalPan = panHandler.horizontal(-10);
  } else if (type === 'light') {
    horizontalPan = panHandler.horizontal(50);
  } else {
    console.warn('RangeController | not correct type');
  }

  manager.on('pan', function(e) {
    let sliderWidth = preset.clientWidth;
    let sliderHeight = preset.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 850) {
      horizontalPan(e);
    }
  });
}

export default {
  presetsSwipe,
};
