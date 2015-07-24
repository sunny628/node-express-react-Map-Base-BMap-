var React = require('react');
var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');

var App = React.createClass({
	/*
		初始化单例组件
	*/
	componentDidMount: function() {
		this.geocoder = new BMap.Geocoder();
		this.getUserLocation();
	},
	/*
		定义app应用state
	*/
	getInitialState: function() {
		var favorites = [],
			self = this;
		if (localStorage.favorites) {
			favorites = JSON.parse(localStorage.favorites);
		};
		return {
			favorites: favorites,
			mapCoordinates: {
				lat: '26',
				lng: '119'
			}
		}
	},
	/*
		获取用户当前地理位置(基于html5-navigator.geolocation)
	*/
	getUserLocation:function(){
		var self=this,Blatlng;
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {

				Blatlng=new BMap.Point(position.coords.latitude, position.coords.longitude)
				self.searchForAddress(Blatlng);
			})
		}else{
			Blatlng=new BMap.Point(26, 119);
			self.searchForAddress(Blatlng);
		}
	},
	/*
		位置收藏切换
	*/
	toggleFavorite: function(address) {
		if (this.isAddressInFavorites(address)) {
			this.removeFromFavorites(address);
		} else {
			this.addToFavorites(address);
		}
	},
	/*
		加入收藏
	*/
	addToFavorites: function(address) {
		var favorites = this.state.favorites;
		favorites.push(address);
		this.setState({
			favorites: favorites
		});
		localStorage.favorites = JSON.stringify(favorites);
	},
	/*
		从收藏库中移除
	*/
	removeFromFavorites: function(address) {
		var favorites = this.state.favorites;
		var index = -1;
		favorites.forEach(function(favorite, i) {
			if (favorite === address) {
				index = i;
			}
		});
		if (index !== -1) {
			favorites.splice(index, 1);
		}
		this.setState({
			favorites: favorites
		});
		localStorage.favorites = JSON.stringify(favorites);
	},
	/*
		判断是否是已收藏
	*/
	isAddressInFavorites: function(address) {
		var favorites = this.state.favorites;
		for (var i = 0, len = favorites.length; i < len; i++) {
			if (favorites[i] === address) {
				return true;
			}
		}
		return false;
	},
	/*
		根据地理位置或经纬度进行查询(基于baidu地图)
	*/
	searchForAddress: function(addressOrlatLng,range) {
		var self = this;
		if (typeof(addressOrlatLng)==='object') {
			this.geocoder.getLocation(new BMap.Point(addressOrlatLng.lat,addressOrlatLng.lng),
			function(results){
				var address=results.address;
				self.setState({
					currentAddress:address,
					mapCoordinates:{
						lat:addressOrlatLng.lat,
						lng:addressOrlatLng.lng
					}
				})
			})
		} else {
			this.geocoder.getPoint(addressOrlatLng,
				function(point) {
					if(point){
						self.searchForAddress(new BMap.Point(point.lat,point.lng));
					}
					// if (status !== google.maps.GeocoderStatus.OK) {
					// 	return;
					// }
					// var latlng = results[0].geometry.location;

					// self.setState({
					// 	currentAddress: results[0].formatted_address,
					// 	mapCoordinates: {
					// 		lat: latlng.A,
					// 		lng: latlng.F
					// 	}
					// })
				},range||'中国'
			)
		}
	},
	/*
		渲染整个app应用
	*/
	render: function() {
		return ( 
			< div className = "container app" >
				< h1 className = "text-center text-info" > React_GoogleMap < /h1> 
				< Search onSearch = {this.searchForAddress}/> 
				< Map latlng = {this.state.mapCoordinates}
					onMapClick = {this.searchForAddress}
					currentAddress={this.state.currentAddress}/> 
				< CurrentLocation address = {this.state.currentAddress}
					favorite = {this.isAddressInFavorites(this.state.currentAddress)}
					onFavoriteToggle = {this.toggleFavorite}/> 
				<LocationList locations = {this.state.favorites}
					activeLocationAddress = {this.state.currentAddress}
					onClick = {this.searchForAddress}/> 
			< /div>
		)
	}
})
module.exports = App;