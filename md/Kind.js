
import React from "react";
import "./../scss/kind.scss";
import MyAjax from "./../MyAjax.js";

export default class Kind extends React.Component{
	constructor(props){
		super(props);
		this.state={
			kingNavList:[],
			kinderList:[],
			btmImgList:[],
			btmHeaderList:[],
			num1:[],
			num2:[]

		}
	}

	componentWillMount(){
		var that=this;
		var url="http://mce.mogucdn.com/jsonp/multiget/3?pids=41789%2C4604";
		MyAjax.fetchJsonp(url,function(res){
			
			var kingNav=res.data[41789].list;			
			that.setState({
				kingNavList:kingNav
			})
		},function(err){
			console.log(err);
		})


		var url2="http://mce.mogujie.com/jsonp/makeup/3?pid=41888&_=1501917782417";
		MyAjax.fetchJsonp(url2,function(rel){
			var kinder=rel.data.categoryNavigation.list;

			that.setState({
				kinderList:kinder
			})

		},function(err){
			console.log(err);
		})

		var url3="https://list.mogujie.com/search?cKey=h5-cube&fcid=10062603&page=1&_version=1&pid=&q=&_=1502085466147";
		MyAjax.fetchJsonp(url3,function(rem){			
			var btmImg=rem.result.wall.docs;
			var btmHeader=rem.result.sortFilter;

			that.setState({
				btmImgList:btmImg,
				btmHeaderList:btmHeader
			})

		},function(err){
			console.log(err);
		})
	}

	toNumber(obj1,obj2){
		var that=this;
		that.setState({
			 num1:obj1,
			 num2:obj2
		})
	}
	
	render(){
		var that=this;
		var data=this.state.kingNavList;
		var arr=[];
		for(var i in data){
			arr.push(<li className="NavActive" key={i} onClick={this.toNumber.bind(this,data[i].maitKey,data[i].miniWallkey)} ><span>{data[i].title}</span></li>)
		}

		var data2=this.state.kinderList;
		var arr1=[];
		for(var j in data2){
			arr1.push(<li key={j}>
						<img src={data2[j].image} alt="" />
						<p>{data2[j].title}</p>
					  </li>)
		}


		var data3=this.state.btmImgList;
		var arr3=[];
		for(var k in data3){
			arr3.push(
				 <li key={k} >
				 	  <div className="sellOld">已售{data3[k].sale}件</div>
					  <img className="bigImg" src={data3[k].img} alt="" />
					  <div className="bigImage">
					  		<h5>{data3[k].title}</h5>
					  		<div className="smallImg">
						  		<strong>￥{data3[k].price}</strong>
						  		<div className="smallVlue">
						  			<span>{data3[k].cfav}</span>
						  			<img className="star" src="./../image/06.png"/>
				    			</div>	
					  		</div>	
					  </div>		
		    	 </li>
				)
		}

		var data4=this.state.btmHeaderList;
		var arr4=[];
		for(var b in data4){
			arr4.push(<li key={b}><span>{data4[b].title}</span></li>)
		}

		return(
			<div className="type" id="kingType">
				<header id="header" className="kindHeader">
					<div className="commonHeader">
						<div className="homeImg1">
							<img src="./../image/01.png"/>
						</div>						
						<div className="headerBox">
							<img src="./../image/03.png"/>
							不刺激卸妆水
						</div>
						<div className="homeImg2">
							<img src="./../image/02.png"/>
						</div>					
					</div>	
				</header>
				
				<div id="content" className="kindContent">
					<nav>					
						<ul className="kingNav">
							{arr}
						</ul>
					</nav>
					<div className="section">

						<div className="kinder">
							<ul>
							  {arr1}
							</ul>		
						</div>

						<div className="kindBtm">
							<div className="BtmHeader">
								<ul className="kingNav2">
									{arr4}								
								</ul>
							</div>
							<div className="BtmContents">
							   <ul>
								 {arr3}
					    	   </ul>								
							</div>
						</div>	

					</div>
				</div>			
			</div>
		)
	}

	componentDidUpdate(){

		var that=this;
		var number01=this.state.num1;
		var number02=this.state.num2;
		
		var url5='http://mce.mogujie.com/jsonp/makeup/3?pid='+number01+'&_=1501917782417';
		MyAjax.fetchJsonp(url5,function(tnt){			
			$(".kinder").find("ul").html("");

			var array=tnt.data.categoryNavigation.list;
			
			for(var s in array){
				
				$(".kinder").find("ul").append('<li>'+
						'<img src="'+array[s].image+'" alt="" />'+
						'<p>'+array[s].title+'</p>'+
					    '</li>')
			    }

		},function(err){
			console.log(err);
		})


	var url6='https://list.mogujie.com/search?cKey=h5-cube&fcid='+number02+'&page=1&_version=1&pid=&q=&_=1502085466147';
			MyAjax.fetchJsonp(url6,function(ttp){			
				
				$('.BtmContents').find("ul").html("");
				var tay=ttp.result.wall.docs;
				console.log(tay)
				for(var t in tay){
						$('.BtmContents').find("ul").append('<li style="position:relative;">'+
						 '<div style="position:absolute; left:0; bottom:55px; width:100px; line-height:25px;height:25px;padding-left:15px;font-size:14px;color:#fff;background:url(./../image/07.png);opcity:0.6;" className="sellOld">已售'+tay[t].sale+'件</div>'+
						 '<img style="height:193px;"  className="bigImg" src="'+tay[t].img+'" alt="" />'+
						  '<div className="bigImage">'+
						  		'<h5 style="font-size: 13px;color:#666;font-weight:100; overflow: hidden;white-space:nowrap;text-overflow:ellipsis;">'+tay[t].title+'</h5>'+
						  		'<div className="smallImg" >'+
							  		'<strong style="float:left;	font-size:15px;	color:#FF5577;">￥'+tay[t].price+'</strong>'+
							  		'<div className="smallVlue" style="float:right;">'+
							  			'<span style="font-size:12px; padding-right:5px; color:#666;">'+tay[t].cfav+'</span>'+
							  			'<img style="width:14px;" className="star" src="./../image/06.png"/>'+
					    			'</div>'+	
						  		'</div>'+	
						  '</div>'+		
			    	 '</li>')

					}	

				},function(err){
					console.log(err);
				})




		$(".kingNav").find("li").removeClass("NavActive");
		$(".kingNav").find("li").on("tap",function(){
			var index=$(this).index();
			$(".kingNav").find("li").eq(index).addClass("NavActive").siblings().removeClass("NavActive");


			})
		
	
    }


}
