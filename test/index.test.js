'use strict'

var React = require('react/addons'),
    expect = require('chai').expect,
    bem = require('../').bem

var reactComponent = React.createFactory(React.createClass({
    displayName: 'ReactComponent',
    render: function() {
        return React.DOM.div(this.props)
    }
}))

describe('bem', function() {
    it('should accept an object with a className which looks like a React element', function() {
        var elementIn = {
            type: 'div',
            props: { className: 'test' },
            _store: {}
        }
        var elementOut = bem(elementIn)

        expect(elementOut).to.not.equal(elementIn)
        expect(elementOut.props.className).to.equal('test')
    })

    it('should NOT modify a React component', function() {
        var elementIn = reactComponent({ className: 'test' })
        var elementOut = bem(elementIn)

        expect(elementOut).to.equal(elementIn)
    })

    it('should extend prefixed modifiers in className', function() {
        var elementIn = {
            type: 'div',
            props: { className: 'test --test1 --test2' },
            _store: {}
        }
        var elementOut = bem(elementIn)

        expect(elementOut.props.className).to.equal('test test--test1 test--test2')
    })

    it('should move parent element as the block of a child', function() {
        var elementIn = React.DOM.div(
            { className: 'parent --test1' },
            React.DOM.p({ className: 'child --test2'})
        )
        var elementOut = bem(elementIn)

        expect(elementOut.props.className).to.equal('parent parent--test1')

        React.Children.forEach(elementOut.props.children, function(child) {
            expect(child.props.className).to.equal('parent__child parent__child--test2')
        })
    })
})
