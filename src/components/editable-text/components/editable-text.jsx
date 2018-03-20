import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, ButtonGroup, Input } from 'semantic-ui-react';

import './editable-text.css';

class EditableText extends PureComponent {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  static propTypes = {
    deletable: PropTypes.bool,
    editable: PropTypes.bool,
    size: PropTypes.string,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    deletable: false,
    editable: false,
    size: 'mini',
  };

  state = {
    editing: false,
    value: '',
  };

  onKeyDown = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      event.stopPropagation();
      this.saveInput();
    }
    if (event.which === 27) {
      event.preventDefault();
      event.stopPropagation();
      this.hideInput();
    }
  };

  updateValue = (_event, data) => {
    this.setState({ value: data.value });
  };

  showInput = () => {
    this.setState({ editing: true });
  };

  hideInput = () => {
    this.setState({ value: this.props.text, editing: false });
  };

  saveInput = () => {
    this.props.onUpdate(this.state.value);
    this.setState({ editing: false });
  };

  renderText = () => {
    const { text, deletable, editable, onDelete } = this.props;

    return (
      <Fragment>
        <ButtonGroup floated="right">
          {editable && <Button icon="pencil" color="teal" size="mini" onClick={this.showInput} />}
          {deletable && <Button icon="trash" color="red" size="mini" onClick={onDelete} />}
        </ButtonGroup>
        <span>{text}</span>
      </Fragment>
    );
  };

  renderInput = () => {
    const { label, size } = this.props;
    const { value } = this.state;

    return (
      <Fragment>
        <Input fluid action size={size} placeholder={label} value={value} onChange={this.updateValue}
               onKeyDown={this.onKeyDown} ref={(input) => this.field = input}>
          <input />
          <Button color="teal" icon="save" onClick={this.saveInput} />
          <Button color="red" icon="close" onClick={this.hideInput} />
        </Input>
      </Fragment>
    );
  };

  componentWillMount() {
    this.setState({ value: this.props.text });
  }

  componentDidUpdate() {
    if (this.state.editing) {
      this.field.focus();
    } else {
      this.field = null;
    }
  }

  render() {
    const { editing } = this.state;

    return (
      <div className="editable-text clearfix">
        {editing ? this.renderInput() : this.renderText()}
      </div>
    );
  }
}

export default injectIntl(EditableText);

