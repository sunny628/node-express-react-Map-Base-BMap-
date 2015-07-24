var React=require('react');

var Search=React.createClass({
	getInitialState:function(){
		return {value:''}
	},
	componentDidMount:function(){
		var self=this;
		document.body.addEventListener('keydown',function(e){
			if(e.keyCode===13&&e.target.tagName==='INPUT'){
				self.handleSubmit(e);
			}
		},false);
	},
	handleChange:function(e){
		this.setState({
			value:e.target.value
		});
	},
	handleSubmit:function(e){
		e.preventDefault();
		var _input=this.refs.searchFor.getDOMNode(),
			_select=this.refs.areaRange.getDOMNode();
		if(!_input.value){
			return;
		}
		this.props.onSearch(_input.value,_select.value);
		_input.blur();
	},
	render:function(){
		var selectStyle={  'border-radius': '3px'}
		return (
				<div className="form-horizontal map-search-form alert">
					<div className="form-group">
						<div className="input-group">
							<div className="input-group-addon">
							<select ref="areaRange" style={selectStyle} onChange={this.handleSubmit}>
								<option value="中国">中国</option>
								<option value="福建省">福建省</option>
								<option value="福建省福州">福州</option>
								<option value="福建省福州福州" selected>闽侯县</option>
							</select>
							</div>
							<input ref="searchFor" value={this.state.value} onChange={this.handleChange} type="text" className="form-control" name="mapSite" placeholder="请输入要查询的地点....." />
							<div className="input-group-addon" onClick={this.handleSubmit}> <i className="glyphicon glyphicon-search"></i>
							</div>
						</div>
					</div>
				</div>
			)
	}
})
module.exports=Search;