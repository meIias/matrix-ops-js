
'use strict';

var should = require('should');
var matrix = require('./matrix-ops');

describe('matrix-ops', function() {
  it('should create a new matrix', function() {
    var m = matrix.create();
    m.length.should.not.equal(null);
  });
});
