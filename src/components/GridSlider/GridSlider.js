import Hammer from 'hammerjs';
import { PanHandler } from '../_events/PanHandler';

export function swipe(slider) {
  let itemList = slider.querySelector('.GridSlider-ItemsList');
  let manager = new Hammer.Manager(itemList);
  let Pan = new Hammer.Pan();

  manager.add(Pan);
  const panHandler = new PanHandler(slider, itemList, manager);
  const horizontalPan = panHandler.horizontal(0);

  manager.on('pan', function(e) {
    let sliderWidth = slider.clientWidth;
    let sliderHeight = slider.clientHeight;
    let windowWidth = document.documentElement.clientWidth;

    if (windowWidth <= 850) {
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
    this.itemLists = [this.itemList];
    this.currentItemsList = this.itemList;
    this.currentItemsListIndex = 0;
    this.currentTransform = 0;
    this.switchElement = switchElement;
    this.listWrapper = slider.querySelector(`.GridSlider-Grid`);
    this.leftArrow = this.switchElement.querySelector('.Arrow_direction_left');
    this.rightArrow = this.switchElement.querySelector('.Arrow_direction_right');
    this.switchActive = false;

    // bind
    this.gridManager = this.gridManager.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.resize = this.resize.bind(this);
  }

  gridManager() {
    const items = this.itemList.children;
    const itemListBox = getBox(this.itemList);

    // динамическое создание дополнительных контейнеров
    this.switchActive = false;
    let itemListCount = 1;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const itemsBox = getBox(item);
      if (itemsBox.top + itemsBox.height > itemListBox.top + itemListBox.height) {
        if (this.itemLists.length === 1) {
          let clone = this._createClone();
          clone.style.left = `${itemListBox.width}px`;
          clone.style.width = `${itemListBox.width}px`;
          this.listWrapper.appendChild(clone);
        }
        this.itemLists[itemListCount].appendChild(item);

        let itemBox = getBox(item);
        if (itemBox.top + itemBox.height > itemListBox.top + itemListBox.height) {
          const newClone = this._createClone();
          newClone.style.left = `${itemListBox.width * (this.itemLists.length - 1)}px`;
          this.listWrapper.appendChild(newClone);
          newClone.appendChild(item);
          itemListCount += 1;
        }

        this.switchActive = true;
        i--;
      }
    }
    this._arrowManager();
  }

  resize() {
    const items = Array.prototype.slice.call(this.slider.querySelectorAll('.GridSlider-Item'));
    items.forEach(element => this.itemList.appendChild(element));
    this.itemLists.forEach((list, index) => {
      if (index !== 0) {
        list.remove();
      }
    });
    this.itemList.style.transform = `translateX(0px)`;
    this.currentTransform = 0;
    this.itemLists.length = 1;
    this.switchActive = false;
    this.leftArrow.classList.remove('Arrow_active');
    this.rightArrow.classList.remove('Arrow_active');
    this.currentItemsList = this.listWrapper.firstElementChild;
    this.gridManager();
  }

  _arrowManager() {
    if (this.currentItemsList === this.listWrapper.firstElementChild && this.switchActive) {
      this.leftArrow.classList.add('Arrow_active');
      this.rightArrow.classList.remove('Arrow_active');
    } else if (
      this.currentItemsList === this.listWrapper.lastElementChild &&
      this.itemLists.length !== 1
    ) {
      this.leftArrow.classList.remove('Arrow_active');
      this.rightArrow.classList.add('Arrow_active');
    } else if (this.switchActive) {
      this.leftArrow.classList.add('Arrow_active');
      this.rightArrow.classList.add('Arrow_active');
    } else {
      this.leftArrow.classList.remove('Arrow_active');
      this.rightArrow.classList.remove('Arrow_active');
    }
  }

  moveLeft(event) {
    if (!this.leftArrow.classList.contains('Arrow_active')) return;

    const listWrapperBox = getBox(this.listWrapper);
    let list = this.listWrapper.querySelectorAll('.GridSlider-ItemsList');
    list = Array.prototype.slice.call(list);
    this.currentTransform -= listWrapperBox.width + 15;

    list.forEach(element => (element.style.transform = `translateX(${this.currentTransform}px)`));
    this.currentItemsListIndex += 1;
    this.currentItemsList = this.itemLists[this.currentItemsListIndex];
    this._arrowManager();
  }

  moveRight(event) {
    if (!this.rightArrow.classList.contains('Arrow_active')) return;

    const listWrapperBox = getBox(this.listWrapper);
    let list = this.listWrapper.querySelectorAll('.GridSlider-ItemsList');
    list = Array.prototype.slice.call(list);
    this.currentTransform += listWrapperBox.width + 15;

    list.forEach(element => (element.style.transform = `translateX(${this.currentTransform}px)`));
    this.currentItemsListIndex -= 1;
    this.currentItemsList = this.itemLists[this.currentItemsListIndex];
    this._arrowManager();
  }

  _createClone() {
    const clone = this.itemList.cloneNode();
    clone.classList.add('ItemList_clone');
    this.itemLists.push(clone);
    return clone;
  }
}

export default {
  swipe,
  GridSliderSwitch,
};
