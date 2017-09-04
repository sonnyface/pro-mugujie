

import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory, IndexRoute} from "react-router";

import "./scss/main.scss";

import App from "./md/App.js";
import Home from "./md/Home.js";
import Kind from "./md/Kind.js";
import Cart from "./md/Cart.js";
import User from "./md/User.js";
import Search from "./md/Search.js";
import Detail from "./md/Detail.js";
import Carter from "./md/carter.js";
import Shopping from "./md/Shopping.js";



import Login from "./md/Login.js";
import Register from "./md/Register.js";


ReactDOM.render((
	<Router history = {hashHistory}>
		<Route	path = "/" component = {App}>
			<IndexRoute components = {{type:Home}} />
			<Route path = "kind" components = {{type:Kind}}/>
			<Route path = "user" components={{type:User}}/>			
		</Route>

		<Route path="/cart" component={Cart}/>      
		<Route path="/shopping" component={Shopping}/>       
		<Route path="/detail" component={Detail}/>		
		<Route path="/carter" component={Carter}/>	  
		<Route path="/login" component={Login}/>        
		<Route path="/register" component={Register}/>    
		<Route path="/search" component={Search}/>         

			
	</Router>
),document.getElementById("app"));

