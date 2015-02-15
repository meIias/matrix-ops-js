[![npm version](https://badge.fury.io/js/matrix-ops.svg)](http://badge.fury.io/js/matrix-ops)

#matrix-ops.js <br />
***basic matrix operations library*** '*WIP*'

---
<br/>
##Install
	npm install matrix-ops

##Use
	var matrix = require('matrix-ops');

<br/>
<br />

#matrix.create ( )
	var m = matrix.create([
		[0,1,2],
		[3,4,5],
		[6,7,8]
	]);

*or*

	//generates a random 3x3 matrix if nothing is passed in.
	var m = matrix.create();

---

<br />

#matrix.identity ( m )
>returns the identity matrix(1's along the diagonal) of the passed in matrix.

	var m = matrix.create();
	var identity = matrix.identity(m);

--

<br />

#matrix.scalar ( s , m )
>multiplies all elements in the passed in matrix by the passed in  scalar.

	var m = matrix.create();
	m = matrix.scalar(5, m);

---

<br />

#matrix.trace ( m )
>returns the sum of the diagonal of the passed in matrix.

	var m = matrix.create();
	var tr = matrix.trace(m);

---

<br />

#matrix.transpose ( m )
>returns the passed in matrix with it's rows and columns swapped.

	var m = matrix.create();
	m = matrix.transpose(m);

---

<br />

#matrix.product ( m1, m2 )
>returns a matrix that is the product of the passed in matrices.

	var matrix1 = matrix.create();
	var matrix2 = matrix.create();
	var matrixProduct = matrix.product(matrix1, matrix2);

---

<br />

#matrix.dotProduct ( v1, v2 )
>returns the dot product of two passed in vectors.
> <br /> works if v1.length === v2.length.

	var vector1 = [1,2,3];
	var vector2 = [4,5,6];
	var dot = matrix.dotProduct(vector1, vector2); // should be 29

---

<br />

#matrix.reducedRowEchelonForm ( m )
>reduces an augmented matrix, returns the reduced matrix.

	var m = matrix.create([
		[0,1,2,3],
		[3,4,5,6],
		[6,7,8,9]
	]);

	var reduced = matrix.reducedRowEchelonForm(m);

---

<br />

#matrix.upperTriangular ( m )
>returns the passed in matrix with all values below the diagonal being zero.

	var m = matrix.create();
	m = matrix.upperTriangular(m);

---

<br />

#matrix.lowerTriangular ( )
>returns the passed in matrix with all values above the diagonal being zero.

	var m = matrix.create();
	m = matrix.lowerTriangular(m);

---

<br />

#matrix.addRowToMatrix ( m , r )
> adds row vector 'r' to the bottom of matrix 'm'.

	var m = matrix.create();
	m = matrix.addRowToMatrix(m, [1,2,3]);

---

<br />

#matrix.addColumnToMatrix ( m , c )
> adds column vector 'c' to the rightmost of matrix 'm'.

	var m = matrix.create();
	m = matrix.addColumnToMatrix(m, [1,2,3]);

---

<br />

#matrix.rowVector ( m , r )
> returns the specified row number 'r' from matrix 'm'.

	var m = matrix.create();
	var row = matrix.rowVector(m, 0); // returns first row

---

<br />

#matrix.columnVector ( m , c )
> returns the specified column number 'c' from matrix 'm'.

	var m = matrix.create();
	var row = matrix.columnVector(m, 0); // returns first column

---

<br />

#matrix.add ( m1 , m2 )
> returns the sum of matrices m1 and m2. <br />
> must have same number of rows and columns.

	var matrix1 = matrix.create();
	var matrix2 = matrix.create();
	var row = matrix.add(matrix1, matrix2);

---

<br />

#matrix.subtract ( m1 , m2 )
> returns the difference of matrices m1 and m2. <br />
> must have same number of rows and columns.

	var matrix1 = matrix.create();
	var matrix2 = matrix.create();
	var row = matrix.subtract(matrix1, matrix2);

---

<br />

#matrix.print ( m )
> prints out the matrix in an ordered way.

	alert(matrix.print(m));

---

<br />

#matrix.equal ( m1 , m2 )
> returns true if each element in m1 is the same in m2.

	var matrix1 = matrix.create();
	var matrix2 = matrix.create();

	if (matrix.equal(matrix1, matrix2)) {
		//...
	}

