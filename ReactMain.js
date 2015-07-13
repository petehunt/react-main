'use strict';

var React = require('react');

var invariant = require('react/lib/invariant');

var registry = {};

function getElement(entrypointName, data, cb) {
  invariant(
    registry.hasOwnProperty(entrypointName),
    'Entrypoint not registered: %s',
    entrypointName
  );

  var calledBack = false;

  return registry[entrypointName](data, function(element) {
    invariant(React.isValidElement(element), 'Callback must return a valid ReactElement');
    invariant(!calledBack, 'You can only call the callback once.');
    calledBack = true;
    cb(element);
  });
}

var ReactMain = {
  register: function(entrypointName, factory) {
    invariant(
      !registry.hasOwnProperty(entrypointName),
      'Entrypoint already registered: %s',
      entrypointName
    );
    registry[entrypointName] = factory;
  },

  renderToString: function(entrypointName, data, cb) {
    getElement(entrypointName, data, function(element) {
      cb(React.renderToString(element));
    });
  },

  render: function(entrypointName, data, domNode) {
    getElement(entrypointName, data, function(element) {
      React.render(element, domNode);
    });
  },
};

global.ReactMain = global.ReactMain || ReactMain;

module.exports = global.ReactMain;
