import React from 'react';
import { Route} from 'react-router-dom';
import Landing from './component/Landing/Landing.jsx';
import Home from './component/Home/Home.jsx';
import Detail from './component/Detail/Detail.jsx';
import NavBar from './component/NavBar/NavBar.jsx';
import Create from './component/Create/Create.jsx';

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={Landing}/>
      <Route path="/home" component={NavBar}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/detail/:id" component={Detail}/>
      <Route exact path="/home/create" component={Create}/>
    </div>
  );
}

export default App;
