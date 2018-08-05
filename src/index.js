import Panel from './components/Panel/Panel.js';
import Menu from './components/Menu/Menu.js';
import Filter from './components/Filter/Filter.js';
import Modal from './components/Modal/Modal.js';
import VerticalSlider from './components/VerticalSlider/VerticalSlider.js';
import RotationalController from './components/RotationalController/RotationalController.js';
import GridSlider from './components/GridSlider/GridSlider.js';
import RowSlider from './components/RowSlider/RowSlider';

// Panels click heandler;
$('.GridSlider .Panel').on('click', Panel.toggleStateActive);
$('.Header-Menu .Menu-Item').on('click', Menu.toggleStateActive);
const filteredPanels = $('.RowSlider-ItemsList .Panel');
$('.RowSlider-Filter .Filter-Button').on('click', Filter.toggleFilter(filteredPanels));

// Modal
const elementModal = document.querySelector('.Modal');
const buttonClose = elementModal.querySelector('.Button:not(.Button_type_confirm)');
const pageWrapper = document.querySelector('.Page-summary');
buttonClose.addEventListener('click', Modal.animationClose(elementModal, pageWrapper));
$('.RowSlider .Panel').on('click', Modal.animationOpen(elementModal, pageWrapper));

VerticalSlider.swipe(document.querySelector('.StateWidget .VerticalSlider'));
GridSlider.swipe(document.querySelector('.PageContent-MainRow .GridSlider'));
RowSlider.swipe(document.querySelector('.RowSlider .RowSlider-Row'));

RotationalController.rotation(document.querySelector('.RotationalController'));
