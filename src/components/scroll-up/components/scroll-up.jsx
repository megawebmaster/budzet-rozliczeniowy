import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import cx from 'classnames';
import jump from 'jump.js';

import './scroll-up.css';

export default class extends PureComponent {
  static propTypes = {
    anchor: PropTypes.object.isRequired,
    time: PropTypes.number,
  };
  static defaultProps = {
    time: 300,
  };

  state = {
    visible: false,
  };

  scrollTop = () => jump(this.props.anchor, { duration: this.props.time });

  scrollListener = (event) => {
    if (!this.state.visible && event.pageY > 200) {
      this.setState({ visible: true });
    } else if (event.pageY < 200) {
      this.setState({ visible: false });
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollListener);
  }

  render() {
    return (
      <Button basic icon onClick={this.scrollTop} className={cx('scroll-up', {visible: this.state.visible})}>
        <Icon size="large" name="arrow circle up" />
      </Button>
    );
  }
}
