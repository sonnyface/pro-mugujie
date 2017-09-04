
import React from "react";
import {hashHistory} from "react-router";
import "./../scss/user.scss";
import MyAjax from "./../MyAjax.js";
import Toast from "./Toast.js";


export default class User extends React.Component{
	constructor(props){
		super(props);
	}
	

	toExit(){

		Toast.makeText("已退出",1500);
		$("#toast").css({
			background:"#666",
			bottom:"50%"
		});

		localStorage.clear();

		setTimeout(function(){

			$(".box").css("display","none");
			$("#footer").css("display","none");
			$(".userBox").css({display:"block","z-index":"800"});
		},2000)

		setTimeout(function(){	

			hashHistory.push("/login")
			
		},3000)				
	
		
	}

	
	render(){
		return(
		<div id="container">

			<div className="userBox">				
				<button id="userBtn" >请先登录</button>							
			</div>

			<div className="box">

				<div className="userHeader">
					<img src="http://s3.mogucdn.com/mlcdn/5abf39/170808_5j43faa91jk9a37h703fla9l2g4ki_100x100.jpg_170x170.jpg"/>
					<p>
					 	<h2>昵称</h2>
					 	<a>我的收货地址<span>&gt;</span></a>
					</p>
				</div>
				<div className="userContent">

					<div className="kongBox"></div>

					<div className="dingDan">
						<img src="https://s10.mogucdn.com/p1/160727/upload_ie4wenzume4tsmjqmezdambqgqyde_56x56.png" />
						<span>我的订单</span>
						<b> &gt; </b>
					</div>

					<div className="fuKuan">
						<dl>
							<dt><img src="https://s10.mogucdn.com/p1/160829/idid_ifqwcmddgrswkzdbmezdambqgyyde_38x33.png" /></dt>
							<dd>待付款</dd>						
						</dl>
						<dl>
							<dt><img src="https://s10.mogucdn.com/p1/160829/idid_ie4dcoddmnswkzdbmezdambqgiyde_38x36.png" /></dt>
							<dd>待收货</dd>						
						</dl>
						<dl>
							<dt><img src="https://s10.mogucdn.com/p1/160830/idid_ie4gimztheygcmdcmezdambqgiyde_38x36.png" /></dt>
							<dd>待评价</dd>						
						</dl>
						<dl>
							<dt><img src="https://s10.mogucdn.com/p1/160829/idid_ie3wezbvhbtgkzdbmezdambqgayde_38x35.png" /></dt>
							<dd>售后</dd>						
						</dl>
					</div>

					<div className="kongBox"></div>

					<div className="listBoxs">
						<ul>
							<li>
								<img src="//s6.mogucdn.com/p2/161130/159_0ihj4c5a23kabh84ka8dfhl552dla_56x56.png" />
								<span>我的购物车</span>
								<b> &gt; </b>
							</li>
							<li>
								<img src="//s2.mogucdn.com/mlcdn/c45406/170419_7c5a4j17k0061bg4kiagf9lc69fe8_56x56.png" />
								<span>我的拼团</span>
								<b> &gt; </b>
							</li>
							<li>
								<img src="//s10.mogucdn.com/mlcdn/c45406/170803_840decficafea4lfg10gjc2a020gc_56x56.png" />
								<span>我的钱包</span>
								<b><a>快速提现</a>  &gt; </b>
							</li>
							<li>
								<img src="//s10.mogucdn.com/p2/160822/159_00ijba9e46e13970ec7kakll8a06a_56x56.png" />
								<span>我的优惠券</span>
								<b>  &gt; </b>
							</li>
							<li>
								<img src="//s16.mogucdn.com/p1/160727/upload_ifqtsndeg43gkmrqmezdambqgyyde_56x56.png"/>
								<span>我收藏的商品</span>
								<b> &gt; </b>
							</li>
							<li>
								<img src="//s17.mogucdn.com/p1/160727/upload_ie4wmy3gmq3wkmrqmezdambqgqyde_56x56.png" />
								<span>我收藏店铺</span>
								<b> &gt; </b>
							</li>
							<li>
								<img src="https://s10.mogucdn.com/p2/170217/79944927_03dfe3a4b2fg9kd5849093d56ib14_750x130.png" alt="" />
							</li>
							<li>
								<img src="//s16.mogucdn.com/p1/160727/upload_ie4tgm3ege4wkmrqmezdambqgqyde_56x56.png" />
								<span>消息通知</span>
								<b>  &gt; </b>
							</li>
							<li>
								<img src="//s16.mogucdn.com/p1/160307/idid_ifrtqmdfgztggnzsg4zdambqhayde_84x84.png"/>
								<span>客服</span>
								<b> &gt; </b>
							</li>
							<li>
								<img src="//s17.mogucdn.com/p1/160727/upload_ifrdonbugezgkmrqmezdambqmeyde_56x56.png" />
								<span>意见反馈</span>
								<b> &gt; </b>
							</li>
						</ul>
					</div>

					<div className="userBtms">
						<div id="btn" onClick={this.toExit.bind(this)}>退出登录</div>
					</div>


				</div>
			</div>
		</div>
	   )
	}

}
