export function toggleStateActive() {
  const target = event.currentTarget;
  const itemList = target.parentNode;
  itemList.querySelector('.Menu-Item_state_active').classList.remove('Menu-Item_state_active');
  target.classList.add('Menu-Item_state_active');
}

export function open(menu) {
  const buttonMenu = menu.querySelector('.Menu-Button');
  const listItem = menu.querySelector('.Menu-ListItem');

  buttonMenu.addEventListener('click', () => {
    listItem.style.display = 'flex';
  });
}

export function close(menu) {
  const buttonMenu = menu.querySelector('.Menu-Button');
  const listItem = menu.querySelector('.Menu-ListItem');

  const closeHandler = () => {
    let windowWidth = document.documentElement.clientWidth;
    if (windowWidth <= 850) {
      listItem.style.display = 'none';
    }
  };

  listItem.addEventListener('click', closeHandler);
}

export default {
  toggleStateActive,
  open,
  close,
};
