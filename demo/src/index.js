import React, { Component } from 'react';
import { render } from 'react-dom';

import ScrollDex from '../../src/index';
import AlertImage from '../assets/images/alert.png';

import Cactus from '../assets/images/cacterpillar.gif';
import './index.css';

class Demo extends Component {
	constructor( props ) {
		super( props );

		this._images = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ].map( ( item, i ) => {

			return {
				top : Math.random() * 1500,
				left : Math.random() * 520,
				depth : Math.random(),
				src : Cactus
			};
		} );
	}

	get docHeight() {
		const oh = document && document.body.offsetHeight;
		return oh ? oh : 3000;
	}

	render() {
		return (
			<div className="demo-container">
				<ScrollDex>
					<Scrollificated docHeight={ this.docHeight } images={ this._images } />
				</ScrollDex>
			</div>
		);
	}
}

const Scrollificated = ( { scrollPos, lerpScrollPos, scrollRel, images, docHeight } ) => (
	<div>
		<h1>scrolldex Demo</h1>

		<div className="output">
			<pre>Vertical scroll position: { scrollPos }</pre>
			<hr />
			<pre>Interpolated position: { Math.round( lerpScrollPos ) }</pre>
			<hr />
			<pre>Relative position: { scrollRel }</pre>
		</div>

		<div className={ `alerter ${ scrollPos % 1000 >= 500 && 'visible' }` }>
			<img src={ AlertImage } alt="ALERT" />
		</div>

		<div className="demo-content">
			<div className="demo-background" style={ { opacity : lerpScrollPos / docHeight } }></div>
			{ images.map( ( item, i ) => (
				<img
					className="floating-image"
					style={ {
						top : 800 + ( item.top - ( item.depth * lerpScrollPos ) ),
						left : item.left,
						zIndex : Math.round( item.depth * 1024 ),
						transform : 'scale(' + item.depth + ') translate(-50%, -50%)'
					} }
					src={ item.src }
					key={ i }
					alt="FLOATIE" />
			) ) }
		</div>
	</div>
);

render( <Demo />, document.querySelector( '#demo' ) );
