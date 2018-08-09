import Panel from './components/Panel/Panel.js';
import Menu from './components/Menu/Menu.js';
import Filter from './components/Filter/Filter.js';
import Modal from './components/Modal/Modal.js';
import VerticalSlider from './components/VerticalSlider/VerticalSlider.js';
import RotationalController from './components/RotationalController/RotationalController.js';
import GridSlider from './components/GridSlider/GridSlider.js';
import RowSlider from './components/RowSlider/RowSlider';
import { GridSliderSwitch } from './components/GridSlider/GridSlider.js';
import RangeController from './components/RangeController/RangeController.js';

// Panels click heandler;
$('.GridSlider .Panel').on('click', Panel.toggleStateActive);
$('.Header-Menu .Menu-Item').on('click', Menu.toggleStateActive);
const filteredPanels = $('.RowSlider-ItemsList .Panel');
$('.RowSlider-Filter .Filter-Button').on('click', Filter.toggleFilter(filteredPanels));

// RowSlider
const rowSliderFilter = document.querySelector('.RowSlider-Filter');
rowSliderFilter.addEventListener('click', Filter.toggleOpenCollapseFilter);

// Modal
const elementModal = document.querySelector('.Modal');
const buttonClose = elementModal.querySelector('.Button:not(.Button_type_confirm)');
const pageWrapper = document.querySelector('.Page-summary');
const temperatureRangeController = document.querySelector(
  '.RangeController.Modal-TemperatureController'
);
const lightRangeController = document.querySelector('.RangeController.Modal-LightController');

RangeController.presetsSwipe(temperatureRangeController, 'temperature');
RangeController.presetsSwipe(lightRangeController, 'light');
RangeController.setPreset(lightRangeController);
RangeController.setPreset(temperatureRangeController);

buttonClose.addEventListener('click', Modal.animationClose(elementModal, pageWrapper));
$('.RowSlider .Panel').on('click', Modal.animationOpen(elementModal, pageWrapper));

VerticalSlider.swipe(document.querySelector('.StateWidget .VerticalSlider'));
GridSlider.swipe(document.querySelector('.PageContent-MainRow .GridSlider'));
RowSlider.swipe(document.querySelector('.RowSlider .RowSlider-Row'));

const gridSliderSwitch = new GridSliderSwitch(
  document.querySelector('.GridSlider'),
  document.querySelector('.GridSlider-Switch')
);
gridSliderSwitch.gridManager();

document
  .querySelector('.GridSlider-Switch .Arrow_direction_left')
  .addEventListener('click', gridSliderSwitch.moveLeft);
document
  .querySelector('.GridSlider-Switch .Arrow_direction_right')
  .addEventListener('click', gridSliderSwitch.moveRight);

RotationalController.rotation(document.querySelector('.RotationalController'));

// оптимизация resize событий
(function() {
  window.addEventListener('resize', resizeThrottler, false);

  var resizeTimeout;
  function resizeThrottler() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function() {
        resizeTimeout = null;
        actualResizeHandler();
        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  function actualResizeHandler() {
    gridSliderSwitch.resize();
  }
})();
