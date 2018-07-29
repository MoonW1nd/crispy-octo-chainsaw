export function toggleFilter(panelsList) {
  return event => {
    const target = event.target;
    const $filterButton = $(target).hasClass('Filter-Button')
      ? $(target)
      : $(target).closest('.Filter-Button');
    const tagFilter = $filterButton.attr('data-tag');
    const $filtersList = $filterButton.closest('.Filter-TypesList');

    panelsList.each((i, panel) => {
      const $panel = $(panel);
      const tags = $panel.attr('data-tags').split(',');
      if (tagFilter === 'all' || tags.includes(tagFilter)) {
        $panel.closest('li').removeClass('Filter_hidden');
      } else {
        $panel.closest('li').addClass('Filter_hidden');
      }
    });

    $filtersList.find('.Filter-Button_state_active').removeClass('Filter-Button_state_active');
    $filterButton.addClass('Filter-Button_state_active');
  };
}

function getPanelsTag($panel) {
  return $panel.attr('data-tag').split(',');
}

export default {
  toggleFilter,
};
