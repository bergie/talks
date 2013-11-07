GSS runtime [![Build Status](https://travis-ci.org/the-gss/gss.png?branch=master)](https://travis-ci.org/the-gss/gss)
===========

**WARNING: GSS is highly unstable right now, there be dragons...**

[![Cross-browser testing status](https://saucelabs.com/browser-matrix/gss-core.svg)](https://saucelabs.com/u/gss-core)

Compiles and runs Grid Style Sheet (GSS) rules. GSS is an implementation of Badros & Borning's [Constraint Cascading Style Sheets](http://www.cs.washington.edu/research/constraints/web/ccss-uwtr.pdf), enabling far better layout control through building relational rules between different elements.

GSS supports the following syntaxes for defining layout rules:

* [CCSS](https://github.com/the-gss/ccss-compiler#readme) - direct constraints related to position and size of DOM elements
* [VFL](https://github.com/the-gss/vfl-compiler#readme) - horizontal and vertical spacing constraints based on [Apple's Visual Format Language](http://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/AutolayoutPG/Articles/formatLanguage.html)

Additionally, support for [GTL](https://github.com/the-gss/gtl-compiler#readme), based on the [W3C Grid Template Language](http://dev.w3.org/csswg/css-template/) is planned.

The main GSS repository provides a [Component](http://component.io/) library handling both the compilation and application of the layout constraints.

## Installation

You need to include the [GSS runtime library](https://raw.github.com/the-gss/gss/gh-pages/browser/gss.js) to the pages where you want to utilize GSS rules:
```html
<script src="gss.js"></script>
```

Additionally you need to make the [GSS constraint solver Web Worker](https://raw.github.com/the-gss/gss/gh-pages/browser/gss-solver.min.js) available on the same server.

### Installation via Component

If you're using Component for managing your project dependencies you can also include the project into your build dependencies, in which case it doesn't need to be included to the pages separately.

```json
{
  "dependencies": {
    "the-gss/gss": "*"
  }
}
```

## Usage via HTML

The easiest way to run GSS is to include the JavaScript file into your pages, and then simply write some rules inside a `style` tag:

```html
<style type="text/gss">
  /* Ensure nodes are square and of touchable size */
  [node-width] == 58;
  the-graph-process[width] == the-graph-process[height];
  the-graph-process[width] == [node-width];

  /* Center process label */
  .the-graph-process-label[left] == [node-width]/2 - .the-graph-process-label[intrinsic-width]/2;
</style>
```

The GSS runtime will find all these style tags and apply the constraints from them.

## Usage via JavaScript

First load the GSS runtime CommonJS module:

```javascript
var GSS = require('gss');
```

To utilize the GSS runtime you need to instantiate it. Each instance of GSS needs to know the URL where the [Web Worker file](https://raw.github.com/the-gss/gss/gh-pages/browser/gss-solver.min.js) is available.

```javascript
var engine = new GSS('/some/path/to/gss-solver.min.js');
```

Optionally you can limit the GSS engine to some particular are of your DOM by giving it a containing element. In that case the rules will only apply to elements inside the given container:

```javascript
var container = document.querySelect('.container');
var engine = new GSS('/some/path/to/gss-solver.min.js', container);
```

Once you have the GSS runtime instantiated, you can solve rules by sending them to the instance:

```javascript
engine.run('@horizontal [#box1]-[#box2]-[#box3]-[#box4]-[#box5]-[#box6];');
```

You can provide as many GSS rules as you need in the string. You can also call the `run` method multiple times to register new rules.

The GSS runtime will invoke the [GSS engine](https://github.com/the-gss/engine), which measures the DOM elements specified in the rules, and solves their optimal sizes and places using the Cassowary constraint solver. The GSS engine will then update the CSS rules on the page accordingly.
