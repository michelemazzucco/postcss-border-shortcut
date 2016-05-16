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
      'span { border: 1px red; }',
      'span { border: 1px solid red; }',
      {}, done);
  });
  it('add border types to border top property', function (done) {
    test(
      'span { border-top: 1px green; }',
      'span { border-top: 1px solid green; }',
      {}, done);
  });
  it('not change other CSS rules', function (done) {
    test(
      'span { display: inline-block; width: 100%; }',
      'span { display: inline-block; width: 100%; }',
      {}, done);
  });
});
