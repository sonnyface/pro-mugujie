
import React from "react";
import {hashHistory} from "react-router";
import MyAjax from "./../MyAjax.js";
import "./../scss/detail.scss";
import Toast  from "./Toast.js";


export default class Detail extends React.Component{
	constructor(props){
		super(props);
		
		this.state={
			baNnerList:[],
			headerList:[],
			box03:[],
			commentList:[],
			obbList:[],
			shangjiaList:[],
			titList:[],
			addShopList:[],
			iid : this.props.location.query.iid,
			title:[],
			nowPrice:[],
			oldPrice:[],
			image:[],
			userName:[]
		

		}
	}

	componentWillMount(){
		var that=this;
		var url="http://m.mogujie.com/jsonp/detail.api/v1?iid="+this.state.iid+"&template=1-2-detail_normal-1.0.0&appPlat=";
		MyAjax.fetchJsonp(url,function(res){
			var obb=res.data;
			var obj=res.data.topImages;
			var obj02=res.data.itemInfo;
			var obj03=res.data.itemServices;
			var reter=res.data.rateInfo;
			var shangjia=res.data.shopInfo;
			var tit=res.data.detailInfo;
			var addShop=res.data.skuInfo;

			var titler=res.data.itemInfo.title;
			var img=res.data.topImages[0];
			var prices1=res.data.normalPrice.nowPrice;
			var prices2=res.data.normalPrice.oldPrice;
			var user=res.data.shopInfo.name;
	

			console.log(res);
			

			that.setState({
				baNnerList:obj,
				headerList:obj02,
				box03:obj03,
				commentList:reter,
				obbList:obb,
				shangjiaList:shangjia,
				titList:tit,
				addShopList:addShop,
				title:titler,
				nowPrice:prices1,
				oldPrice:prices2,
				image:img,
				userName:user

			})

		},function(err){
			console.log(err)
		})

	}



	toShopCar(){
		$(".CarBox02").css({display:"block"})
    }

    toTuichu(){
    	$(".CarBox02").css({display:"none"})
    }

    toBuying(){
    	$(".CarBox02").css({display:"block"})
    }

    toAddCart(){
    	var that=this;
    	var iid=this.state.iid;
    	var title=this.state.title;
    	var nowPrice=this.state.nowPrice;
    	var oldPrice=this.state.oldPrice;
    	var image=this.state.image;
    	var userName=this.state.userName;

		
		       if(localStorage.getItem("isLogin") == "1"){

					Toast.makeText("加入购物车成功",2000);
					$("#toast").css({"background":"#FF498B","z-index":500});

					var goodsID=this.state.iid;
					console.log(localStorage.getItem("goods"))
					var first=localStorage.getItem("goods")== null?true:false;  //判断是否添加
					var isSameShop =false; //判断已经添加

					localStorage.setItem("isAddShop","1");

					//是否为第一次添加					

					if(first){
						console.log(goodsID,title,nowPrice,oldPrice,image);
						
						localStorage.setItem('goods','[{"shopsID":"'+iid+'","title":"'+title+'","userName":"'+userName+'","nowPrice":"'+nowPrice+'","oldPrice":"'+oldPrice+'","num":"1","image":"'+image+'"}]');
						localStorage.setItem("first","false")
					}else{
						var str=localStorage.getItem("goods");
						console.log(str);
						var arr=eval(str); 
						//相当于JSON.parse 或者JSON.stringify
						//var arr=JSON.parse(str);
						//遍历所有的对象，如果商品相同，让商品自增。
						for(var y in arr){
							console.log(arr[y])
							if(arr[y].shopsID==iid){
								arr[y].num=Number(arr[y].num)+1; // 让数据num+
								console.log(arr[y].num)
								var number=JSON.stringify(arr);
								localStorage.setItem("goods",number);
								isSameShop=true;
							}else{
								var str=localStorage.getItem("goods");
								console.log(str);
								var arr=eval(str);

								for(var y in arr){
									console.log(arr[y])
									if(arr[y].shopsID==iid){
									arr[y].num=arr[y].num+1; // 让数据num+
									console.log(arr[y].num)
									var number=JSON.stringify(arr);
									localStorage.setItem("goods",number);
									isSameShop=true;
									
								}
							}

								if(!isSameShop){
									var obj={shopsID:goodsID,num:1,title:title,nowPrice:nowPrice,oldPrice:oldPrice,image:image};
									arr.push(obj);
									var number=JSON.stringify(arr);
									localStorage.setItem("goods",number);
									console.log(arr);
								}

							}
				      }
				  }
				
				}else{
					Toast.makeText("请先登录",2000);
					$("#toast").css({"background":"#FF498B","z-index":500});

					setTimeout(function(){
						hashHistory.push("/login");
					},3000)
				   
				}
				
		    }


