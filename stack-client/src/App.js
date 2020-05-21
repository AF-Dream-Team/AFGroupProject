import React from 'react';
import './App.css';
import Nav from './components/nav';
import Order from './components/order';
import Product from './components/product';
import ProductList from './components/productList';
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
              <Route path="/product" component={ Product }></Route>
			   <Route path="/productList" component={ ProductList }></Route>
              <Route path="/" component={ ProductList }></Route>
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
              <Route path="/productList" component={ ProductList }></Route>
              <Route path="/" component={ ProductList }></Route>
            </Switch>
            <ButterToast position={{vertical:POS_TOP,horizontal:POS_RIGHT}}/>
          </div>
        </Router>
      );
    }
  }
}

export default App;
