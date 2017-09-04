
import React from "react";
import "./../scss/home.scss";
import {hashHistory} from "react-router";
import MyAjax from "./../MyAjax.js";
import Toast from "./Toast.js";


export default class Home extends React.Component{
	constructor(props){
		super(props);
		this.state={
			bannerList:[],
			teSellList:[],
			rushBuyList:[],
			proBoxList:[],
			hoteMarketList:[],
			shopsLists:[],
			
		}
	}

	toSearch(){
		hashHistory.push("/search");
	}

	componentWillMount(){
		var that=this;
		var url="http://mce.mogucdn.com/jsonp/multiget/3?pids=51822%2C51827%2C41119%2C51833%2C51836%2C4604";
		MyAjax.fetchJsonp(url,function(res){
			var banner=res.data[51822].list;			
			var teSell=res.data[51827].list;
			var rushBuy=res.data[41119].list[0].list;
			var proBox=res.data[51833].list;
			var hoteMarket=res.data[51836].list;
			
	
			that.setState({
				bannerList:banner,
				teSellList:teSell,
				rushBuyList:rushBuy,
				proBoxList:proBox,
				hoteMarketList:hoteMarket
			})

		},function(err){
			console.log(err);
		})


		var url2="https://list.mogujie.com/search?cKey=h5-shopping&fcid=&pid=9750&searchTag=&sort=pop&page=1&_version=61&_=1501742118083";
		MyAjax.fetchJsonp(url2,function(data){
			console.log(data);
			var shopsList=data.result.wall.docs;			
			
			that.setState({
				shopsLists:shopsList
			})

		},function(err){
			console.log(err)
		})
	}



   toDetail(iid){
   		if(localStorage.getItem("isLogin")=="1"){
   			console.log(iid);
   			
   			hashHistory.push({
				pathname:"/detail",
				query:{
					iid:iid
				}
		     })

   		}else{
   			Toast.makeText("请先登录",2000);
   			$("toast").css("background","red");

   			setTimeout(function(){
   				hashHistory.push("/login");
   			},3000)
   		}
   }


