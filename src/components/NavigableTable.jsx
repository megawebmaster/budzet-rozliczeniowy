import React, { Component } from 'react';
import jump from 'jump.js';

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

const NavigableTable = (WrappedTable, { categoryFetcher, bottomMargin = 0, topMargin = 0 }) => class extends Component {
  state = {
    categories: [],
    current: {
      index: -1,
      type: null,
    },
  };

  setCategories = (props) => {
    this.setState({ categories: categoryFetcher(props) });
  };

  inputMount = (type, category, input) => {
    input.inputRef.dataset.category = category.id;
    input.inputRef.dataset.type = type;
    if (!this.inputs.hasOwnProperty(type)) {
      this.inputs[type] = {};
    }
    this.inputs[type][category.id] = input.inputRef;
  };
  onKeyDown = (e) => {
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
    const { current, categories } = this.state;
    let next = current.index + delta;

    if (next < 0 || next >= Object.keys(this.inputs[current.type]).length) {
      return;
    }

    let offsetTop = 0;
    let elem = this.inputs[current.type][categories[next]];
    do {
      if (!isNaN(elem.offsetLeft)) {
        offsetTop += elem.offsetTop;
      }
      elem = elem.offsetParent;
    } while(elem);

    const windowHeight = document.body.offsetHeight;
    const scrollPosition = window.pageYOffset;

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
    this.inputs[current.type][categories[next]].focus();
    this.setState({ current: { ...current, index: next }});
  };
  onFocus = (e) => {
    const { categories  } = this.state;
    const data = e.target.dataset;
    if (data.category) {
      const category = parseInt(data.category, 10);
      this.setState({ current: { index: categories.indexOf(category), type: data.type }});
    }
  };

  componentWillReceiveProps(nextProps) {
    this.setCategories(nextProps);
  }

  componentWillMount() {
    this.inputs = {};
    this.setCategories(this.props);
  }

  render() {
    return <WrappedTable {...this.props} onInputMount={this.inputMount} onKeyDown={this.onKeyDown}
                         onFocus={this.onFocus} />;
  }
};

export default NavigableTable;
