#mtrx-js
###***basic matrix operations library*** '*WIP* '

---

###mtrx.create( )
	var matrix = mtrx.create([
		[0,1,2],
		[3,4,5],
		[6,7,8]
	]);
	
*or*

	//generates a random 3x3 matrix if nothing is passed in.
	var matrix = mtrx.create();
	
--

###mtrx.identity( m )
>returns the identity matrix(1's along the diagonal) of the passed in matrix.

	var matrix = mtrx.create();
	var identity = mtrx.identity(matrix);
	
--

###mtrx.scalar( s , m )
>multiplies all elements in the passed in matrix by the passed in  scalar.

	var matrix = mtrx.create();
	matrix = mtrx.scalar(5,matrix);

--

