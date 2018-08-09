function getBox(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    width: box.width,
    height: box.height,
  };
}

export class Switch {
  constructor(elementsList, switchElement, shift, margin = 0) {
    this.elementsList = elementsList;
    this.currentTransform = 0;
    this.switchElement = switchElement;
    this.listWrapper = elementsList.parentNode;
    this.leftArrow = this.switchElement.querySelector('.Arrow_direction_left');
    this.rightArrow = this.switchElement.querySelector('.Arrow_direction_right');
    this.switchActive = false;
    this.margin = margin;
    this.shift = shift;
    this.maxShift = this.getMaxShift();
    this._arrowManager();

    // bind
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.resize = this.resize.bind(this);
  }

  getMaxShift() {
    const listWidth = this.elementsList.clientWidth;
    const parentWidth = this.listWrapper.clientWidth;
    return parentWidth - listWidth - this.margin;
  }

  resize() {
    this.elementsList.style.transform = `translateX(0px)`;
    this.currentTransform = 0;
    this.leftArrow.classList.remove('Arrow_active');
    this.rightArrow.classList.remove('Arrow_active');
    this.maxShift = this.getMaxShift();
    this._arrowManager();
  }

  _arrowManager() {
    if (this.elementsList.clientWidth < this.listWrapper.clientWidth) {
      this.leftArrow.classList.remove('Arrow_active');
      this.rightArrow.classList.remove('Arrow_active');
    } else if (this.currentTransform === this.maxShift) {
      this.leftArrow.classList.add('Arrow_active');
      this.rightArrow.classList.remove('Arrow_active');
    } else if (this.currentTransform === 0) {
      this.leftArrow.classList.remove('Arrow_active');
      this.rightArrow.classList.add('Arrow_active');
    } else {
      this.leftArrow.classList.add('Arrow_active');
      this.rightArrow.classList.add('Arrow_active');
    }
  }

  moveLeft(event) {
    if (!this.leftArrow.classList.contains('Arrow_active')) return;
    this.currentTransform += this.shift;

    if (this.currentTransform >= 0) this.currentTransform = 0;
    console.log(this.currentTransform);
    this.elementsList.style.transform = `translateX(${this.currentTransform}px)`;
    this._arrowManager();
  }

  moveRight(event) {
    if (!this.rightArrow.classList.contains('Arrow_active')) return;
    this.currentTransform -= this.shift;
    console.log(this.currentTransform, this.maxShift);
    if (this.currentTransform <= this.maxShift) this.currentTransform = this.maxShift;
    this.elementsList.style.transform = `translateX(${this.currentTransform}px)`;
    this._arrowManager();
  }
}

export default {
  Switch,
};
