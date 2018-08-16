function getBox(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    width: box.width,
    height: box.height,
  };
}

function _toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}

export function animationOpen(modal, pageWrapper) {
  return event => {
    event.preventDefault();
    let target = event.currentTarget;

    // accesibility settings
    modal.setAttribute('aria-hidden', 'false');

    const title = target.querySelector('.Panel-Title').textContent;
    const description = target.querySelector('.Panel-Description').textContent;
    const modalIcon = modal.querySelector('.Modal-Icon');
    let valueElement = modal.querySelector('.Modal-Value');
    const { iconType, controller, currentValue } = target.dataset;

    modal.querySelector('.Modal-Description').innerHTML = description;
    modal.querySelector('.Modal-Title').innerHTML = `<b>${title}</b>`;

    if (target.classList.contains('Panel_state_active')) {
      modalIcon.src = `../assets/icon_${iconType}_active.svg`;
    } else {
      modalIcon.src = `../assets/icon_${iconType}.svg`;
    }

    if (iconType === 'temperature') {
      let setValue = currentValue;
      if (currentValue > 0) setValue = `+${currentValue}`;
      valueElement.innerHTML = `<b>${setValue}</b>`;
      modalIcon.setAttribute('alt', `иконка: термометр`);
    } else {
      valueElement.innerHTML = '';
      modalIcon.setAttribute('alt', `иконка: свет`);
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

    _toArray(controllerElement.querySelectorAll('.Filter-Button')).forEach(button => {
      button.setAttribute('tabindex', '0');
    });

    _toArray(modal.querySelectorAll('.Modal-Button')).forEach(button => {
      button.setAttribute('tabindex', '0');
    });

    controllerElement.classList.remove('Modal_hidden');
    if (controller === 'range') {
      const rangeController = controllerElement.querySelector('input[type="range"]');
      rangeController.setAttribute('tabindex', '0');
      rangeController.focus();
      rangeController.value = currentValue;
    } else {
      modal.querySelector('.RotationalController-IdicatorBlock').focus();
    }

    // ANIMATION
    const targetClone = target.cloneNode();
    targetClone.classList.add('Panel-Clone');
    const targetBox = getBox(target);

    const modalContent = modal.querySelector('.Modal-Content');
    const modalForm = modal.querySelector('.Modal-Form');

    modalForm.style.opacity = '0';
    Object.assign(targetClone.style, {
      position: 'absolute',
      zIndex: '99',
      transition: '0.3s linear',
      transitionProperty: 'transform, opacity',
      left: `${targetBox.left}px`,
      top: `${targetBox.top}px`,
    });

    document.querySelector('body').appendChild(targetClone);
    modal.classList.remove('Modal_hidden');

    const modalContentSize = modalContent.getBoundingClientRect();
    const modalContentCoords = getBox(modalContent);
    const modalBox = getBox(modal.querySelector('.Modal-Content'));

    Object.assign(targetClone.style, {
      transform: `translate3d(${modalBox.left - targetBox.left}px, ${modalBox.top -
        targetBox.top}px, 0) scale(${modalBox.width / targetBox.width}, ${modalBox.height /
        targetBox.height})`,
      'transform-origin': 'left top',
      'border-radius': '8px',
    });

    setTimeout(() => {
      modalForm.style.transition = '0.2s linear opacity';
      modalForm.style['will-change'] = 'transform, opacity';
      modalForm.style.opacity = 1;

      Object.assign(targetClone.style, {
        // transition: '0.3s linear all',
        opacity: 0,
        pointerEvents: 'none',
      });
    }, 310);

    pageWrapper.classList.add('Modal_animated');
    pageWrapper.classList.add('Modal_blure');
    document.querySelector('body').classList.add('Modal_body');
    modal.style.top = `${pageYOffset}px`;
  };
}

export function animationClose(modal, pageWrapper) {
  return event => {
    // ANIMATION
    event.preventDefault();
    const targetClone = document.documentElement.querySelector('.Modal_body .Panel-Clone');
    const modalContent = modal.querySelector('.Modal-Content');
    const modalForm = modal.querySelector('.Modal-Form');

    modalForm.style.opacity = '0';
    targetClone.style.opacity = '1';

    _toArray(modal.querySelectorAll('.Modal-Button')).forEach(button => {
      button.setAttribute('tabindex', '-1');
    });

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Object.assign(targetClone.style, {
          transform: `translate3d(0, 0, 0) scale(1)`,
          transition: '0.3s linear',
          transitionProperty: 'transform, opacity',
          opacity: '0.5',
        });

        pageWrapper.classList.remove('Modal_blure');

        resolve();
      }, 300);
    });

    promise.then(() => {
      setTimeout(() => {
        let controllers = modal.querySelector('.Modal-Controller').children;
        controllers = Array.prototype.slice.call(controllers);

        pageWrapper.classList.remove('Modal_animated');
        modal.classList.add('Modal_hidden');
        controllers.forEach(element => {
          element.classList.add('Modal_hidden');

          _toArray(element.querySelectorAll('.Filter-Button')).forEach(button => {
            button.setAttribute('tabindex', '-1');
          });

          const rangeController = element.querySelector('input[type="range"]');
          if (rangeController) rangeController.setAttribute('tabindex', '-1');

          // Убираем смещение фильтров
          if (element.querySelector('.Filter-TypesList')) {
            element.querySelector('.Filter-TypesList').style.transform = 'translate3d(0, 0, 0)';
          }

          if (element.classList.contains('RangeController')) {
            element
              .querySelector('.Filter-Button_state_active')
              .classList.remove('Filter-Button_state_active');

            element
              .querySelector('.Filter-Type:first-child .Filter-Button')
              .classList.add('Filter-Button_state_active');
          }
        });
        document.querySelector('body').classList.remove('Modal_body');

        modal.style.top = '';
        targetClone.remove();
      }, 250);
    });
  };
}

export default {
  animationOpen,
  animationClose,
};
