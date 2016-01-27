import React, {Component,  PropTypes} from 'react';
import {connect} from 'react-redux';
import AddPartForm from '../components/platform/parts/AddPartForm.js'; 
import * as PlatformActions  from '../actions/platform.js';
import * as CategoryActions  from '../actions/categories.js';
import { Link } from 'react-router';

class CreatePart extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      categories: PropTypes.array.isRequired,
      platform: PropTypes.object.isRequired
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      showCreateNewPart: false
    };
  }

  render() {
    const returnLink = '/platform/' + this.props.platform.id + '/build';
    return (
      <div>
        <h3>Create New Part</h3>
        <Link to={returnLink}>Return to Platform</Link>
        <AddPartForm />
      </div>
    );
  }

  static get needs() {
    return [CategoryActions.getCategories, PlatformActions.fetchPlatform];
  }

  handleClickAddNewPart() {
    this.setState({showCreateNewPart: true});
  }

  handleSave(model) {
    // the platform is the data coming from the form, merge it with the current
    // platform data we have
    this.props.dispatch(PlatformActions.savePlatform(Object.assign({}, model)));
  }
}

function select(state) {
  return {
    categories: state.categories.categories,
    platform: state.platformsById[state.workingPlatformId]
  };
}

// not sure what this would all need yet
export default connect(select)(CreatePart);
