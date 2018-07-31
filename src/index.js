import Panel from './components/Panel/Panel.js';
import Menu from './components/Menu/Menu.js';
import Filter from './components/Filter/Filter';
import Modal from './components/Modal/Modal';

// Panels click heandler;
$('.Panel').on('click', Panel.toggleStateActive);
$('.Header-Menu .Menu-Item').on('click', Menu.toggleStateActive);
const filteredPanels = $('.RowSlider-ItemsList .Panel');
$('.RowSlider-Filter .Filter-Button').on('click', Filter.toggleFilter(filteredPanels));

// Modal
const elementModal = document.querySelector('.Modal');
const buttonClose = elementModal.querySelector('.Button:not(.Button_type_confirm)');
const pageWrapper = document.querySelector('.Page-summary');
buttonClose.addEventListener('click', Modal.animationClose(elementModal, pageWrapper));
$('.RowSlider .Panel').on('click', Modal.animationOpen(elementModal, pageWrapper));
