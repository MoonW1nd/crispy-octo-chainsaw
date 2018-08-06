import Hammer from 'hammerjs';

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
  };
}

export function rotation(rotationController) {
  const manipulator = rotationController.querySelector('.RotationalController-IdicatorBlock');
  const indicator = rotationController.querySelector('.RotationalController-Indicator');
  const valueContainer = rotationController.querySelector('.RotationalController-Value b');
  const initialRotateOffset = -151;
  const pieDiagram = rotationController.querySelector('.RotationalController-Pie');
  const maxValue = 35;
  const minValue = 5;
  const manager = new Hammer.Manager(manipulator);
  const Pan = new Hammer.Pan();
  const RAD_TO_DEG = 180 / Math.PI;
  const MIN_ANGLE = 27;
  const MAX_ANGLE = 330;
  const DEG_DIFF_FIX = 28;

  function setAngle(pie, indicator) {
    var p = pie.textContent;
    pie.style.animationDelay = '-' + parseFloat(p) + 's';
    pie.style['WebkitAnimationDelay'] = '-' + parseFloat(p) + 's';
    let rotationAngle = parseFloat(p) - initialRotateOffset + DEG_DIFF_FIX * 2;
    indicator.style.transform = `rotate(${rotationAngle}deg)`;
  }

  manager.add(Pan);
  setAngle(pieDiagram, indicator);

  manager.on('pan', e => {
    let coords = getCoords(manipulator);
    let centerX = coords.left + manipulator.getBoundingClientRect().width / 2;
    let centerY = coords.top + manipulator.getBoundingClientRect().height / 2;

    // 0.1 - добавлено для того чтобы не было деления 0
    let x = e.srcEvent.pageX - centerX + 0.1;
    let y = e.srcEvent.pageY - centerY;
    let angle = Math.atan(-x / y);

    if (y < 0) angle += Math.PI;
    angle *= RAD_TO_DEG;
    if (angle < 0) angle = 360 + angle;

    if (angle > MIN_ANGLE && angle < MAX_ANGLE) {
      pieDiagram.textContent = `${angle - DEG_DIFF_FIX}deg`;
      setAngle(pieDiagram, indicator);

      const value = Math.floor(
        ((maxValue - minValue + 1) * (angle - MIN_ANGLE)) / (MAX_ANGLE - MIN_ANGLE) + minValue
      );
      valueContainer.textContent = `+${value}`;
    }
  });
}

export default {
  rotation,
};
