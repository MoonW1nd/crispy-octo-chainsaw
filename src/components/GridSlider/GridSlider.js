import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.GridSlider-ItemsList');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList);
  const horizontalPan = panHandler.horizontal(0);

  manager.on('pan', function(e) {
    let sliderWidth = slider.clientWidth;
    let sliderHeight = slider.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth < 850) {
      horizontalPan(e);
    }
  });
}

function getBox(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    width: box.width,
    height: box.height,
  };
}

export class GridSliderSwitch {
  constructor(slider, switchElement) {
    this.slider = slider;
    this.itemList = slider.querySelector(`.GridSlider-ItemsList`);
    this.itemListClones = [];
    this.currentItemsList = this.itemList;
    this.lastItemsList = this._createClone();
    this.currentTransform = 0;
    this.switchElement = switchElement;
    this.listWrapper = slider.querySelector(`.GridSlider-Grid`);

    // bind
    this.gridManager = this.gridManager.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  gridManager() {
    const items = this.itemList.children;
    const itemListBox = getBox(this.itemList);

    this.itemListClones.forEach((clone, index) => {
      clone.style.left = `${itemListBox.width * (index + 1)}px`;
      this.listWrapper.appendChild(clone);
    });

    let switchIsActive = false;
    let cloneCount = 0;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemsBox = getBox(item);
      if (itemsBox.top + itemsBox.height > itemListBox.top + itemListBox.height) {
        this.itemListClones[cloneCount].appendChild(item);

        let itemBox = getBox(item);
        if (itemBox.top + itemBox.height > itemListBox.top + itemListBox.height) {
          const newClone = this._createClone();
          newClone.style.left = `${itemListBox.width * this.itemListClones.length}px`;
          this.listWrapper.appendChild(newClone);
          newClone.appendChild(item);
          cloneCount += 1;
        }

        switchIsActive = true;
        i--;
      }
    }

    if (switchIsActive) {
      this.switchElement.classList.add('Switch_active');
    } else {
      this.switchElement.classList.remove('Switch_active');
    }
  }

  moveLeft(event) {
    const listWrapperBox = getBox(this.listWrapper);
    let list = this.listWrapper.querySelectorAll('.GridSlider-ItemsList');
    list = Array.prototype.slice.call(list);
    this.currentTransform -= listWrapperBox.width + 15;

    list.forEach(element => (element.style.transform = `translateX(${this.currentTransform}px)`));
  }

  moveRight(event) {
    const listWrapperBox = getBox(this.listWrapper);
    let list = this.listWrapper.querySelectorAll('.GridSlider-ItemsList');
    list = Array.prototype.slice.call(list);
    this.currentTransform += listWrapperBox.width + 15;

    list.forEach(element => (element.style.transform = `translateX(${this.currentTransform}px)`));
  }

  _createClone() {
    const clone = this.itemList.cloneNode();
    clone.classList.add('ItemList_clone');
    this.itemListClones.push(clone);
    return clone;
  }
}

export default {
  swipe,
  GridSliderSwitch,
};
