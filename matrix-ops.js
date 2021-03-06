/**
 * @description -- matrix-ops.js : a javascript matrix operation library
 * @version 0.3.0
 ***** github.com/meiias  *****
 */

'use strict';

var mtrx = {};

/**
 * @description create -- builds a matrix out of the passed in values, or default values
 * @param  {array} input -- takes in an array of arrays from the user, if null then provide a random 3x3 matrix by default
 * @return {array}       returns the matrix
 */
mtrx.create = function (input) {

  var matrix = input;

  if (!input) {

    matrix = _buildMatrix(3);

    _assignValuesToMatrix(matrix, 3, 3);
  }

  return matrix;
};

/**
 * @description identity -- returns the identity matrix of the passed in matrix
 * @param  {array} m -- the matrix passed in
 * @return {array}   return the identity matrix of the passed in matrix
 */
mtrx.identity = function(matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows,
  cols;

  if (_isSquareMatrix(m)) {

    rows = cols = _getNumRows(m);

    for (i; i < rows; i++) {

      for (j; j < cols; j++) {

        if (i === j) {

          m[i][j] = 1;
        }
        else {

          m[i][j] = 0;
        }
      }

      j = 0;
    }

    return m;
  }
};

/**
 * @description Scalar -- multiply each value in the matrix by a number
 * @param  {int,float} s -- the number to multiply each matrix element by
 * @param  {array} m -- the matrix passed in
 * @return {array}   returns the matrix scaled by the value s
 */
mtrx.scalar = function(s, matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  for (i; i < rows; i++) {

    for (j; j < cols; j++) {

      m[i][j] *= s;
    }

    j = 0;
  }

  return m;
};

/**
 * @description inverse -- WIP
 * @param  {array} m -- the matrix
 * @return {array}   returns the inverse of the passed in matrix
 */
mtrx.inverse = function(matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  var inverseMtx = [];

  var i = 0, j = 0;

  var factor = 0, coefficient = 0;

  var rows = _getNumRows(m);

  inverseMtx = JSON.parse(JSON.stringify(m));

  inverseMtx = this.identity(inverseMtx);

  for (i; i < rows; i++) {

    factor = m[i][i];

    m[i] /= factor;

    inverseMtx[i] /= factor;

    for (j; j < rows; j++) {

      if (i ===j) continue;

      coefficient = m[j][i];

      m[j] -= coefficient * m[i];

      inverseMtx[j] -= coefficient * inverseMtx[i];
    }
  }

  return inverseMtx;
};

/**
 * @description trace -- sum the matrix's diagonal
 * @param  {array} m -- matrix (array of arrays)
 * @return {int}   returns the sum of the diagonal of the matrix
 */
mtrx.trace = function(matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  var i = 0, j = 0, tr = 0;

  var rows, cols;

  if (_isSquareMatrix(m)) {

    rows = _getNumRows(m);

    cols = _getNumCols(m);

    for (i; i < rows; i++) {

      for (j; j < cols; j++) {

        if (i === j) {

          tr += m[i][j];
        }
      }

      j = 0;
    }

    return tr;
  }
};

/**
 * @description transpose matrix -- swap rows & cols
 * @param  {array} m -- passed in array(matrix)
 * @return {array}   returns the matrix with columns and rows switched. mxn -> nxm
 */
mtrx.transpose = function(m) {

  var matrix = [];

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  matrix = _createMatrix(cols, rows);

  for (i; i < cols; i++) {

    matrix[i] = _getVector(m, i, 'col');
  }

  return matrix;
};

/**
 * @description matrix product -- multiply 2 matrices together
 * @param  {array} m1 -- the first of two matrices to multiply together
 * @param  {array} m2 -- the second matrix
 * @return {array}    returns the new product of matrix 1 and 2
 */
mtrx.product = function(m1, m2) {

  var i = 0, j = 0;

  var newMatrix = [];

  var rowDot = [], colDot = [];

  var rows1 = _getNumRows(m1);

  var cols1 = _getNumCols(m1);

  var rows2 = _getNumRows(m2);

  var cols2 = _getNumCols(m2);

  // mxn * nxr === mxr
  // columns of the first matrix and rows of the second matrix should be equal to get a matrix product
  if (cols1 === rows2) {

    newMatrix = _createMatrix(rows1, cols2);
  }
  else { return; }

  for (i; i < rows1; i++) {

    for (j; j < cols2; j++) {

      rowDot = this.rowVector(m1, i);

      colDot = this.columnVector(m2, j);

      newMatrix[i][j] = this.dotProduct(rowDot, colDot);
    }

    j = 0;
  }

  return newMatrix;
};

