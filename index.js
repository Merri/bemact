'use strict'
var React = require('react')

function BemSetup(options) {
    var elementPrefix = options && typeof options.elementPrefix === 'string' ? options.elementPrefix : '__',
        elementPrefixLength = elementPrefix.length,
        modifierPrefix = options && typeof options.modifierPrefix === 'string' ? options.modifierPrefix : '--',
        spaceAndModifierPrefix = ' ' + modifierPrefix

    function bemact(reactElement, block) {
        if (typeof reactElement !== 'object'
            || typeof reactElement.type !== 'string'
            || !(typeof reactElement.props === 'object'
            || typeof reactElement._store === 'object')) {
            return reactElement
        }

        var props = reactElement.props || reactElement._store.props || {}

        if (typeof props.className !== 'string') {
            return reactElement
        }

        var element = props.className.trim()

        if (element.length === 0) {
            return reactElement
        }

        var modifiers = '',
            i = element.indexOf(' ')

        if (i >= 0) {
            modifiers = element.slice(i)
            element = element.slice(0, i)
        }

        i = element.indexOf(modifierPrefix)

        if (i >= 0) {
            modifiers += ' ' + element.slice(i)
            element = element.slice(0, i)
        }

        var blockElement

        if (typeof block === 'string') {
            i = block.lastIndexOf(elementPrefix)

            if (i >= 0) {
                block = block.slice(i + elementPrefixLength)
            }

            blockElement = block + elementPrefix + element
        } else {
            blockElement = element
        }

        if (modifiers.length > 0) {
            var spaceBlockElementAndModifierPrefix = ' ' + blockElement + modifierPrefix

            for (i = modifiers.indexOf(spaceAndModifierPrefix);
                i >= 0;
                i = modifiers.indexOf(spaceAndModifierPrefix, i + blockElement.length)) {
                modifiers = modifiers.replace(spaceAndModifierPrefix, spaceBlockElementAndModifierPrefix)
            }
        }

        var children = React.Children.map(props.children, function(child) {
            return bemact(child, element)
        })

        return React.cloneElement(reactElement, { className: blockElement + modifiers }, children)
    }

    return bemact
}

module.exports = {
    // original BEM methodology syntax had modifiers represented with --
    bem: new BemSetup(),
    // new Yandex syntax uses a single _ for modifiers (this change happened during first half of 2015?)
    bem2015: new BemSetup({
        elementPrefix: '__',
        modifierPrefix: '_'
    }),
    // also expose the setup
    BemSetup: BemSetup
}
