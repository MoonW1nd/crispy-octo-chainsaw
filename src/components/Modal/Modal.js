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

    const modalIcon = modal.querySelector('.Modal-Icon');
    const { iconType, controller, currentValue } = target.dataset;
    modalIcon.src = `../assets/icon_${iconType}_active.svg`;
    modalIcon.setAttribute('alt', `icon-${iconType}`);

    let valueElement = modal.querySelector('.Modal-Value');
    if (iconType === 'temperature') {
      let setValue = currentValue;
      if (currentValue > 0) setValue = `+${currentValue}`;
      valueElement.innerHTML = `<b>${setValue}</b>`;
    } else {
      valueElement.innerHTML = '';
    }

    let controllerElement;
    if (controller === 'range' && iconType === 'sun') {
      controllerElement = modal.querySelector('.Modal-LightController');
    } else if (controller === 'range' && iconType === 'temperature') {
      controllerElement = modal.querySelector('.Modal-TemperatureController');
    } else if (controller === 'rotation') {
      controllerElement = modal.querySelector('.Modal-FloorController');
    } else {
      console.warn('[Error] in Modal.animationOpen method: not find correct controller');
    }

    controllerElement.classList.remove('Modal_hidden');
    if (controller === 'range')
      controllerElement.querySelector('input[type="range"]').setAttribute('value', currentValue);

    modal.classList.remove('Modal_hidden');
    pageWrapper.classList.add('Modal_blure');
    document.querySelector('body').classList.add('Modal_body');
    modal.style.top = `${pageYOffset}px`;
  };
}

export function animationClose(modal, pageWrapper) {
  return event => {
    modal.classList.add('Modal_hidden');
    let controllers = modal.querySelector('.Modal-Controller').children;
    controllers = Array.prototype.slice.call(controllers);
    controllers.forEach(element => element.classList.add('Modal_hidden'));
    pageWrapper.classList.remove('Modal_blure');
    document.querySelector('body').classList.remove('Modal_body');
    modal.style.top = '';
  };
}

export default {
  animationOpen,
  animationClose,
};