/**
 * @description dotProduct -- multiplies 2 vectors together, not matrices(see product method)
 * @param  {array} row -- single array of row values
 * @param  {array} col -- single array of col values
 * @return {int,float}     returns the multiplied row and column values
 */
mtrx.dotProduct = function(row, col) {

  var i = 0;

  var dot = 0;

  if (row.length === col.length) {

    for (i; i < row.length; i++) {

      dot += (row[i] * col[i]);
    }
  }

  return dot;
};

/*
 * buggy, don't use
 * @description reducedRowEchelonForm -- returns the solutions to a system by a passed in augmented matrix
 * @param  {array} m -- the augmented matrix to be reduced
 * @return {array}   returns the matrix with identity on the left side and the last column is the solutions
 */
mtrx.reducedRowEchelonForm = function(matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  var lead = 0;

  var i = 0, j = 0, r = 0;

  var temp = 0, value = 0;

  var rows, cols;

  rows = _getNumRows(m);

  cols = _getNumCols(m);

  if (rows >= cols) { return; }

  for (r; r < rows; r++) {

    if (cols <= lead ) {

      return;
    }

    i = r;

    while (m[i][lead] === 0) {

      i++;

      if (rows === i) {

        i = r;

        lead++;

        if (cols === lead) {

          return;
        }
      }
    }

    temp = m[i];
    m[i] = m[r];
    m[r] = temp;

    value = m[r][lead];

    for (j = 0; j < cols; j++) {

      m[r][j] /= value;
    }

    for (i = 0; i < rows; i++) {

      if (i === r) { continue; }

      value = m[i][lead];

      for (j = 0; j < cols; j++) {

        m[i][j] -= value * m[r][j];
      }
    }

    lead++;
  }

  return m;
};

/**
 * @description upperTriangular -- a matrix with all values under the diagonal being zero
 * @param  {array} m -- the matrix to have all values below diagonal become zero
 * @return {array}   returns the upper triangular matrix
 */
mtrx.upperTriangular = function(matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  return _createTriangularMatrix(m, 'upper');
};

/**
 * @description lowerTriangular -- a matrix with all values aboce diagonal being zero
 * @param  {array} m -- the matrix to be converted to lower triangular
 * @return {array}   return the lower triangular matrix
 */
mtrx.lowerTriangular = function(matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  return _createTriangularMatrix(m, 'lower');
};

/**
 * @description addRowToMatrix -- adds a row to the already existing matrix
 * @param {array} m   -- the matrix to be augmented
 * @param {array} row -- the new row to be added
 * @return {array} returns the newly augmented matrix
 */
mtrx.addRowToMatrix = function(matrix, row) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  if (row.length !== m[0].length) { return; }

  return _augmentMatrix(m, row, 'row');
};

/**
 * @description addColumnToMatrix -- adds a column to the existing matrix
 * @param {array} m  -- the passed in matrix to modify
 * @param {array} col -- the new column to be added
 * @return {array} returns the passed in matrix with a new column added
 */
var addColumnToMatrix = function(matrix, col) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  if (col.length !== m.length) { return; }

  return _augmentMatrix(m, col, 'col');
};

/**
 * @description rowVector -- returns a row vector based on the specified row number
 * @param  {array} m   -- the matrix whose values will be accessed
 * @param  {int} row -- the row number that the user wants(zero indexed)
 * @return {array}     return the array of the specified row
 */
mtrx.rowVector = function(matrix, row) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  return _getVector(m, row, 'row');
};

/**
 * @description columnVector -- returns the column specified of the matrix
 * @param  {array} m   -- the matrix being accessed
 * @param  {int} col -- the column number
 * @return {array}     returns the column array asked for
 */
mtrx.columnVector = function(matrix, col) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });


  return _getVector(m, col, 'col');
};

/**
 * @description add -- adds two matrices together
 * @param {array} m1 -- the first matrix
 * @param {array} m2  -- the second matrix to add
 * @return {array}  returns the matrix of the sum of each corresponding element
 */
mtrx.add = function(matrix1,matrix2) {

  var m1 = matrix1.map(function(arr) {
    return arr.slice();
  });

  var m2 = matrix2.map(function(arr) {
    return arr.slice();
  });

  return _arithmeticOnMatrix(m1,m2, '+');
};

/**
 * @description subtract -- subtracts two matrices
 * @param  {array} m1 -- the first array
 * @param  {array} m2 -- second array
 * @return {array}    returns the array with each corresponding element subtracted
 */
mtrx.subtract = function(matrix1,matrix2) {

  var m1 = matrix1.map(function(arr) {
    return arr.slice();
  });

  var m2 = matrix2.map(function(arr) {
    return arr.slice();
  });

  return _arithmeticOnMatrix(m1,m2,'-');
};

