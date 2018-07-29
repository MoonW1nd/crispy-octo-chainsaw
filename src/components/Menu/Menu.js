export function toggleStateActive() {
  const target = event.target;
  const $item = $(target).hasClass('Menu-Item') ? $(target) : $(target).closest('.Menu-Item');
  const $itemList = $item.parent();
  $itemList.find('.Menu-Item_state_active').removeClass('Menu-Item_state_active');
  $item.addClass('Menu-Item_state_active');
}

export default {
  toggleStateActive,
};
