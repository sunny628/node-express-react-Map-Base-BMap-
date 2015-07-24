var React=require('react');
var LocationItem=require('./LocationItem');

var Item=React.createClass({
	render:function(){
		var itemClassName='list-group-item text-center text-muted';
		return (
			<a className={itemClassName}>您还未收藏任何地址，请点击星号进行收藏.</a>
			)
	}
})

var LocationList=React.createClass({
	render:function(){
		var self=this;
		var currentAddress=this.props.activeLocationAddress;
		var locations=this.props.locations.map(function(location,index){
			var active=currentAddress==location.address;
			return <LocationItem address={location}
			timestamp={location.timestamp}
			active={active}
			onClick={self.props.onClick}/>
		});
		if(!locations.length){
			locations.push(<Item/>)
		};
		return (
			<div className="map-lacation-list">
				<div className="list-group">
				<span className='list-group-item active'>收藏的地址</span>
				{locations}
				</div>
			</div>
			)
	}
});

module.exports=LocationList;