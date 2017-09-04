
import React from "react";
import "./../scss/cart.scss";
import {hashHistory} from "react-router";

export default class Cart extends React.Component{
	constructor(props){
		super(props);
	}

	toHomePage(){
		hashHistory.push("/")
	}

	toLoginPage(){
		hashHistory.push("/login")
	}
	
	render(){
		return(
			<div className="type">

				<div  className="cartOne">

					<header id="header">
						<div className="cartHeader">
							<div className="homeImg1" onClick={this.toHomePage.bind(this)}>
								<i className="iconfont">&#xe615;</i>
							</div>						
							<div className="headerBox">
								购物车
							</div>
							<div className="homeImg2">
								<span>编辑</span>
								<i className="iconfont" onClick={this.toLoginPage.bind(this)}>&#xe635;</i>
							</div>					
						</div>					
					</header>

					<div id="content" className="content">
						<div className="CartContent">
							<div className="shopBox">
								<i className="iconfont">&#xe600;</i>
							</div>
							<p>购物车还是空的哦～</p>
							<div className="shopBtn" onClick={this.toHomePage.bind(this)}>去逛逛</div>
						</div>				
					</div>

				</div>				
			</div>
		)
	}
}
