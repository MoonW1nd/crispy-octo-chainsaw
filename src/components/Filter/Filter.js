function _toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

export function toggleFilter(panelsCollection, cb) {
  return event => {
    const target = event.currentTarget;

    panelsCollection = _toArray(panelsCollection);

    const tagFilter = target.dataset.tag;
    const filtersList = target.closest('.Filter-TypesList');

    panelsCollection.forEach((panel, i) => {
      const tags = panel.dataset.tags.split(',');

      if (tagFilter === 'all' || tags.includes(tagFilter)) {
        panel.closest('li').classList.remove('Filter_hidden');
      } else {
        panel.closest('li').classList.add('Filter_hidden');
      }
    });

    panelsCollection[0].parentNode.parentNode.style.transform = 'translate3d(0,0,0)';

    const activeButton = filtersList.querySelector('.Filter-Button_state_active');
    activeButton.classList.remove('Filter-Button_state_active');
    activeButton.parentNode.classList.remove('Filter-Type_state_active');

    target.classList.add('Filter-Button_state_active');
    target.parentNode.classList.add('Filter-Type_state_active');

    if (cb != null) cb();
  };
}

export function toggleOpenCollapseFilter(event) {
  let windowWidth = document.documentElement.clientWidth;
  const filter = event.currentTarget;
  const typesList = filter.querySelector('.Filter-TypesList');

  if (windowWidth <= 650) {
    if (!typesList.classList.contains('Filter-TypesList_open')) {
      typesList.classList.add('Filter-TypesList_open');
    } else {
      typesList.classList.remove('Filter-TypesList_open');
    }
  }
}

export default {
  toggleFilter,
  toggleOpenCollapseFilter,
};
