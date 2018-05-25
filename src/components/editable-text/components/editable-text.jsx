import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { Button, ButtonGroup, Icon, Label, Loader } from 'semantic-ui-react';

import './editable-text.css';
import { EditField } from './edit-field';

class EditableText extends PureComponent {
  translate = (id, message) => this.props.intl.formatMessage({ id, defaultMessage: message });

  static propTypes = {
    deletable: PropTypes.bool,
    deleteError: PropTypes.string,
    editable: PropTypes.bool,
    error: PropTypes.string,
    intl: PropTypes.object.isRequired,
    saving: PropTypes.bool,
    size: PropTypes.string,
    text: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };

  static defaultProps = {
    deletable: false,
    deleteError: '',
    editable: false,
    error: '',
    saving: false,
    size: 'mini',
  };

  state = {
    editing: false,
    value: '',
    originalValue: '',
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

  updateValue = (value) => this.setState({ value });
  showInput = () => this.setState({ editing: true });
  hideInput = () => {
    this.setState({ value: this.state.originalValue, editing: this.props.error.length > 0 });
    this.props.onCancel(this.state.originalValue);
  };

  saveInput = () => {
    if (this.state.value !== this.props.text || this.props.error.length > 0) {
      this.props.onUpdate(this.state.value);
    }
    this.setState({ editing: false });
  };

  renderText = () => {
    const { text, deleteError, deletable, editable, saving, onDelete } = this.props;

    return (
      <Fragment>
        {!saving && <ButtonGroup>
          {editable && <Button icon="pencil" color="teal" size="mini" onClick={this.showInput} />}
          {deletable && <Button icon="trash" color="red" size="mini" onClick={onDelete} />}
        </ButtonGroup>}
        <Loader active={saving} size="small" inline />
        {deleteError && <Label color="red" className="error-label">
          <Icon name="exclamation triangle" /> {deleteError}
        </Label>}
        <span>{text}</span>
      </Fragment>
    );
  };

  renderInput = () => {
    const { error, label, size } = this.props;
    const { value } = this.state;

    return <EditField placeholder={label} size={size} value={value} error={error} onChange={this.updateValue}
                      onSave={this.saveInput} onCancel={this.hideInput} inputRef={ref => this.field = ref} />;
  };

  componentDidMount() {
    this.setState({ value: this.props.text, originalValue: this.props.text, editing: this.props.error.length > 0 });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.text, editing: nextProps.error.length > 0 });
    if (!nextProps.saving && !nextProps.error.length > 0) {
      this.setState({ originalValue: nextProps.text });
    }
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

