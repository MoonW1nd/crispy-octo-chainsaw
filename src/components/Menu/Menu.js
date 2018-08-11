export function toggleStateActive() {
  const target = event.currentTarget;
  const itemList = target.parentNode;
  itemList.querySelector('.Menu-Item_state_active').classList.remove('Menu-Item_state_active');
  target.classList.add('Menu-Item_state_active');
}

export default {
  toggleStateActive,
};
