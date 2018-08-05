import Hammer from 'hammerjs';

export class PanHandler {
  constructor(parent, list) {
    this.parent = parent;
    this.list = list;
  }

  vertical(margin) {
    let sumOffset = 0;
    let parent = this.parent;
    let list = this.list;

    return event => {
      const listHeight = list.clientHeight;
      const parentHeight = parent.clientHeight;
      const maxOffset = parentHeight - listHeight - margin;
      let { deltaY } = event;

      if (parentHeight < listHeight) {
        sumOffset += deltaY / 2;
        if (sumOffset > 0) {
          sumOffset = 0;
        } else if (sumOffset < maxOffset) {
          sumOffset = maxOffset;
        }

        const direction = event.offsetDirection;
        const translate3d = `translate3d(0, ${sumOffset}px, 0)`;

        if (direction === Hammer.DIRECTION_UP || direction === Hammer.DIRECTION_DOWN) {
          list.style.transform = translate3d;
        }
      }
    };
  }

  horizontal(margin) {
    let sumOffset = 0;
    let parent = this.parent;
    let list = this.list;

    return event => {
      const listWidth = list.clientWidth;
      const parentWidth = parent.clientWidth;
      const maxOffset = parentWidth - listWidth - margin;
      let { deltaX } = event;

      if (parentWidth < listWidth) {
        sumOffset += deltaX / 2;
        if (sumOffset > 0) {
          sumOffset = 0;
        } else if (sumOffset < maxOffset) {
          sumOffset = maxOffset;
        }

        const direction = event.offsetDirection;
        var translate3d = `translate3d(${sumOffset}px, 0, 0)`;

        if (direction === Hammer.DIRECTION_LEFT || direction === Hammer.DIRECTION_RIGHT) {
          list.style.transform = translate3d;
        }
      }
    };
  }
}

export default {
  PanHandler,
};
