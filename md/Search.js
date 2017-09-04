
import React from "react";
import "./../scss/search.scss";
import MyAjax from "./../MyAjax.js";
import {hashHistory} from "react-router";

export default class Search extends React.Component{

	constructor(props){
		super(props)
		this.state={
			serList:[],
			headerList:[],
			
		}		
	}

	componentWillMount(){
		var that=this;		
		var url="http://list.mogujie.com/module/mget?code=sketch%2ChotWord";
		MyAjax.fetchJsonp(url,function(res){

			var resObj=res.data.hotWord.data;
			var headerTit=res.data.sketch.data.frontword;
			
			that.setState({
				serList:resObj,
				headerList:headerTit,
				

			})

		},function(err){
			console.log(err)
		})
	}

	toHome(){
		window.history.go(-1);
	}

	toShopping(){

		var searchIpt=this.refs.searchIpt.value;
		var data01=this.state.headerList;
		console.log(searchIpt)
		
		if(searchIpt==""){
				hashHistory.push({
				pathname:"/shopping",
				query:{
					input:data01
				}
			})

		}else{

			hashHistory.push({
				pathname:"/shopping",
				query:{
					input:searchIpt
				}
			})

		}

		
			

	}

	render(){
		var that=this;
		var data=this.state.serList;
		var data01=this.state.headerList;
		var arr=[];
		var arr1=[];

		arr1.push(<input type="text" key={1}  ref="searchIpt" placeholder={data01}/>)


		for(var i in data){				
				var len=data[i].color.length;

				if(len=="0"){
					arr.push(<li key={i}>{data[i].frontword}</li>)
				}else{
					arr.push(<li key={i} className="searchLists">{data[i].frontword}</li>)
				}
				
		}
		
		return(
			<div id="container">
				<div className="type">
					<header id="header" >
						<div className="commonHeader">
							<div className="homeImg1" onClick={this.toHome.bind(this)}>
								<i className="iconfont">&#xe615;</i>
							</div>						
							<div className="headerBox" id="headerBox">
								{arr1}
							</div>
							<div className="homeImg2" onClick={this.toShopping.bind(this)}>
								搜索
							</div>					
						</div>	
					</header>
					<div className="content searchContent" >
					
						<div className="sosuo">
							<p>
								<img src="./../image/03.png"/>
								<span>历史搜索</span>
							</p>
							<p>
								<img src="./../image/04.png"/>
							</p>
						</div>

						<div className="jilu">
							<p>暂无搜索记录</p>
						</div>

						<div className="hotSearch">
							<img src="./../image/05.png"/>
							<span>热门搜索</span>
						</div>
						<div className="searchList">
							<ul>
								{arr}
							</ul>
						</div>

					</div>
				</div>	
			</div>
		 )
	}

	componentDidUpdate(){
		

	}
	
	
}



