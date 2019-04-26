import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * ScrollDex is a component that you can wrap other elements or components with to give them
 * properties for tracking the current scroll position of either the window or a single element.
 * Adds two properties to child components:
 * scrollPos {number} The actual scroll value of the element being tracked.
 * lerpScrollPos {number} A value that tries to approach scrollPoss that can be used to create "drag".
 *
 * @property {bool} shouldTrackWindow   (optional) If true (default) the component uses the scrollY value of the
 *                                      window object and if false uses the scrollTop value of the first
 *                                      child under ScrollDex.
 *
 * @property {number} lerpFactor        (optional) The amount of "drag" to apply to the scroll.
 */
class ScrollDex extends Component {

	constructor( props ) {
		super( props );
		this.element = window;

		this.willUnmount = false;
		this.state = { scrollPos : 0, lerpScrollPos : 0 };
	}

	componentDidMount() {

		if ( !this.props.shouldTrackWindow ) {
			this.element = ReactDOM.findDOMNode( this ).firstChild;
		} else {
			this.element = window;
		}

		this.element.addEventListener( 'scroll', this.onScroll );
	}

	componentWillUnmount() {
		this.willUnmount = true;
		this.element.removeEventListener( 'scroll', this.onScroll );
	}

	onScroll = () => {
		if ( !this.willUnmount ) {

			const y = this.element === window ? this.element.pageYOffset : this.element.scrollTop;
			const height = this.element === window ? ( document.body.scrollHeight - this.element.innerHeight ) : this.element.outerHeight;
			const relative = y / height;

			this.setState( {
				scrollRel : relative < 0 ? 0 : relative > 1 ? 1 : relative,
				scrollPos : y
			}, this.requestTick );
		}
	};

	requestTick = () => {
		if ( !this.ticking ) {
			requestAnimationFrame( this.update );
		}
		this.ticking = true;
	};

	update = () => {
		this.ticking = false;

		if ( !this.willUnmount && Math.abs( this.state.lerpScrollPos - this.state.scrollPos ) > 0.1 ) {

			this.setState( {
				lerpScrollPos : lerp(
					this.state.lerpScrollPos,
					this.state.scrollPos,
					this.props.lerpFactor
				)
			}, this.requestTick );
		}
	};

	render() {

		const elements = React.Children.toArray( this.props.children ).map( ( child, index ) => {
			return React.cloneElement( child, {
				key : index,
				scrollRel : this.state.scrollRel,
				scrollPos : this.state.scrollPos,
				lerpScrollPos : this.state.lerpScrollPos
			} );
		} );

		return (
			<div>
				{ elements }
			</div>
		);
	}
}

ScrollDex.propTypes = {
	shouldTrackWindow : PropTypes.bool,
	lerpFactor : PropTypes.number
};

ScrollDex.defaultProps = {
	shouldTrackWindow : true,
	lerpFactor : 0.1
};

export default ScrollDex;

export function lerp( min, max, factor ) {
	return ( max - min ) * factor + min;
}
