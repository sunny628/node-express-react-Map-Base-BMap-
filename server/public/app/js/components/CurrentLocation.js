var React=require('react');

var CurrentLocation=React.createClass({
	toggleFavorite:function(){
		this.props.onFavoriteToggle(this.props.address);
	},
	render:function(){
		var starClassName='glyphicon glyphicon-star-empty';
			if(this.props.favorite){
				var starClassName='glyphicon glyphicon-star';
			}
		return (
				<div className="map-current-site alert alert-success">
					<h4 className="text-center">
						{this.props.address} <i className={starClassName} onClick={this.toggleFavorite}></i>
					</h4>
				</div>
			)
	}
});

module.exports=CurrentLocation;