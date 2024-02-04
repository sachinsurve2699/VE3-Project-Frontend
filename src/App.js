// App.js
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Login from './components/userlogin'
import Tasklist from './components/Dashboard'
import Register from './components/userregister'
import TaskDetails from './components/Details ';
import Addtask from './components/Adddetails';
import Updatetask from './components/Updatedetails';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  var isUserLoggedIn = sessionStorage.getItem('isUserLoggedIn');

  return (
    <Router>

      <Navbar isUserLoggedIn={isUserLoggedIn} />
      <Route exact path="/" component={isUserLoggedIn === "true" ? Tasklist : Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route path="/tasks/:id" component={TaskDetails} />
      <Route path="/add" component={Addtask}/>
      <Route path="/Update/:id" component={Updatetask}/>
      <ToastContainer position="bottom-right" autoClose={2000} hideProgressBar />     
             
    </Router>
  );
};

export default App;
