var mtrx = (function () {

    "use strict";

    var create = function (input) {

        var matrix = input;

        if (!input) {

            matrix = _buildMatrix(3);

            _assignValuesToMatrix(matrix, 3, 3);
        }

        return matrix;
    };

    var identity = function(m) {

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

    var scalar = function(s, m) {

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

    var trace = function(m) {

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

    var transpose = function(m) {

        var matrix = [];

        var i = 0, j = 0;

        var rows = _getNumRows(m);

        var cols = _getNumCols(m);

        matrix = create(cols, rows);

        for (i; i < cols; i++) {

            matrix[i] = _getVector(m, i, 'col');
        }

        return matrix;
    };

    var product = function(m1, m2) {

        var i = 0, j = 0;

        var newMatrix = [];

        var rowDot = [], colDot = [];

        var rows1 = _getNumRows(m1);

        var cols1 = _getNumCols(m1);

        var rows2 = _getNumRows(m2);

        var cols2 = _getNumCols(m2);

        if (cols1 === rows2) {

            newMatrix = create(rows1, cols2);
        }
        else { return; }

        for (i; i < rows1; i++) {

            for (j; j < cols2; j++) {

                rowDot = rowVector(m1, i);

                colDot = columnVector(m2, j);

                newMatrix[i][j] = dotProduct(rowDot, colDot);
            }

            j = 0;
        }

        return newMatrix;
    };

    var dotProduct = function(row, col) {

        var i = 0;

        var dot = 0;

        if (row.length === col.length) {

            for (i; i < row.length; i++) {

                dot += (row[i] * col[i]);
            }
        }

        return dot;
    };

    var reducedRowEchelonForm = function(m) {

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

                if (i === r) { continue; };

                value = m[i][lead];

                for (j = 0; j < cols; j++) {

                    m[i][j] -= value * m[r][j];
                }
            }

            lead++;
        }

        return m;
    };

    var upperTriangular = function(m) {

        return _createTriangularMatrix(m, 'upper');
    };

    var lowerTriangular = function(m) {

        return _createTriangularMatrix(m, 'lower');
    };

    var addRowToMatrix = function(m, row) {

        if (row.length !== m[0].length) { return; }

        return _augmentMatrix(m, row, 'row');
    };

    var addColumnToMatrix = function(m, col) {

        if (col.length !== m.length) { return; }

        return _augmentMatrix(m, col, 'col');
    };

    var rowVector = function(m, row) {

        return _getVector(m, row, 'row');
    };

    var columnVector = function(m, col) {

        return _getVector(m, col, 'col');
    };

    var add = function(m1,m2) {

        return _arithmeticOnMatrix(m1,m2, '+');
    };

    var subtract = function(m1,m2) {

        return _arithmeticOnMatrix(m1,m2,'-');
    };

    var print = function (m) {

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

    var equal = function(m1, m2) {

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

    var _buildMatrix = function (rows) {

        var matrix = [];

        var i = 0;

        for (i; i < rows; i++) {

            matrix[i] = [];                 
        }

        return matrix;
    };

    var _augmentMatrix = function(m, vector, type) {

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
    };

    var _createTriangularMatrix = function(m, type) {

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
    };

    var _arithmeticOnMatrix = function(m1, m2, op) {

        var newMatrix = [];

        var size = 0;

        var rows1 = _getNumRows(m1), cols1 = _getNumCols(m1);

        var rows2 = _getNumRows(m2), cols2 = _getNumCols(m2);

        var i = 0, j = 0;

        if ( rows1 === rows2 && cols1 === cols2) {

            newMatrix = create(rows1, cols1);

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
    };

    var _getVector = function(m, which, type) {

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
    };

    var _getNumRows = function (m) {

        var i = 0;

        var rows = 0;

        if (!m) { return; };

        for (i; i < m.length; i++) {

            rows++;
        }

        return rows;
    };

    var _getNumCols = function (m) {

        var i = 0;

        var cols = 0;

        if (!m) { return; };

        for (i; i < m[0].length; i++) {
            
            cols ++;
        }

        return cols;
    };

    var _assignValuesToMatrix = function (matrix, rows, cols) {

        var i = 0, j = 0;

        for (i; i < rows; i++) {

            for (j; j < cols; j++) {

                matrix[i][j] = Math.floor((Math.random() * 9) + 1);
            }

            j = 0;
        }
    };

    var _isMatrixEmpty = function (m) {

        return m.length === 0;
    };

    var _isSymmetricMatrix = function(m) {

        var i = 0, j = 0;

        var rows = _getNumRows(m);

        var cols = _getNumCols(m);

        var transposedMatrix = transpose(m);

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
    };

    var _isDiagonalMatrix = function(m) {

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
    };

    var _isZeroMatrix = function(m) {

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
    };

    var _isScalarMatrix = function(m) {

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
    };

    var _isSquareMatrix = function (m) {

        var rows = _getNumRows(m);

        var cols = _getNumCols(m);

        return rows === cols;       
    };

    return {

        create: create,
        identity: identity,
        scalar: scalar,
        trace: trace,
        transpose: transpose,
        product: product,
        dotProduct: dotProduct,
        reducedRowEchelonForm: reducedRowEchelonForm,
        upperTriangular: upperTriangular,
        lowerTriangular: lowerTriangular,
        addRowToMatrix: addRowToMatrix,
        addColumnToMatrix: addColumnToMatrix,
        rowVector: rowVector,
        columnVector: columnVector,
        add: add,
        subtract: subtract,
        print: print,
        equal: equal
    };
}());