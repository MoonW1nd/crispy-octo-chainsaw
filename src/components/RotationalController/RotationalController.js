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
  const pieDiagram = rotationController.querySelector('.RotationalController-PieCircle');
  const pieDash = parseInt(pieDiagram.getAttribute('stroke-dasharray').split(' ')[1], 10);
  const maxValue = 35;
  const minValue = 5;
  const manager = new Hammer.Manager(manipulator);
  const Pan = new Hammer.Pan();
  const RAD_TO_DEG = 180 / Math.PI;
  const MIN_ANGLE = 27;
  const MAX_ANGLE = 330;
  const DEG_DIFF_FIX = 26;
  const DEG_TO_STROKE_DASHARRAY = pieDash / 360;

  function setAngle(pie, indicator, angle) {
    pie.setAttribute('stroke-dasharray', `${angle * DEG_TO_STROKE_DASHARRAY} ${pieDash}`);
    // let rotationAngle = parseFloat(p) - initialRotateOffset + DEG_DIFF_FIX * 2;
    indicator.style.transform = `rotate(${angle - initialRotateOffset + DEG_DIFF_FIX}deg)`;
  }

  manager.add(Pan);

  setAngle(pieDiagram, indicator, 220);

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

    if (angle >= MIN_ANGLE && angle <= MAX_ANGLE) {
      setAngle(pieDiagram, indicator, angle);

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
