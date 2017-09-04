

import React from "react";
import "./../scss/shopping.scss";
import MyAjax from "./../MyAjax.js";
import {hashHistory} from "react-router";


export default class Shopping extends React.Component{

	constructor(props){
		super(props)

		this.state={
			shopList:[],
			shopName:this.props.location.query.input,
			iconList:[],
			sellNumer:[]
		}
		
	}

	componentWillMount(){
		var that=this;
		var url="http://list.mogujie.com/search?_version=61&ratio=3%3A4&q="+this.state.shopName+"&cKey=46&minPrice=&_mgjuuid=4f1180b0-f56d-4b55-aca5-2d4701edf832&ppath=&page=1&maxPrice=&sort=pop&userId=17zgck6&cpc_offset=&priceList=&_=1502519750399";
		MyAjax.fetchJsonp(url,function(data){
			console.log(data)
			var shop=data.result.wall.docs;	
			var icon=data.result.sortFilter;


			that.setState({
				shopList:shop,
				iconList:icon
			})	


		},function(err){
			console.log(err)
		})

	}

	toDetail(iid){		
		
		hashHistory.push({
			pathname:"/detail",
			query:{
				iid:iid
			}
		})
	}

	toBack(){
		window.history.go(-1);
	}

	toSearch(){
		hashHistory.push("/search")
	}

	paiXu(){
		var data6=this.state.shopList;
		console.log(data6);


	}

	render(){
		var that=this;
		var data6=this.state.shopList;
		var data8=this.state.iconList;
		var arr6=[];
		var arr8=[];

		for(var i in data8){
			arr8.push(<div key={i} onClick={this.paiXu.bind(this)} className="popShops"><span>{data8[i].title}</span></div>)
		}

		
		
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

		return(
			
				<div className="shopingType">
					<header id="header" >
						<div className="commonHeader" onClick={this.toBack.bind(this)}>
							<div className="homeImg1">
								<i className="iconfont">&#xe615;</i>
							</div>						
							<div className="headerBox" id="headerBox" onClick={this.toSearch.bind(this)}>
								<img src="./../image/03.png"/>
								<span>{this.state.shopName}</span>
							</div>
							<div className="homeImg2">
								<img src="./../image/02.png"/>
							</div>					
						</div>	
					</header>
					<div className="content shoppingContent" >
						<div className="arrany">
							<ul>
								<li>{arr8}</li>								
								<li><strong>价格<i className="iconfont">&#xe606;</i></strong></li>
							</ul>
						</div>
						<div className="shopsList">
							{arr6}
						</div>

					</div>
				</div>	
			
		 )
	}

}

