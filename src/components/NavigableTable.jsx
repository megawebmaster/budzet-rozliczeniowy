import React, { Component } from 'react';
import jump from 'jump.js';

const FOOTER_ROW = 'navigable-footer-row';
const ENTER = 13;
const ARROW_UP = 38;
const ARROW_DOWN = 40;
// const ARROW_LEFT = 37;
// const ARROW_RIGHT = 39;

const duration = distance => {
  if (distance < 60) {
    return 150;
  }

  return 250;
};

const NavigableTable = (WrappedTable, { getItems, bottomMargin = 0, topMargin = 0 }) => class extends Component {
  state = {
    items: [],
    current: {
      index: -1,
      type: null,
    },
    hasFooter: false,
  };

  setItems = (props) => {
    this.setState({ items: getItems(props) });
  };
  inputMount = (type, item, input) => {
    if (input === null || input.inputRef === null) {
      return;
    }
    input.inputRef.dataset.item = item;
    input.inputRef.dataset.type = type;
    if (!this.inputs.hasOwnProperty(type)) {
      this.inputs[type] = {};
    }
    this.inputs[type][item] = input.inputRef;
  };
  footerMount = (type, input) => {
    if (input === null || input.inputRef === null) {
      return;
    }
    input.inputRef.dataset.item = FOOTER_ROW;
    input.inputRef.dataset.type = type;
    this.footer[type] = input.inputRef;
    this.setState({ hasFooter: true });
  };
  onKeyDown = (e) => {
    // TODO: We should add this on navigable fields only!
    if ([ENTER, ARROW_UP, ARROW_DOWN].indexOf(e.keyCode) !== -1) {
      if ([ENTER, ARROW_DOWN].indexOf(e.keyCode) !== -1) {
        this.moveFocus(1);
      }
      if ([ARROW_UP].indexOf(e.keyCode) !== -1) {
        this.moveFocus(-1);
      }
    }
  };
  moveFocus = (delta) => {
    const { current, items, hasFooter } = this.state;
    const rows = Object.keys(this.inputs[current.type]).length;
    let elem, input;
    let next = current.index + delta;

    if (next < 0) {
      return;
    }
    if (next < rows) {
      input = elem = this.inputs[current.type][items[next]];
    } else if (hasFooter && next >= rows) {
      input = elem = this.footer[current.type];
      next = FOOTER_ROW;
    } else if (hasFooter && current.index === FOOTER_ROW) {
      if (delta === 1) {
        return;
      }
      next = rows - 1;
      input = elem = this.inputs[current.type][items[next]];
    } else {
      return;
    }

    if (!input) {
      return;
    }

    let offsetTop = 0;
    do {
      if (!isNaN(elem.offsetLeft)) {
        offsetTop += elem.offsetTop;
      }
      elem = elem.offsetParent;
    } while(elem);

    const windowHeight = document.body.offsetHeight;
    const scrollPosition = window.pageYOffset;

    // TODO: We need to hack into jump.js to let us cancel animation loop because other is new and just taking place
    if (delta > 0) {
      const offset = offsetTop + 40 - windowHeight - scrollPosition + bottomMargin;
      if (offset > 0) {
        jump(offset, { duration });
      }
    }
    if (delta < 0) {
      const offset = offsetTop - scrollPosition - 40 - topMargin;
      if (offset < 0) {
        jump(offset, { duration });
      }
    }
    input.focus();
    this.setState({ current: { ...current, index: next }});
  };

  onFocus = (e) => {
    const { current, items } = this.state;
    const data = e.target.dataset;

    if (data.item) {
      if (current.index === FOOTER_ROW || data.item === FOOTER_ROW) {
        this.setState({ current: { index: FOOTER_ROW, type: data.type }});
        return;
      }

      const item = parseInt(data.item, 10);
      this.setState({ current: { index: items.indexOf(item), type: data.type }});
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setItems(nextProps);
  }

  componentWillMount() {
    this.inputs = {};
    this.footer = {};
    this.setItems(this.props);
  }

  render() {
    return <WrappedTable {...this.props} onInputMount={this.inputMount} onFooterMount={this.footerMount}
                         onKeyDown={this.onKeyDown} onFocus={this.onFocus} />;
  }
};

export default NavigableTable;
