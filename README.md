###mtrx-js
***basic matrix operations library*** '*WIP* '

---

#####mtrx.create( )
	var matrix = mtrx.create([
		[0,1,2],
		[3,4,5],
		[6,7,8]
	]);
	
*or*

	//generates a random 3x3 matrix if nothing is passed in.
	var matrix = mtrx.create();
	
--

#####mtrx.identity( m )
>returns the identity matrix(1's along the diagonal) of the passed in matrix.

	var matrix = mtrx.create();
	var identity = mtrx.identity(matrix);
	
--

#####mtrx.scalar( s , m )
>multiplies all elements in the passed in matrix by the passed in  scalar.

	var matrix = mtrx.create();
	matrix = mtrx.scalar(5, matrix);

--

#####mtrx.trace ( m )
>returns the sum of the diagonal of the passed in matrix.

	var matrix = mtrx.create();
	var tr = mtrx.trace(matrix);
	
--

#####mtrx.transpose ( m )
>returns the passed in matrix with it's rows and columns swapped.

	var matrix = mtrx.create();
	matrix = mtrx.transpose(matrix);

--

#####mtrx.product ( m1, m2 )
>returns a matrix that is the product of the passed in matrices.

	var matrix1 = mtrx.create();
	var matrix2 = mtrx.create();
	var matrixProduct = mtrx.product(matrix1, matrix2);
	
--



