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
import { Switch } from './components/Switch/Switch.js';

function _toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

// Header;
_toArray(document.querySelectorAll('.Header-Menu .Menu-Item')).forEach(item => {
  item.addEventListener('click', Menu.toggleStateActive);
});

Menu.open(document.querySelector('.Header-Menu'));
Menu.close(document.querySelector('.Header-Menu'));

// Объект для дом элементов
const DOM = {
  modal: {},
  rowSlider: {},
  gridSlider: {},
};

// Modal
DOM.modal.main = document.querySelector('.Modal');
DOM.modal.buttonClose = DOM.modal.main.querySelector('.Button:not(.Button_type_submit)');
DOM.modal.buttonConfirm = DOM.modal.main.querySelector('.Button.Button_type_submit');
DOM.modal.pageWrapper = document.querySelector('.Page-summary');
DOM.modal.temperatureController = document.querySelector(
  '.RangeController.Modal-TemperatureController'
);
DOM.modal.lightController = document.querySelector('.RangeController.Modal-LightController');

RangeController.presetsSwipe(DOM.modal.temperatureController, 'temperature');
RangeController.setPreset(DOM.modal.temperatureController);
RangeController.presetsSwipe(DOM.modal.lightController, 'light');
RangeController.setPreset(DOM.modal.lightController);

DOM.modal.buttonClose.addEventListener(
  'click',
  Modal.animationClose(DOM.modal.main, DOM.modal.pageWrapper)
);
DOM.modal.buttonConfirm.addEventListener(
  'click',
  Modal.animationClose(DOM.modal.main, DOM.modal.pageWrapper)
);
RotationalController.rotation(document.querySelector('.RotationalController'));

// RowSlider Handlers
DOM.rowSlider.main = document.querySelector('.RowSlider');
DOM.rowSlider.row = DOM.rowSlider.main.querySelector('.RowSlider-Row');
DOM.rowSlider.itemList = DOM.rowSlider.main.querySelector('.RowSlider-ItemsList');
DOM.rowSlider.switch = DOM.rowSlider.main.querySelector('.Switch');
DOM.rowSlider.arrowLeft = DOM.rowSlider.switch.querySelector('.Arrow_direction_left');
DOM.rowSlider.arrowRight = DOM.rowSlider.switch.querySelector('.Arrow_direction_right');
DOM.rowSlider.filter = document.querySelector('.RowSlider-Filter');
DOM.rowSlider.filterButtons = DOM.rowSlider.filter.querySelectorAll('.Filter-Button');
DOM.rowSlider.panels = DOM.rowSlider.itemList.querySelectorAll('.Panel');
const RowSwitch = new Switch(DOM.rowSlider.itemList, DOM.rowSlider.switch, 430, 80);

DOM.rowSlider.filter.addEventListener('click', Filter.toggleOpenCollapseFilter);
DOM.rowSlider.arrowLeft.addEventListener('click', RowSwitch.moveLeft);
DOM.rowSlider.arrowRight.addEventListener('click', RowSwitch.moveRight);
RowSlider.swipe(DOM.rowSlider.row, RowSwitch._arrowManager());
_toArray(DOM.rowSlider.filterButtons).forEach(button => {
  button.addEventListener('click', Filter.toggleFilter(DOM.rowSlider.panels, RowSwitch.resize));
});
_toArray(DOM.rowSlider.panels).forEach(panel => {
  panel.addEventListener('click', Modal.animationOpen(DOM.modal.main, DOM.modal.pageWrapper));
});

// VerticalSlider
VerticalSlider.swipe(document.querySelector('.StateWidget .VerticalSlider'));
VerticalSlider.shift(document.querySelector('.StateWidget .VerticalSlider'));
const verticalSliderResize = VerticalSlider.resize(
  document.querySelector('.StateWidget .VerticalSlider')
);
verticalSliderResize();

// GridSlider
DOM.gridSlider.main = document.querySelector('.GridSlider');
DOM.gridSlider.panels = DOM.gridSlider.main.querySelectorAll('.Panel');
DOM.gridSlider.switch = DOM.gridSlider.main.querySelector('.GridSlider-Switch');
DOM.gridSlider.arrowLeft = DOM.gridSlider.switch.querySelector('.Arrow_direction_left');
DOM.gridSlider.arrowRight = DOM.gridSlider.switch.querySelector('.Arrow_direction_right');
const GridSwitch = new GridSliderSwitch(DOM.gridSlider.main, DOM.gridSlider.switch);

GridSlider.swipe(DOM.gridSlider.main);
GridSwitch.gridManager();

DOM.gridSlider.arrowLeft.addEventListener('click', GridSwitch.moveLeft);
DOM.gridSlider.arrowRight.addEventListener('click', GridSwitch.moveRight);
_toArray(DOM.gridSlider.panels).forEach(panel => {
  panel.addEventListener('click', Panel.toggleStateActive);
});

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
    GridSwitch.resize();
    RowSwitch.resize();
    verticalSliderResize();
  }
})();
