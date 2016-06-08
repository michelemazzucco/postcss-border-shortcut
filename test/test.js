/* eslint-env node, mocha */

var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
  postcss([ plugin(opts) ]).process(input).then(function (result) {
    expect(result.css).to.eql(output);
    expect(result.warnings()).to.be.empty;
    done();
  }).catch(function (error) {
    done(error);
  });
};

describe('postcss-border-shortcut', function () {
  it('add border types to border property', function (done) {
    test(
      'div { border: 1px red; }',
      'div { border: 1px solid red; }',
      {}, done);
  });
  it('add border types to border top property', function (done) {
    test(
      '.class { border-top: 1px green; }',
      '.class { border-top: 1px solid green; }',
      {}, done);
  });
  it('works with only color property', function (done) {
    test(
      'div { border: green; border-bottom: #423424; }',
      'div { border: 1px solid green; border-bottom: 1px solid #423424; }',
      {}, done);
  });
  it('not edit decl of other types of border property', function (done) {
    test(
      '.class { border-style: solid; border-spacing: 1%; }',
      '.class { border-style: solid; border-spacing: 1%; }',
      {}, done);
  });
  it('not change complete border declaration' +
      'and with only size expressed', function (done) {
    test(
      'div { border-bottom: red dashed 10px; border: 42em; }',
      'div { border-bottom: red dashed 10px; border: 42em; }',
      {}, done);
  });
  it('not change other CSS rules or border with value of 0', function (done) {
    test(
      'div { display: flex; width: 100%; border-radius: 5px; border: 0; }',
      'div { display: flex; width: 100%; border-radius: 5px; border: 0; }',
      {}, done);
  });
});
