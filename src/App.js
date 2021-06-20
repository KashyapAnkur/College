import React from 'react';
import './App.css';
import Users from './Components/Users';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import UserList from './Components/UserList';
import UserForm from './Components/UserForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
              <Route exact strict path="/" >
                <Users />
              </Route>
              <Route exact strict path="/userform">
                <UserForm />
              </Route>
              <Route exact strict path="/userlist">
                <UserList />
              </Route>
          </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
