
import React from "react";
import {Link, IndexLink,hashHistory} from "react-router";

export default class App extends React.Component{
	constructor(props){
		super(props);
	}

	toCartPage(){
		if(localStorage.getItem("isLogin")=="1"){
			if(localStorage.getItem("isAddShop")=="1"){
				hashHistory.push("/carter")
			}else{
				hashHistory.push("/cart")
			}

		}else{
			hashHistory.push("/cart")
		}
	}

		
	render(){		
		return (
			<div id="container">
				{this.props.type}
				<footer id="footer">
					<ul>
						<li>
							<IndexLink to = "/" activeClassName="active">
								<i className="iconfont"> &#xe604; </i>
								首页
							</IndexLink>
						</li>
						<li>
							<Link to = "/kind" activeClassName="active">       
								<i className="iconfont"> &#xe72b; </i>
								分类
							</Link>
						</li>
						<li onClick={this.toCartPage.bind(this)}>
							<Link to = "/cart" activeClassName="active" onClick={this.toCartPage.bind(this)}>          
								<i className="iconfont"> &#xe600; </i>
								购物车
							</Link>
						</li>
						<li>
							<Link to = "/user" activeClassName="active" >      
								<i className="iconfont"> &#xe627; </i>
								我的
							</Link>
						</li>
						
					</ul>
				</footer>
			</div>
		)
	}
}
