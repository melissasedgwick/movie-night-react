import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header'
import ListCreate from './pages/ListCreate'
import ListDelete from './pages/ListDelete'
import ListEdit from './pages/ListEdit'
import ListAll from './pages/ListAll'
import ListIndividual from './pages/ListIndividual'

class App extends React.Component {
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px' }}>
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={ListAll} />
              <Route path="/list/new" component={ListCreate} />
              <Route path="/list/edit" component={ListEdit} />
              <Route path="/list/delete" component={ListDelete} />
              <Route path="/list/:id" component={ListIndividual} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App
