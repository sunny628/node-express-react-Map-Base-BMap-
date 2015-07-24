var React=require('react');
//var moment=require('moment')
var LocationItem=React.createClass({
	handleClick:function(){
		this.props.onClick(this.props.address)
	},
	render:function(){
		var itemClassName='list-group-item text-center text-info';
		if(this.props.active){
			itemClassName+=' active';
		}
		var style={"cursor":"pointer"};
		return (
				<a className={itemClassName} onClick={this.handleClick} style={style}>
					{this.props.address}
					<i className="glyphicon glyphicon-menu-right pull-right"></i>
				</a>
			)
	}
});

module.exports=LocationItem;