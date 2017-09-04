
import React from "react";
import "./../scss/register.scss";
import {hashHistory} from "react-router";
import Toast from "./Toast.js";
import MyAjax from "./../MyAjax.js";
import Login from "./Login.js";

export default class Register extends React.Component{
	constructor(props){
		super(props);
		// this.state={
		// 	userID:[],
		// 	pwd:[]
		// }
	}

	toMenban(){
		window.history.go(-1);
	}

	toRegClick(){
		var that=this;
		var userID=this.refs.phone.value;
		var pwd=this.refs.password.value;
		console.log(userID,pwd)

		if(userID==""  || pwd==""){
			Toast.makeText("填写信息不完整",3000);
			$("#toast").css("background","#666");
		}else{
			$(".UserBtn").attr("disabled","disabled");
			$(".UserBtn").html("注册中...");

			var userObj={
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				data:{
					status:"register",
					userID:userID,
					password:pwd
				},
				dataType:"JSON"
			}

			MyAjax.zeptoAjax(userObj,function(data){
				if(data=="0"){
					Toast.makeText("用户名重名",1000);
					$("#toast").css("background","red");
				}else if(data=="1"){
					Toast.makeText("注册成功",1000);
					$("#toast").css("background","green");

					setTimeout(function(){
						hashHistory.push("/login");
					},2000)					

				}else{
					Toast.makeText("注册失败",1000);
					$("#toast").css("background","red");
				}

			})

	  }

	}

	render(){

			return(
			<div className="type">

				<header id="header">
					<div className="registerHeader">
						<div className="homeImg1" onClick={this.toMenban.bind(this)}>
							<i className="iconfont">&#xe615;</i>
						</div>						
						<div className="headerBox">
							进入蘑菇街
						</div>
						<div className="homeImg2">
							<span></span>
						</div>					
					</div>				
				</header>

				<div id="content" className="content">
					<div className="registerContent">
						<div className="registerIpt">
						<div className="country">
								<p>国家与地区</p>
								<div className="area">
								    <span>中国+86</span>
									<span> &gt; </span> 	
								</div>
							</div>
							<div className="UserBox">
								<p>输入手机号</p>
								<input type="text"  ref="phone" placeholder="输入用户名/邮箱/手机" />
							</div>
							<div className="UserBox">
								<p>输入验证码</p>
								<input type="password" ref="password" placeholder="输入密码"/>
							</div>
							<div className="UserBtn" onClick={this.toRegClick.bind(this)}>							
								一键注册
							</div>
							<div className="registerReg">								
								<span>账号密码登录</span>
								<span>免密登录</span>
							</div>
							<div className="registerQQ">								
								<img src="https://s10.mogucdn.com/p1/150803/upload_ieztmnzwmztdsoddgizdambqgyyde_210x210.png"/>
							</div>
						</div>
					</div>				
				</div>
			</div>
		)
	}

	componetDidMount(){

	}
}
