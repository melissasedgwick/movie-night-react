import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ListCreate from './pages/ListCreate.js'
import ListDelete from './pages/ListDelete.js'
import ListEdit from './pages/ListEdit.js'
import ListAll from './pages/ListAll.js'
import ListIndividual from './pages/ListIndividual.js'

class App extends React.Component {
  render() {
    return (
      <div>
        <div className="ui container" style={{ marginTop: '10px' }}>
          <h1>Movie Night</h1>
        </div>
        <div>
          <BrowserRouter>
            <div>
              <Route path="/" exact component={ListAll} />
              <Route path="/list/new" component={ListCreate} />
              <Route path="/list/edit" component={ListEdit} />
              <Route path="/list/delete" component={ListDelete} />
              <Route path="/list/show" component={ListIndividual} />
            </div>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App
