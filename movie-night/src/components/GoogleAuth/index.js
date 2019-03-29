import React from 'react';

 class GoogleAuth extends React.Component {
   state = { isSignedIn: null };

  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: 'email'
      }).then(() => {
      this.auth = window.gapi.auth2.getAuthInstance();
      this.setState({ isSignedIn: this.auth.isSignedIn.get() });
      this.auth.isSignedIn.listen(this.onAuthChange);
      });
    });
  };

  onAuthChange = () => {
    this.setState({ isSignedIn: this.auth.isSignedIn.get() });
  };

   onSignIn = () => {
    this.auth.signIn();
  };

   onSignOut = () => {
    this.auth.signOut();
  };

   renderAuthButton() {
    switch (this.state.isSignedIn) {
      case true:
        return (
          <button className="ui red google button" onClick={this.onSignOut}>
            <i className="google icon" />
            Sign Out
          </button>
        );
      case false:
        return (
          <button className="ui red google button" onClick={this.onSignIn}>
            <i className="google icon" />
            Sign In
          </button>
        );
      default:
        return null;
    }
  }

   render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  };
};

 export default GoogleAuth;
