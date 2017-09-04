
import React from "react";
import "./../scss/login.scss";
import {hashHistory} from "react-router";
import MyAjax from "./../MyAjax.js";
import Toast from "./Toast.js";


export default class login extends React.Component{
	constructor(props){
		super(props);
	}

	toMenban(){
		window.history.go(-1);
	}
	
	toRegister(){
		hashHistory.push("/register");
	}

	toLogin(){
		var userID=this.refs.userID.value;
		var password=this.refs.password.value;
		console.log(userID,password);

		if(userID=="" || userID==""&&password==""){
			Toast.makeText("请输入用户名/邮箱/手机",2500);
			$("#toast").css("background","red");

		}else{
			$("#UserBtn").attr("disabled","disabled");
			$("#UserBtn").html("正在登录...");
			var url ='http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID='+userID+'&password='+password;
			MyAjax.fetch(url,function(data){
				if(data=="0"){
					Toast.makeText("用户不存在",2500);
					$("#toast").css("background","red");				

				}else if(data=="2"){
					Toast.makeText("密码错误",2500);
					$("#toast").css("background","red")
					
				}else{

					localStorage.setItem("isLogin","1");
					localStorage.setItem("userID",userID);
                	$("#toast").css("background","green")
					Toast.makeText("登录成功",2000);

					setTimeout(function(){

						hashHistory.push("/user")
						
					},3000)
					
					
					
				}
			},function(err){

				$("#loginBtn").removeAttr("disabled");
				$("loginBtn").val("登录");
				console.log(err);
			})
		}

	}

	render(){
		return(
			<div className="type">
				<header id="header">
					<div className="loginHeader">
						<div className="homeImg1" onClick={this.toMenban.bind(this)}>
							<i className="iconfont">&#xe615;</i>
						</div>						
						<div className="headerBox">
							登录
						</div>
						<div className="homeImg2">
							<span>忘记密码</span>
						</div>					
					</div>				
				</header>
				<div id="content" className="content">
					<div className="loginContent">
						<div className="loginIpt">
							<div className="UserBox">
								<p>蘑菇街账号</p>
								<input type="text" ref="userID" placeholder="输入用户名/邮箱/手机"/>
							</div>
							<div className="UserBox">
								<p>密码</p>
								<input type="password" ref="password" placeholder="输入密码"/>
							</div>
							<div className="UserBtn" id="UserBtn" onClick={this.toLogin.bind(this)}>								
								登录
							</div>
							<div className="loginReg">								
								<span> 免费登录 </span>
								<span onClick={this.toRegister.bind(this)}> 注册账号 </span>
							</div>
							<div className="loginQQ">								
								<img src="https://s10.mogucdn.com/p1/150803/upload_ieztmnzwmztdsoddgizdambqgyyde_210x210.png"/>
							</div>
						</div>
					</div>				
				</div>
			</div>
		)
	}
	
	componentDidUpdate(){
		
	}
}
