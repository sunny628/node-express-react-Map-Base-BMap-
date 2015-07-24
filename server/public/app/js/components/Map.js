var React = require('react');

var Map = React.createClass({
	/*
		地图组件初始化,并定义地图点击事件
	*/
	componentDidMount: function() {
		var self = this;
		this.labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
		this.labelIndex = 0;
		this.markers = [];
		if (!this.props.latlng) {
			return;
		}
		//初始化地图组件
		this.map=new BMap.Map('maps');
		this.map.centerAndZoom(this.baiMapPointer(this.props.latlng),15);
		//定义各镇地图组件
		this.map.addControl(new BMap.NavigationControl());  
		this.map.addControl(new BMap.ScaleControl());
		this.map.addControl(new BMap.GeolocationControl());
		this.map.addControl(new BMap.MapTypeControl());
		this.map.addControl(new BMap.OverviewMapControl());
		//点击获取目标经纬度
		this.map.addEventListener('click', function(e) {
			if(e.ctrlKey){
				self.props.onMapClick(self.baiMapPointer(e.point));
			}
		},false);
	},
	/*
		地图组件更新操作(经纬度不变则不更新)
	*/
	componentDidUpdate: function() {
		if (this.lat == this.props.latlng.lat && this.lng == this.props.latlng.lng) {
			return;
		}else{
			this.lat =this.props.latlng.lat;
			this.lng =this.props.latlng.lng;
		}
		var pos =this.baiMapPointer(this.props.latlng);
		this.map.setCenter(pos);
		this.addMarker(pos);
	},
	/*
		根据提供的经纬度在地图上定义标记(新增标记组件,如果markers中存在该标记点则不处理)
	*/
	addMarker: function(latLng) {
		for(var i=0;i<this.markers.length;i++){
			if(this.markers[i].title===this.props.currentAddress){
				return;
			}
		}
		var myIcon = new BMap.Icon("http://api.map.baidu.com/mapCard/img/location.gif",   
		      new BMap.Size(14, 23));

		var self = this,
			marker = new BMap.Marker(latLng,{icon:myIcon});
		var tpl = '<div className="alert alert-info"><h3 className="text-center">' + this.props.currentAddress + '<br/><small className="text-muted">经度：' + latLng.lat + ';维度：' + latLng.lng + '</small></h3></div>'
		var infoWindow = self.baiMapInfoWindow(tpl,{title:this.props.currentAddress});
		function infoAction(e){
			if(e.altKey){
				self.map.removeOverlay(this);
				this.removeEventListener('click',infoAction);
			}else{
				this.openInfoWindow(infoWindow);
			}
		}
		marker.addEventListener('click',infoAction,false);
		this.map.addOverlay(marker);
		this.markers.push(marker);
		console.log(this.markers.length);
	},
	/*
		创建一个百度地图的点
	*/
	baiMapPointer:function(latLng){
		return new BMap.Point(latLng.lat,latLng.lng);
	},
	/*
		创建一个百度地图信息窗口
	*/
	baiMapInfoWindow:function(infoHtml){
		return new BMap.InfoWindow(infoHtml);
	},
	render: function() {
		return ( < div className = "map-google-container"
			id = "maps" >
			< p > loading.... < /p> < /div>
		)
	}
});

module.exports = Map;