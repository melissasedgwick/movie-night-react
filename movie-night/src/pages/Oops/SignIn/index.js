import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import GoogleAuth from '../../../components/GoogleAuth';
import history from '../../../history';

export class OopsSignIn extends React.Component {
  componentDidMount() {
    if (this.props.isSignedIn) {
      history.goBack();
    }
  }

  componentDidUpdate() {
    if (this.props.isSignedIn) {
      history.goBack();
    }
  }

  render() {
    return (
      <div>
        <h2 className="ui centre aligned icon header">Oops! You need to be signed in to view this page!</h2>
        <div style={{ textAlign: 'center' }}>
          <h3>Please sign in:</h3>
          <GoogleAuth />
          <h3>Or return to the home page:</h3>
          <Link to="/" className="ui button primary">All Movie Lists</Link>
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps)(OopsSignIn);
