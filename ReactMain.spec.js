'use strict';

var React = require('react');
var ReactMain = require('./ReactMain');

describe('ReactMain', function() {
  it('works', function() {
    ReactMain.register('test', function(data, cb) {
      cb(React.createElement('div', null, 'test: ' + data.name));
    });
    ReactMain.renderToString('test', {name: 'hello'}, function(s) {
      expect(s.indexOf('<div ')).toBe(0);
      expect(s.indexOf('test: hello')).toBeGreaterThan(0);
    });
  });
});
