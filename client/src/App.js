import React from 'react';
import { Route} from 'react-router-dom';
import './App.css';
import Landing from './component/Landing/Landing.jsx';
import Home from './component/Home/Home.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route exact path="/home" component={Home}/>
    </div>
  );
}

export default App;
