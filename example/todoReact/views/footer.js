import React from 'react';
export default class Footer extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return(
			<div className='app-footer'>@imChenJian Created by Fluder
				<p>right-bottom-line to clear one</p>
				<p>right-bottom to clear all</p>
			</div>
		)
	}
}