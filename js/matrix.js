function createIdentityMatrix(){
	var result = [];
	result[0] = [1, 0, 0, 0];
	result[1] = [0, 1, 0, 0];
	result[2] = [0, 0, 1, 0];
	result[3] = [0, 0, 0, 1];
	return result;
}

function createTranslateMatrix(x, y, z){
	var identity = createIdentityMatrix();
	identity[0][3] = x;
	identity[1][3] = y;
	identity[2][3] = z;
	return identity;
}

	
function vectorToArray(vector){
	var arr = [];
	arr[0] = vector.x;
	arr[1] = vector.y;
	arr[2] = vector.z;
	arr[3] = 1;
	return arr;
}

function applyTransformation(matrix, array){
	var i, j;
	var result = [];
	var filas = matrix.length, columnas = matrix[0].length;
	for (i=0; i < filas; i++){
		result[i] = 0;
		for(j=0; j < columnas; j++){
			result[i] += matrix[i][j] * array[j];
		}
	}
	return result;
}




