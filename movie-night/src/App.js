import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import ListCreate from './pages/ListCreate';
import ListDelete from './pages/ListDelete';
import ListEdit from './pages/ListEdit';
import ListAll from './pages/ListAll';
import ListIndividual from './pages/ListIndividual';
import ListUser from './pages/ListUser';
import OopsSignIn from './pages/Oops/SignIn';
import history from './history';

class App extends React.Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <Router history={history} >
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={ListAll} />
              <Route path="/list/user/:userid" component={ListUser} />
              <Route path="/list/new" component={ListCreate} />
              <Route path="/list/edit/:id" component={ListEdit} />
              <Route path="/list/delete/:id" component={ListDelete} />
              <Route path="/list/:id" component={ListIndividual} />
              <Route path="/oops/signIn" component={OopsSignIn} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App
