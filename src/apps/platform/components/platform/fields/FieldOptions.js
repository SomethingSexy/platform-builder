import React, { Component, PropTypes } from 'react';
import Button from '../../common/form/Button';
import AddCustomFieldOptions from './AddCustomFieldOptions';
import update from 'react-addons-update';

class FieldOptions extends Component {
  static get propTypes() {
    return {
      options: PropTypes.array.isRequired,
      onUpdateOptions: PropTypes.func.isRequired
    };
  }

  constructor(props) {
    super(props);
    // just a local state for storing the form data
    this.state = {
      options: props.options || []
    };
  }

  onClick() {
    // toggle the adding of an option
    this.setState({ showAdd: this.state.showAdd ? false : true });
  }

  render() {
    return (
      <div>
        <h5>Options</h5>
        <Button text="Add Option" onButtonClick={this.onClick.bind(this)} />
        <ul>
          {this.state.options.map((result, index) => {
            return <li key={index}><span>{result.label}</span><span>{result.value}</span><span onClick={this.handleRemoveOption.bind(this, index)}>Remove</span></li>;
          })}
        </ul>
        {this.state.showAdd ? <AddCustomFieldOptions onSave={this.handleSaveOption.bind(this)}/> : null}
      </div>
    );
  }

  handleRemoveOption(index) {
    this.setState({
      options: update(this.state.options, {$splice: [[index, 1]]})
    }, () => {
      this.props.onUpdateOptions(this.state);
    });
  }

  handleSaveOption(option) {
    this.setState({
      options: update(this.state.options, {$push: [option]}),
      showAdd: false
    }, () => {
      this.props.onUpdateOptions(this.state);
    });
  }
}

export default FieldOptions;
