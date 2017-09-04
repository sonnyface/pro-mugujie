
import React from "react";
import "./../scss/cart.scss";
import {hashHistory} from "react-router";
import MyAjax from "./../MyAjax.js";

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

		var goodsList=localStorage.getItem("goods")
		var data=eval(goodsList );
		console.log(data)

		var arr=[];
		for(var i in data){
			console.log(data[i])
			arr.push(<li key={i}>
						<div className="shopHead01">
							<strong></strong>
							<span>{data[i].userName}</span>
						</div>

						<div className="shopHead02">
							<strong></strong>
							<img src={data[i].image}/>
							<div className="cartText">
								<h2>{data[i].title}</h2>
								<p>
									<span>颜色：黑色；尺码：S；</span>
								</p>
								<p>
									<a>￥{data[i].nowPrice}</a>
									<span>￥{data[i].oldPrice}</span>
								</p>
								<i>X{data[i].num}</i>
							</div>								
							
						</div>

					</li>
		     	)
		   }	
	 
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
						<div className="ShopContenter">
							
							<ul>
								{arr}
							</ul>
						</div>
				
					</div>

				</div>				
			</div>
		)
	}
}





