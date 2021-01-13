import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.scss';

import Home from './Home';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">My Name</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>    
          <div className="collapse navbar-collapse" id="navbarsExampleDefault">
            <ul className="navbar-nav flex-grow-1 mb-2 mb-md-0">
              <li className="nav-item active">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <div className="flex-grow-1 d-flex justify-content-end">
                <li className="nav-item">
                  <Link className="nav-link" to="/logout">Log out</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Log in</Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
