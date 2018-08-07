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

    if (windowWidth <= 850) {
      horizontalPan(e);
    }
  });
}

export function setPreset(controller) {
  const presetButtons = controller.querySelectorAll('.Filter-Button');
  const input = controller.querySelector('.RangeController-Scale');
  const maxValue = input.getAttribute('max');

  Array.prototype.forEach.call(presetButtons, button => {
    button.addEventListener('click', event => {
      const button = event.currentTarget;
      button
        .closest('.Filter-TypesList')
        .querySelector('.Filter-Button_state_active')
        .classList.remove('Filter-Button_state_active');

      button.classList.add('Filter-Button_state_active');

      switch (button.dataset.tag) {
        case 'low':
          input.value = maxValue * 0.1;
          break;

        case 'medium':
          input.value = maxValue * 0.5;
          break;

        case 'large':
          input.value = maxValue * 0.9;
          break;

        case 'hand':
          break;

        default:
          console.warn('Not correct tag in preset handler');
          break;
      }
    });
  });
}

export default {
  presetsSwipe,
  setPreset,
};