/**
 * @description print -- prints out the array in a matrix fashion
 * @param  {array} m -- the matrix to be printed
 * @return {string}   returns a string of the matrix with the proper newlines and columns
 */
mtrx.print = function (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var nums = '';

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  if (m && !_isMatrixEmpty(m)) {

    for (i; i < rows; i++) {

      for (j; j < cols; j++) {

        nums += m[i][j] + '\t';
      }

      j = 0;

      nums += '\n';
    }

    return nums;
  }

  return "empty matrix!";
};

/**
 * @description equal -- checks if two matrices are equal
 * @param  {array} m1 -- first array
 * @param  {array} m2 -- second array to test with first
 * @return {bool}    returns true if equal, false otherwise
 */
mtrx.equal = function(matrix1, matrix2) {

  var m1 = matrix1.map(function(arr) {
    return arr.slice();
  });

  var m2 = matrix2.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows = _getNumRows(m1);

  var cols = _getNumCols(m1);

  var rows2 = _getNumRows(m2);

  var cols2 = _getNumCols(m2);

  if (rows !== rows2 || cols !== cols2) {

    return false;
  }

  for (i; i < rows; i++) {

    for (j; j < cols; j++) {

      if (m1[i][j] !== m2[i][j]) {

        return false;
      }
    }

    j = 0;
  }

  return true;
};

/**
 * @description _buildMatrix -- first part of creating the matrix, specifies how many rows will be in the matrix
 * @param  {int} rows -- the number of rows
 * @return {array}      returns an array with length of rows
 */
function _buildMatrix (rows) {

  var matrix = [];

  var i = 0;

  for (i; i < rows; i++) {

    matrix[i] = [];
  }

  return matrix;
}

/**
 * @description _augmentMatrix -- method to help add a row or col to the matrix
 * @param  {array} m      -- the matrix to augment
 * @param  {array} vector -- the row or column to add
 * @param  {string} type   -- specifies whether a row or col is being added
 * @return {array}        returns the matrix with the new row or col
 */
function _augmentMatrix (matrix, vector, type) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  if (type === 'row') {

    m.push(vector);
  }
  else if (type === 'col') {

    for (i; i < rows; i++) {

      m[i].push(vector[i]);
    }
  }

  return m;
}

/**
 * @description _createMatrix -- creates and initializes a matrix of the specific size
 * @param  {int} rows -- num rows
 * @param  {int} cols -- num cols
 * @return {array}      return matrix of rows x cols
 */
function _createMatrix (rows, cols) {

  var matrix = _buildMatrix(rows);

  _assignValuesToMatrix(JSON.parse(JSON.stringify(matrix)), rows, cols);

  return matrix;
}

/**
 * @description _createTriangularMatrix -- method used to help build a lower or upper triangular matrix
 * @param  {array} m    -- the matrix to be converted to a triangular matrix
 * @param  {string} type -- specifies whether it will be a lower or upper triangular
 * @return {array}      returns the triangular matrix
 */
function _createTriangularMatrix (matrix, type) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  if (rows === cols) {

    for (i; i < rows; i++) {

      for (j; j < cols; j++) {

        if (type === 'upper') {

          if (i > j) {

            m[i][j] = 0;
          }
        }
        else if (type === 'lower') {

          if (i < j) {

            m[i][j] = 0;
          }
        }
      }

      j = 0;
    }

    return m;
  }
}

/**
 * @description _arithmeticOnMatrix -- method to help and and subtract matrix values
 * @param  {array} m1 -- the first matrix
 * @param  {array} m2 -- the matrix being added to the first
 * @param  {char} op -- operator specifing + for add and - for subtract
 * @return {array}    returns the array with the added/subtraction results
 */
function _arithmeticOnMatrix (matrix1, matrix2, op) {

  var m1 = matrix1.map(function(arr) {
    return arr.slice();
  });

  var m2 = matrix2.map(function(arr) {
    return arr.slice();
  });

  var newMatrix = [];

  var size = 0;

  var rows1 = _getNumRows(m1), cols1 = _getNumCols(m1);

  var rows2 = _getNumRows(m2), cols2 = _getNumCols(m2);

  var i = 0, j = 0;

  if ( rows1 === rows2 && cols1 === cols2) {

    newMatrix = _createMatrix(rows1, cols1);

    for (i; i < rows1 ; i++) {

      for (j; j < cols1; j++) {

        if (op === '+') {

          newMatrix[i][j] = m1[i][j] + m2[i][j];
        }
        else if (op === '-') {

          newMatrix[i][j] = m1[i][j] - m2[i][j];
        }
      }

      j = 0;
    }

    return newMatrix;
  }
}

/**
 * @description _getVector -- gets the vector of the specified row or column
 * @param  {array} m     -- the matrix to get the vector from
 * @param  {int} which -- specifies which zero indexed column or row to grab
 * @param  {string} type  -- specifies if its a column or row
 * @return {array}       returns the column or row vector, single
 */