	render(){
		var that=this;
		var res=this.state.obbList;
		var data=this.state.baNnerList;
		var arr=[];
		for(var i in data){			
			arr.push(<div className="swiper-slide" key={i}>
						<img src={data[i]} alt="" title=""/>
					</div>)
		}

		var data02=this.state.headerList;
		
		var arr02=[];
		arr02.push(
			<div className="datealBox" key={0}>
			 	  <h2>{data02.title}</h2>
				  <div className="det01">
				  	<p> 
					  	<span>￥</span>
						<b>{data02.lowNowPrice}</b>
					</p>
					<p> 
					  	<span>￥{data02.lowPrice}</span>
						<i>7折</i>
					</p>							 
				  </div>
		 	</div>
		)


		var data03=this.state.box03;
		var arr03=[];
		for(var k in data03.services){
			if(k<3){
				arr03.push(
				<li key={k}>		
					<img src={data03.services[k].icon} alt="" />
					<span>{data03.services[k].name}</span>
				</li>
			)

			}
		}
			

		var data04=this.state.commentList;
		var arr04=[];
		for(var u in data04.rateTags){
			arr04.push(
					<li key={u}>{data04.rateTags[u].value} ({data04.rateTags[u].num}) </li>
					)
		   }

		 var arr05=[];
		 arr05.push(
		 		<span key={1}>买家评论{data04.cRate}  | 销量{data04.sales}</span>

		  )

		  var arr06=[];
		  var arr07=[];
		  for(var y in data04.list){
		  			  	
		  	for(var o in data04.list[y].extraInfo){
		  		arr07.push(
		  		       <span key={o}>{data04.list[y].extraInfo[o]}</span>
		  		)
		  	}

		  	arr06.push(
					<li key={y}>
						<div className="main01">
							<img src={data04.list[y].user.avatar} alt="" />
							<span>{data04.list[y].user.uname}</span>
						</div>
						<div className="main02">
							{data04.list[y].content}
						</div>
						<div className="main03">
							<p>{data04.list[y].created}</p>
							<div className="anyStyle">
								{arr07}
							</div>
						</div>
						<div className="main04">
							<img src={data04.list[y].images} alt="" />
						</div>
					</li>
		  	)

		  }

		  var data08=this.state.shangjiaList;
		  var arr08=[];
		  var arr09=[];
		  var arr10=[];
		  var arr11=[];
		  for(var p in data08.score){
		  	arr09.push(
		  		<p key={p}>
			  		{data08.score[p].name}
			  		<i>
			  			{data08.score[p].score}
			  		</i>
		  		</p>
		  	)

		  }

		  arr08.push(
		  <ul key={2}>
		 	 <li>
				<h3>{data08.cSells}</h3>
				<p>总销售量</p>

			</li>
			<li>
				<h3>{data08.cFans}</h3>
				<p>收藏数量</p>

			</li>
			<li>
				{arr09}
			</li>
		  </ul>	
    )

    
    for(var m=0;m<data08.level;m++){
		arr11.push(
		    <a key={m}> 
		    	<i className="iconfont">&#xe70e;</i>
		    </a>			
		)

    }
    
    arr10.push(
			<div className="header" key={3}>
				<img src={data08.shopLogo}ng alt="" />
				<div className="star">
					<span>{data08.name}</span>
					<p>{arr11}</p>
				</div>
				<b> 进店 > </b>
			</div>
     )

    var data09=this.state.titList;
    
    var arr12=[];
    arr12.push(
    	<span key={4}>{data09.desc}</span>
    )

    var arr13=[];
    for(var q in data09.detailImage){
    	
    	if(q==0){
    		arr13.push(
    			<span key={q}>{data09.detailImage[q].key}</span>
    		)

    		var arr15=[];
			var BigImg=data09.detailImage[q].list;
			
			for(var d in BigImg){
				arr15.push(
					<div className="ImgKey" key={d}>
						<img src={BigImg[d]}/>
					</div>
				)
			}
    	}
    }

   

		return(
			<div className="type">

				<div className="swiper-container banner02" >
						<div className="swiper-wrapper">
							{arr}						
						</div>
				</div>

				<div className="DetailContent">
					<div className="DeteailHeader">
					 	{arr02}
						  						  
					</div>

					<div className="youfei">
						<p>免邮费</p>
						<ul className="baoyou">
							{arr03}
							<i className="iconfont">&#xe601;</i>
						</ul>
					</div>

					<div className="kongBox"></div>
					<div className="colorSize">
						<p>请选择：颜色尺码</p>
						<i className="iconfont">&#xe601;</i>
					</div>
					<div className="kongBox"></div>

					<div className="colorSize">
						<p>{arr05}</p>
						<i className="iconfont">&#xe601;</i>
					</div>

					<div className="comment">
						<ul>
						 	{arr04}						 	
						</ul>
					</div>	

					<div className="comment01">
						<ul>							
							{arr06}
						</ul>
					</div>
					<div className="kongBox"></div>

					<div className="shangjia">
						<header>
							{arr10}							
						</header>
						<div className="shopInfo">
							{arr08}
						</div>
					</div>
					<div className="kongBox"></div>

					<div className="feiLei">
						<ul>
						 	<li className="active">图文详情</li>
						 	<li>产品参数</li>
						 	<li>热卖推荐</li>
						</ul>
					</div>
					<div className="titDetail">
						<div className="tit11">
							<div className="img01">
								<img  src="./../image/09.jpg" />
							</div>							
							<p>{arr12}</p>
							<div className="img02">
								<img  src="./../image/08.jpg" />
							</div>
							<div className="Effect">
								{arr13}
							</div>							
						</div>

						<div className="BigImger">
							{arr15}
					    </div>
					</div>
				</div>

				<div className="detailFooter">
					
						<div className="kefu">
							<dl>
								<img src="./../image/01.png"/>
								<dd>客服</dd>
							</dl>
							<dl>
								<img src="./../image/06.png"/>
								<dd>收藏</dd>
							</dl>
							<dl>
								<img src="./../image/10.jpg"/>
								<dd>小店</dd>
							</dl>
							
						</div>
						<div className="JoinCar">
							<div className="JoinCar01" 	onClick={this.toShopCar.bind(this)}>加入购物车</div>
							<div className="JoinCar02" onClick={this.toBuying.bind(this)}>立即购买</div>
						</div>

				</div>

				<div className="CarBox02">
					<div className="CarBoxDetail">
						<div className="CarBoxHeader">
							<div className="CarBoxImg">
								<img src="http://s3.mogucdn.com/mlcdn/c45406/170519_631e7790f62gj2db6dlf3611a7jai_640x960.jpg_128x999.webp"/>
							</div>
							

							<div className="CarBoxTxt">
								<p>￥<span>81</span></p>
								<p>库存<span>81</span>件</p>
								<p>请选择：颜色尺码</p>
							</div>

							<div className="tuiChu" onClick={this.toTuichu.bind(this)}>
								<i className="iconfont">&#xe78b;</i>
							</div>
						</div>
						
						<div className="CarBoxContent">	</div>

						<div className="CarBoxBottom" onClick={this.toAddCart.bind(this)}>确定</div>
					</div>
				</div>

			</div>
			)
	}

	



		componentDidUpdate(){

			var swiper = new Swiper(".swiper-container",{
				autoplay:"",
				loop:false,
				autoplayDisableOnInteraction:false
		})

   }


}



			