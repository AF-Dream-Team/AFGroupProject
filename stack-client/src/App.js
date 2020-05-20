import React from 'react';
import './App.css';
import Nav from './components/nav';
import Login from './components/login';
import Register from './components/register';
import Order from './components/order';
import Product from './components/product';
import Users from './components/usersList';
import Category from './components/category';
import { BrowserRouter as Router , Switch , Route } from 'react-router-dom';
import ButterToast,{ POS_RIGHT,POS_TOP } from "butter-toast";

class App extends React.Component {

  render (){
    if(localStorage.getItem('userEmail')){
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/order" component={ Order }></Route>
              <Route path="/usersList" component={ Users }></Route>
              <Route path="/category" component={ Category }></Route>
              <Route path="/product" component={ Product }></Route>
            </Switch>
            <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
          </div>
        </Router>
      );
    }else{
      return (
        <Router>
          <div className="App">
            <Nav />
            <Switch>
              <Route path="/login" component={ Login }></Route>
              <Route path="/register" component={ Register }></Route>
            </Switch>
            <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
          </div>
        </Router>
      );
    }
  }
}

export default App;