function _getVector (matrix, which, type) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var vector = [];

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  if (type === 'row') {

    for (i; i < rows; i++) {

      while (i === which && j < cols) {

        vector.push(m[i][j]);

        j++;
      }
    }
  }
  else if (type === 'col') {

    for (i; i < rows; i++) {

      while (j < cols) {

        if (j === which) {

          vector.push(m[i][j]);
          break;
        }
        else {

          j++;
        }
      }
    }
  }

  return vector;
}

/**
 * @description _getNumRows -- helper method to get the number of rows in the passed in matrix
 * @param  {array} m -- the matrix in question
 * @return {int}   the number of rows for that matrix
 */
function _getNumRows (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0;

  var rows = 0;

  if (!m) { return; }

  for (i; i < m.length; i++) {

    rows++;
  }

  return rows;
}

/**
 * @description _getNumCols -- helper method to get num of columns in the passed in matrix
 * @param  {array} m -- the matrix
 * @return {int}   the number of columns in that matrix
 */
function _getNumCols (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0;

  var cols = 0;

  if (!m) { return; }

  for (i; i < m[0].length; i++) {

    cols ++;
  }

  return cols;
}

/**
 * @description _assignValuesToMatrix -- builds a 3x3 matrix full of random values if user doesn't pass in an array on create
 * @param  {array} matrix -- the array to receive more arrays as elements
 * @param  {int} rows   -- the number of rows to add
 * @param  {int} cols   -- the number of cols to add
 * @return {array}        returns the built matrix with random values between 1-10
 */
function _assignValuesToMatrix (matrix, rows, cols) {

  var i = 0, j = 0;

  for (i; i < rows; i++) {

    for (j; j < cols; j++) {

      matrix[i][j] = Math.floor((Math.random() * 9) + 1);
    }

    j = 0;
  }
}

function _isMatrixEmpty (m) {

  return m.length === 0;
}

/**
 * @description _isSymmetricMatrix -- checks if matrix === it's transpose (swapping rows and columns yields the same matrix)
 * @param  {array}  m -- the matrix to transpose and compare
 * @return {Boolean}   returns true if it is symmetric
 */
function _isSymmetricMatrix (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  var transposedMatrix = this.transpose(m);

  var transposeRows = _getNumRows(transposedMatrix);

  var transposeCols = _getNumCols(transposedMatrix);

  if (rows !== transposeRows || cols !== transposeCols) {

    return false;
  }

  for (i; i < rows; i++) {

    for (j; j < cols; j++) {

      if (m[i][j] !== transposedMatrix[i][j]) {

        return false;
      }
    }

    j = 0;
  }

  return true;
}

/**
 * @description _isDiagonalMatrix -- checks if the only non-zero values in the matrix lie along the diagonal only
 * @param  {array}  m -- the matrix to check
 * @return {Boolean}   returns true if only non-zeros are in the diagonal of the matrix
 */
function _isDiagonalMatrix (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  for (i; i < rows; i++) {

    for (j; j < cols; j++) {

      if (i !== j) {

        if (m[i][j] !== 0) {

          return false;
        }
      }
    }

    j = 0;
  }

  return true;
}

/**
 * @description _isZeroMatrix -- checks whether or not all values in the matrix are zero
 * @param  {array}  m -- the matrix
 * @return {Boolean}   returns true if all values in matrix are zero
 */
function _isZeroMatrix (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  for (i; i < rows; i++) {

    for (j; j < cols; j++) {

      if (m[i][j] !== 0) {

        return false;
      }
    }

    j = 0;
  }

  return true;
}

/**
 * @description _isScalarMatrix -- checks if all values along the diagonal are equal
 * @param  {array}  m -- the matrix to check
 * @return {Boolean}   returns true if all values in the diagonal are equal
 */
function _isScalarMatrix (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var i = 0, j = 0;

  var rows, cols;

  if (_isDiagonalMatrix(m)) {

    rows = _getNumRows(m);

    cols = _getNumCols(m);

    while (i < rows && j < cols) {

      if (m[i+1] && m[j+1]) {

        if (m[i][j] !== m[i+1][j+1]) {

          return false;
        }
      }

      i++;

      j++;
    }

    return true;
  }

  return false;
}

/**
 * @description _isSquareMatrix -- checks if rows === cols for matrix
 * @param  {array}  m -- the matrix
 * @return {Boolean}   returns true if same number of rows and columns
 */
function _isSquareMatrix (matrix) {

  var m = matrix.map(function(arr) {
    return arr.slice();
  });

  var rows = _getNumRows(m);

  var cols = _getNumCols(m);

  return rows === cols;
}

module.exports = mtrx;
