###mtrx.js <br /> 
***basic matrix operations library*** '*WIP*'

---
<br/>
####Install
	npm install matrix-ops
	
	var mtrx = require('matrix-ops');

<br/>
<br />

#####mtrx.create ( )
	var matrix = mtrx.create([
		[0,1,2],
		[3,4,5],
		[6,7,8]
	]);
	
*or*

	//generates a random 3x3 matrix if nothing is passed in.
	var matrix = mtrx.create();
	
--

<br />

#####mtrx.identity ( m )
>returns the identity matrix(1's along the diagonal) of the passed in matrix.

	var matrix = mtrx.create();
	var identity = mtrx.identity(matrix);
	
--

<br />

#####mtrx.scalar ( s , m )
>multiplies all elements in the passed in matrix by the passed in  scalar.

	var matrix = mtrx.create();
	matrix = mtrx.scalar(5, matrix);

--

<br />

#####mtrx.trace ( m )
>returns the sum of the diagonal of the passed in matrix.

	var matrix = mtrx.create();
	var tr = mtrx.trace(matrix);
	
--

<br />

#####mtrx.transpose ( m )
>returns the passed in matrix with it's rows and columns swapped.

	var matrix = mtrx.create();
	matrix = mtrx.transpose(matrix);

--

<br />

#####mtrx.product ( m1, m2 )
>returns a matrix that is the product of the passed in matrices.

	var matrix1 = mtrx.create();
	var matrix2 = mtrx.create();
	var matrixProduct = mtrx.product(matrix1, matrix2);
	
--

<br />

#####mtrx.dotProduct ( v1, v2 )
>returns the dot product of two passed in vectors.
> <br /> works if v1.length === v2.length.

	var vector1 = [1,2,3];
	var vector2 = [4,5,6];
	var dot = mtrx.dotProduct(vector1, vector2); // should be 29
	
--

<br />

#####mtrx.reducedRowEchelonForm ( m )
>reduces an augmented matrix, returns the reduced matrix.

	var matrix = mtrx.create([
		[0,1,2,3],
		[3,4,5,6],
		[6,7,8,9]
	]);
	
	var reduced = mtrx.reducedRowEchelonForm(matrix);

--

<br />

#####mtrx.upperTriangular ( m )
>returns the passed in matrix with all values below the diagonal being zero.

	var matrix = mtrx.create();
	matrix = mtrx.upperTriangular(matrix);
	
--

<br />

#####mtrx.lowerTriangular ( )
>returns the passed in matrix with all values above the diagonal being zero.

	var matrix = mtrx.create();
	matrix = mtrx.lowerTriangular(matrix);

--

<br />

#####mtrx.addRowToMatrix ( m , r )
> adds row vector 'r' to the bottom of matrix 'm'.

	var matrix = mtrx.create();
	matrix = mtrx.addRowToMatrix(matrix, [1,2,3]);

--

<br />

#####mtrx.addColumnToMatrix ( m , c )
> adds column vector 'c' to the rightmost of matrix 'm'.

	var matrix = mtrx.create();
	matrix = mtrx.addColumnToMatrix(matrix, [1,2,3]);

--

<br />
	
#####mtrx.rowVector ( m , r )
> returns the specified row number 'r' from matrix 'm'.

	var matrix = mtrx.create();
	var row = mtrx.rowVector(matrix, 0); // returns first row

--

<br />
	
#####mtrx.columnVector ( m , c )
> returns the specified column number 'c' from matrix 'm'.

	var matrix = mtrx.create();
	var row = mtrx.columnVector(matrix, 0); // returns first column
	
--

<br />
	
#####mtrx.add ( m1 , m2 )
> returns the sum of matrices m1 and m2. <br />
> must have same number of rows and columns.

	var matrix1 = mtrx.create();
	var matrix2 = mtrx.create();
	var row = mtrx.add(matrix1, matrix2);

--

<br />
	
#####mtrx.subtract ( m1 , m2 )
> returns the difference of matrices m1 and m2. <br />
> must have same number of rows and columns.

	var matrix1 = mtrx.create();
	var matrix2 = mtrx.create();
	var row = mtrx.subtract(matrix1, matrix2);

--

<br />
	
#####mtrx.print ( m )
> prints out the matrix in an ordered way.

	var matrix = mtrx.create();
	alert(mtrx.print(matrix));
	
--

<br />
	
#####mtrx.equal ( m1 , m2 )
> returns true if each element in m1 is the same in m2.

	var matrix1 = mtrx.create();
	var matrix2 = mtrx.create();
	
	if (mtrx.equal(matrix1, matrix2)) { 
		//...
	}
	
