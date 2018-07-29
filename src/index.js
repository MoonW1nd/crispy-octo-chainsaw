import Panel from './components/Panel/Panel.js';
import Menu from './components/Menu/Menu.js';
import Filter from './components/Filter/Filter';

// Panels click heandler;
$('.Panel').on('click', Panel.toggleStateActive);
$('.Header-Menu .Menu-Item').on('click', Menu.toggleStateActive);
const filteredPanels = $('.RowSlider-ItemsList .Panel');
$('.RowSlider-Filter .Filter-Button').on('click', Filter.toggleFilter(filteredPanels));
