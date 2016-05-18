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
      'div { border-top: 1px green; }',
      'div { border-top: 1px solid green; }',
      {}, done);
  });
  it('not edit decl of other types of border property', function (done) {
    test(
      'div { border-style: solid; border-color: green; border-width: 2px; }',
      'div { border-style: solid; border-color: green; border-width: 2px; }',
      {}, done);
  });
  it('not change other CSS rules', function (done) {
    test(
      'div { display: inline-block; width: 100%; }',
      'div { display: inline-block; width: 100%; }',
      {}, done);
  });
});
