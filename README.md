# Bemact
[![Version](http://img.shields.io/npm/v/bemact.svg)](https://www.npmjs.org/package/bemact)
[![Build Status](https://travis-ci.org/Merri/bemact.svg?branch=master)](https://travis-ci.org/Merri/bemact)

A DRY utility for React that extends React classNames to [BEM style](https://en.bem.info/method/definitions/) with
minimal boilerplate code. Inspired partially by ["Atomic OOBEMITSCSS"](http://www.sitepoint.com/atomic-oobemitscss/).

Bemact does not modify React component classes, only "pure" HTML elements.

## Example

```js
var React = require('React')
var bem = require('bemact').bem

var MyComponent = React.createClass({
    render: function() {
        return bem(
            <div className="parent --customized">
                <h1 className="child-header">Main Header</h1>
                <p className="article --pretty">
                    I'm a pretty article <a className="link" href="">with a link</a>!
                </p>
                <footer>
                    <p className="untouched">I'm untouched because footer has no className.</p>
                </footer>
            </div>
        )
    }
})
```

**Output in HTML:**

```html
<div class="parent parent--customized">
    <h1 class="parent__child-header">Main Header</h1>
    <p class="parent__article parent__article--pretty">
        I'm a pretty article <a class="article__link" href="">with a link</a>!
    </p>
    <footer>
        <p class="untouched">I'm untouched because footer has no className.</p>
    </footer>
</div>
```

## Installation

```
npm install --save bemact
```

## Customization

```js
var BemSetup = require('bemact').BemSetup,
    bem = new BemSetup({ elementPrefix: 'FOO', modifierPrefix: 'bar' })
```

So what would be `block__element--modifier` in original BEM syntax now becomes `blockFOOelementbarmodifier`.
It is recommended you do not use `FOO` as element prefix and `bar` as modifier prefix. Use something sane.

Bemact also exposes the new changed Yandex syntax:

```js
var bem2015 = require('bemact').bem2015
```

The new element prefix is the same as before, but modifier prefix is a single lodash instead: `_`


## Using with JedWatson/classnames

[classNames](https://github.com/JedWatson/classnames) is one of the most popular utilities for working with CSS classes in React. Using BEM style with it can lead into quite a lot of repetition:

```js
var className = 'main-article'
var headerClassName = classNames(
    'main-article__header',
    {
        'main-article__header--is-read': this.props.read,
        'main-article__header--is-popular': this.props.popular
    },
    'main-article__header--' + (this.props.disabled ? 'disabled' : 'enabled')
)

return (
    <article className={className}>
        <header className={headerClassName}>
            ...
        </header>
    </article>
)
```

Adding Bemact for post-processing eases the burden:

```js
var className = 'main-article'
var headerClassName = classNames(
    'header',
    {
        '--is-read': this.props.read,
        '--is-popular': this.props.popular
    },
    this.props.disabled ? '--disabled' : '--enabled'
)

return bem(
    <article className={className}>
        <header className={headerClassName}>
            ...
        </header>
    </article>
)
```

No need to repeat yourself.


## Developing

```
git clone git@github.com:merri/bemact.git
cd bemact
npm install
npm test
```
