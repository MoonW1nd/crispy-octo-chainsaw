function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

export function animationOpen(modal, pageWrapper) {
  return event => {
    let { target } = event;
    if (!target.classList.contains('Panel')) {
      target = target.closest('.Panel');
    }

    const title = target.querySelector('.Panel-Title').textContent;
    const description = target.querySelector('.Panel-Description').textContent;
    const modalIcon = modal.querySelector('.Modal-Icon');
    let valueElement = modal.querySelector('.Modal-Value');
    const { iconType, controller, currentValue } = target.dataset;

    modal.querySelector('.Modal-Description').innerHTML = description;
    modal.querySelector('.Modal-Title').innerHTML = `<b>${title}</b>`;
    modalIcon.src = `../assets/icon_${iconType}_active.svg`;
    modalIcon.setAttribute('alt', `icon-${iconType}`);

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

    // ANIMATION
    const targetClone = target.cloneNode();
    targetClone.classList.add('Panel-Clone');
    const targetCoords = getCoords(target);

    modal.setAttribute('data-card-top', targetCoords.top);
    modal.setAttribute('data-card-left', targetCoords.left);

    const modalContent = modal.querySelector('.Modal-Content');
    const modalForm = modal.querySelector('.Modal-Form');

    modalForm.style.opacity = '0';
    Object.assign(targetClone.style, {
      position: 'absolute',
      zIndex: '99',
      transition: '0.2s linear all',
      left: `${targetCoords.left}px`,
      top: `${targetCoords.top}px`,
    });

    document.querySelector('body').appendChild(targetClone);
    modal.classList.remove('Modal_hidden');

    const modalContentSize = modalContent.getBoundingClientRect();
    const modalContentCoords = getCoords(modalContent);

    Object.assign(targetClone.style, {
      width: `${modalContentSize.width}px`,
      height: `${modalContentSize.height}px`,
      top: `${modalContentCoords.top}px`,
      left: `${modalContentCoords.left}px`,
    });

    setTimeout(() => {
      modalForm.style.transition = '0.2s linear opacity';
      modalForm.style.opacity = 1;

      Object.assign(targetClone.style, {
        transition: '0.2s linear all',
        opacity: 0,
        pointerEvents: 'none',
      });
    }, 210);

    pageWrapper.classList.add('Modal_animated');
    pageWrapper.classList.add('Modal_blure');
    document.querySelector('body').classList.add('Modal_body');
    modal.style.top = `${pageYOffset}px`;
  };
}

export function animationClose(modal, pageWrapper) {
  return event => {
    // ANIMATION
    const targetCoords = {
      top: modal.dataset.cardTop,
      left: modal.dataset.cardLeft,
    };

    const targetClone = document.documentElement.querySelector('.Modal_body .Panel-Clone');
    const modalContent = modal.querySelector('.Modal-Content');
    const modalForm = modal.querySelector('.Modal-Form');

    modalForm.style.opacity = '0';
    targetClone.style.opacity = '1';

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Object.assign(targetClone.style, {
          left: `${targetCoords.left}px`,
          top: `${targetCoords.top}px`,
          transition: '0.2s linear all',
          width: '200px',
          height: '120px',
        });

        pageWrapper.classList.remove('Modal_blure');

        resolve();
      }, 200);
    });

    promise.then(() => {
      setTimeout(() => {
        let controllers = modal.querySelector('.Modal-Controller').children;
        controllers = Array.prototype.slice.call(controllers);

        pageWrapper.classList.remove('Modal_animated');
        modal.classList.add('Modal_hidden');
        controllers.forEach(element => element.classList.add('Modal_hidden'));
        document.querySelector('body').classList.remove('Modal_body');

        modal.style.top = '';
        targetClone.remove();
      }, 200);
    });
  };
}

export default {
  animationOpen,
  animationClose,
};
