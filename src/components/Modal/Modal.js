export function animationOpen(modal, pageWrapper) {
  return event => {
    let { target } = event;
    if (!target.classList.contains('Panel')) {
      target = target.closest('.Panel');
    }

    const title = target.querySelector('.Panel-Title').textContent;
    const description = target.querySelector('.Panel-Description').textContent;
    modal.querySelector('.Modal-Title').innerHTML = `<b>${title}</b>`;
    modal.querySelector('.Modal-Description').innerHTML = description;
    modal.classList.remove('Modal_hidden');
    pageWrapper.classList.add('Modal_blure');
    document.querySelector('body').classList.add('Modal_body');
    modal.style.top = `${pageYOffset}px`;
    const modalIcon = modal.querySelector('.Modal-Icon');
    const { iconType } = target.dataset;
    modalIcon.src = `../assets/icon_${iconType}_active.svg`;
    modalIcon.setAttribute('alt', `icon-${iconType}`);
  };
}

export function animationClose(modal, pageWrapper) {
  return event => {
    modal.classList.add('Modal_hidden');
    pageWrapper.classList.remove('Modal_blure');
    document.querySelector('body').classList.remove('Modal_body');
    modal.style.top = '';
  };
}

export default {
  animationOpen,
  animationClose,
};
