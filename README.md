# scrolldex

[![npm package][npm-badge]][npm] [![Build Status](https://semaphoreci.com/api/v1/projects/aedeb783-1832-4989-8581-2efe0a445884/1539163/badge.svg)](https://semaphoreci.com/houseagency/scrolldex) ![downloads](https://img.shields.io/npm/dt/@house-agency/scroll-dex.svg?style=flat-square)

![ScrollDexample](http://scrolldex.surge.sh/demo/assets/images/example.gif)

This is a small React component that can be used as a centralized scroll event hub for your app. 
Simply wrap one or more components and/or elements with this component to give them access to two handy properties that
you can use for all your scroll-position-related needs (parallaxing, section initialization etc.)

## [DEMO](http://scrolldex.surge.sh/)

## Installation

Install with npm

`npm i -D @house-agency/scroll-dex`

or yarn

`yarn add @house-agency/scroll-dex`

## Properties
ScrollDex takes two, optional, properties:

Prop | Type | Description
---- | ---- | -----------
`shouldTrackWindow` | `bool` | (default `true`) If the component should track the `scrollY` property of the window object (if `true`) or the `scrollTop` property of the `firstChild` DOM-node of the component (if `false`).
`lerpFactor` | `number` | (default `0.1`) This is used to interpolate the scroll value to give a damped effect.

## Usage

```es2015
import React from "react";
import ScrollDex from "scroll-dex";

const SomeComponent = ( { scrollPos, lerpScrollPos, scrollRel } ) => (
	<div>The current vertical scroll position is { scrollPos } and the interpolated position is { lerpScrollPos }. The relative scroll position is { scrollRel }.</div>
);

const WrapperComponent = () => (
	<ScrollDex>
		<SomeComponent />
	</ScrollDex>
);
```

[npm-badge]: https://img.shields.io/npm/v/@house-agency/scroll-dex.svg?style=flat-square&colorB=11aaeb
[npm]: https://www.npmjs.org/package/@house-agency/scroll-dex
