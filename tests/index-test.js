import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import ScrollDex from 'src/'

const ELEMENT_HEIGHT = 20000;
const SCROLL_VAL = 100;

describe( 'ScrollDex', () => {
	let node

	beforeEach( () => {
		node = document.createElement( 'div' );
		document.body.appendChild( node );

	} )

	afterEach( () => {
		window.scrollTo( 0, 0 );
		document.body.removeChild( node );
		unmountComponentAtNode( node )
	} )

	it( 'Sends scroll position to children', ( done ) => {
		render( <ScrollDex><ScrollContent /></ScrollDex>, node, () => {

			window.scrollTo( 0, SCROLL_VAL );

			setTimeout( () => {
				
				const props = JSON.parse( node.innerText );

				expect( props.scrollPos ).toEqual( SCROLL_VAL )
				
				done();

			}, 200 );
		} );
	} );


	it( 'Sends lerped scroll position to children', ( done ) => {
		render( <ScrollDex><ScrollContent /></ScrollDex>, node, () => {
			document.body.appendChild( node );
				
			window.scrollTo( 0, SCROLL_VAL );
				
			setTimeout( () => {
					
				const props = JSON.parse( node.innerText );
				
				expect( props.lerpScrollPos ).toBeGreaterThan( 0 )
				expect( props.lerpScrollPos ).toBeLessThan( SCROLL_VAL )
					
				done();
					
			}, 200 );
		} );
	} );


	it( 'Sends relative scroll position to children', ( done ) => {
		render( <ScrollDex><ScrollContent /></ScrollDex>, node, () => {

			window.scrollTo( 0, ELEMENT_HEIGHT );

			setTimeout( () => {
				
				const props = JSON.parse( node.innerText );

				expect( props.scrollRel ).toEqual( 1 )
				
				done();

			}, 200 );
		} );
	} );
} );

const ScrollContent = ( { scrollPos, lerpScrollPos, scrollRel, lerpScrollRel } ) => {
	return (
		<div style={{ width: '200px', height: ELEMENT_HEIGHT + 'px', background: '#000' }}>
			{
				JSON.stringify( {
					scrollRel: scrollRel,
					scrollPos: scrollPos, 
					lerpScrollPos: lerpScrollPos
				} )
			}
		</div>
	);
};