	render(){
		var that=this;
		var data=this.state.bannerList;
		var arr=[];
		for(var i in data){
			arr.push(<div className="swiper-slide" key={i} >
						<img src={data[i].image_800} alt="" title=""/>
					</div>)
		}

		var data2=this.state.teSellList;
		var arr2=[];
		for(var j in data2){
				arr2.push(<div className="teSell01" key={j}>
						<h2>{data2[j].title}</h2>
						<p>{data2[j].description}</p>
						<img src={data2[j].image} alt="" />
					</div>)			
		         }       

		var data3=this.state.rushBuyList;
		var arr3=[];
		for(var k in data3){
			arr3.push(<li key={k}>
			    			<img src={data3[k].img} alt="" />
			    			<h5>{data3[k].title}</h5>
			    			<p>￥{data3[k].salePrice}
			    				<span>￥{data3[k].price}</span>
			    			</p>	    			
			    	   </li>)
		          }

		var data4=this.state.proBoxList;
		var arr4=[];
		for(var f in data4){			
			if(f==0){
				arr4.push(				
					<div className="proBoxList proBox01" key={f}>
				      	<strong> {data4[f].title} </strong>
				     	<p>{data4[f].viceTitle}</p>	
			     	 	<img src={data4[f].image} alt="" />
			     	 </div>	
				)
			}else if(f==1){
				arr4.push(
 					<div className="proBoxList proBox02" key={f}>
			     	 	<div className="text">
				     	    <strong> {data4[f].title} </strong>
				     	 	<p>{data4[f].viceTitle}</p>
				     	 </div>					     	 	
			     	 	<img src={data4[f].image} alt="" />
			     	 </div>			     	 
				)
			}else if(f==2){
				arr4.push(
					<div className="proBoxList proBox03" key={f}>
			     	 	<div className="text">
				     	    <strong> {data4[f].title} </strong>
				     	 	<p>{data4[f].viceTitle}</p>
				     	 </div>					     	 	
			     	 	<img src={data4[f].image} alt="" />
			     	 </div>
				)

			}else{
				arr4.push(	
				<div className="proBoxList proBox04" key={f}>
			      	<strong> {data4[f].title} </strong>
			     	<p>{data4[f].viceTitle}</p>							     						     	 	
		     	 	<img src={data4[f].image} alt="" />
		     	 </div>                                                      
	     	      )
	     	     
				}	
		}

		var data5=this.state.hoteMarketList;
		var arr5=[];
		for(var h in data5){
			arr5.push(
				<dl key={h}>
					<dt><img src={data5[h].image} alt="" /></dt>
					<dd>{data5[h].title}</dd>
				</dl>
			)
		}


		var data6=this.state.shopsLists;
		var arr6=[];
		
		for(var g in data6){
			var arr7=[];
			for(var p in data6[g].props){
				arr7.push(<li key={p}>{data6[g].props[p]}</li>)
			}
			arr6.push(
				<div className="shopsList01" key={g} onClick={this.toDetail.bind(this,data6[g].iid)}>
					<div className="shopImage">
						<img src={data6[g].img} alt="" />
					</div>
					<ul className="shopTit">
						{arr7}				
					</ul>
					<div className="btmTxt">
						<p>￥{data6[g].price}</p>
						<div className="btmImg">
							<span>{data6[g].cfav}</span>
							<img src="./../image/01.png" alt="" />
						</div>
					</div>
				</div>

			)

		}
	
		return (			
			<div className="type">
				<header id="header" className="header" >
					<div className="commonHeader homeHeader">
						<div className="homeImg1">

							<i className="iconfont">&#xe635;</i>
						</div>						
						<div className="headerBox" onClick={this.toSearch.bind(this)}>
							<i className="iconfont">&#xe641;</i>	
							不刺激卸妆水
						</div>
						<div className="homeImg2">
							<i className="iconfont">&#xe600;</i>					

						</div>					
					</div>	
				</header>

				<div id="content" id="homeContent">

					<div className="swiper-container banner" >
						<div className="swiper-wrapper">
							{arr}						
						</div>
						<div className = "swiper-pagination"></div>
					</div>

					<div className="teSell">
						{arr2}
					</div>

					<div className="kongBox1"></div>
					<div className="rushBuyTit">
						<div className="arcitle">
							<i>十二点快抢 · 距结束</i>
							<p>
								<span id="hh">:</span>
								<span id="mm">:</span>
								<span id="ss"></span> 
							</p>
							<img src="https://s10.mogucdn.com/p1/160719/upload_ifrwkntcmi4diolehezdambqhayde_84x20.png"/>				
						</div>
					</div>

					<div className="rushBuy" id="rushBuy">
						<ul className="tabLists">
				    	  {arr3}
		    			</ul>
					</div>

					<div className="kongBox1"></div>

					<div className="promotion">
					      <h2>超实惠-促销直达</h2>
					      <div className="proBox ">
						     {arr4}
						  </div>
					</div>

					<div className="kongBox1"></div>

					<div className="listBox">
						<h6>热门市场</h6>
						<img src="http://s18.mogucdn.com/p1/160415/upload_ifrwkyzymu2damdgg4zdambqhayde_313x10.png" alt="" />
					</div>

					<div className="hoteMarket">
						{arr5}	
					</div>

					<div className="listBox listBox1">
						<h6>猜你喜欢</h6>
						<img src="http://s18.mogucdn.com/p1/160415/upload_ifrwkyzymu2damdgg4zdambqhayde_313x10.png" alt="" />
					</div>

					<div className="shopsList">
						{arr6}
					</div>
						

				</div>
			</div>	
	   )
  }


	componentDidUpdate(){

		var swiper = new Swiper(".swiper-container",{
			pagination:".swiper-pagination",
			autoplay:"3000",
			loop:true,
			autoplayDisableOnInteraction:false
		})


		function countTime() {  
	            //获取当前时间  
	            var date = new Date();  
	            var now = date.getTime();  
	            //设置截止时间  
	            var endDate = new Date("2017-9-1 23:23:23");  
	            var end = endDate.getTime();  
	            //时间差  
	            var leftTime = end-now;
//	            console.log(leftTime)
	            //定义变量 d,h,m,s保存倒计时的时间  
	            var ms,h,m,s;  
	            if (leftTime>=0) {  
//	                d = Math.floor(leftTime/1000/60/60/24);  
	                h = Math.floor(leftTime/1000/60/60%24);
	                m = Math.floor(leftTime/1000/60%60);  
	                s = Math.floor(leftTime/1000%60);
	                ms = Math.floor((leftTime/100)%30);
	            }  
	            if(h<10){
	            	h="0"+h
	            }
	            if(m<10){
	            	m="0"+m
	            }
	            if(s<10){
	            	s="0"+s
	            }
	            if(ms<10){
	            	ms="0"+ms
	            }
//	            console.log(ms,h,m,s)
	            //将倒计时赋值到div中  
	         
	         	$("#hh").html(h)
	         	$("#mm").html(m)
	         	$("#ss").html(s)
	         	
     
	            //递归每秒调用countTime方法，显示动态时间效果  
	            setTimeout(countTime,1);  
	        }


			  countTime()
	}

}
