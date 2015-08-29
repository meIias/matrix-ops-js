
'use strict';

var should = require('should');
var matrix = require('./matrix-ops');

describe('matrix-ops', function() {

  var testMatrix = [];
  var testMatrix2 = [];

  beforeEach(function() {
    testMatrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    testMatrix2 = [
      [2, 2, 2],
      [3, 3, 3],
      [4, 4, 4]
    ];
  });

  it('should create a new matrix if nothing is passed in', function() {
    var m = matrix.create();
    m.length.should.equal(3);
    m[0].length.should.equal(3);
  });

  it('should return an identity matrix', function() {
    var im = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ];
    matrix.identity(testMatrix).should.eql(im);
  });

  it('should return a matrix multiplied by a scalar', function() {
    var scalar = 2;
    var resultMatrix = [
      [2, 4, 6],
      [8, 10, 12],
      [14, 16, 18]
    ];
    matrix.scalar(scalar, testMatrix).should.eql(resultMatrix);
  });

  it('should return a matrix divided by a scalar', function() {
    var scalar = .5;
    var resultMatrix = [
      [.5, 1, 1.5],
      [2, 2.5, 3],
      [3.5, 4, 4.5]
    ];
    matrix.scalar(scalar, testMatrix).should.eql(resultMatrix);
  });

  it('should return the trace of a matrix', function() {
    var t = 15;
    matrix.trace(testMatrix).should.eql(t);
  });

  it('should return the transpose of a matrix', function() {
    var transpose = [
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ];
    matrix.transpose(testMatrix).should.eql(transpose);
  });

  it('should return the product of two matrices', function() {
    var product = [
      [20, 20, 20],
      [47, 47, 47],
      [74, 74, 74]
    ];
    matrix.product(testMatrix, testMatrix2).should.eql(product);
  });

  it('should return the dot product of two matrices', function() {
    var v1 = [1, 2, 3];
    var v2 = [4, 5, 6];
    var result = 4 + 10 + 18;
    matrix.dotProduct(v1, v2).should.equal(result);
  });

  xit('should return the rref of a matrix', function() {
    testMatrix = testMatrix.slice(0, 1);
    var result = [
      [1, 0, -1],
      [0, 1, 2]
    ];
    matrix.reducedRowEchelonForm(testMatrix).should.eql(result);
  });
});
