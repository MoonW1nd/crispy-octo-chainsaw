import Hammer from 'hammerjs';

export class PanHandler {
  constructor(parent, list, manager) {
    this.parent = parent;
    this.list = list;
    this.manager = manager;
  }

  vertical(margin) {
    let sumOffset = 0;
    let parent = this.parent;
    let list = this.list;
    let lastDelta = 0;

    this.manager.on('panend', () => {
      lastDelta = 0;
    });
    this.manager.on('pancancel', () => {
      lastDelta = 0;
    });

    return event => {
      const listHeight = list.clientHeight;
      const parentHeight = parent.clientHeight;
      const maxOffset = parentHeight - listHeight - margin;
      let { deltaY } = event;
      const offset = deltaY - lastDelta;
      lastDelta = deltaY;

      if (parentHeight < listHeight) {
        sumOffset += offset;
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
    let lastDelta = 0;

    this.manager.on('panend', () => {
      lastDelta = 0;
    });
    this.manager.on('pancancel', () => {
      lastDelta = 0;
    });

    return event => {
      const listWidth = list.clientWidth;
      const parentWidth = parent.clientWidth;
      const maxOffset = parentWidth - listWidth - margin;
      let { deltaX } = event;

      const offset = deltaX - lastDelta;
      lastDelta = deltaX;

      if (parentWidth < listWidth) {
        sumOffset += offset;
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
