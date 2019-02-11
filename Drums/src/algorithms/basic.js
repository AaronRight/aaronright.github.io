const arr = [2, 4, 6, 8, 5, 3, 9, 1, 7, 0];
const arr1 = [4, 5, 6, 7, 1, 2, 3, 8, 0, 9];
const arr2 = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function swap(array, i, j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

function bubbleSort(array){
    let N = array.length;
    for( let i = 0; i < N-1; i++ ){
        for (let j = 0; j<N-1; j++)
            if( array[j] > array[j+1] )
                swap( array, j, j+1 );
    }
    return array;
}

function selectionSort(array){
    let N = array.length;
    for( let i = 0; i < N-1; i++ ){
        let min = i;
        for (let j = i; j<N; j++)
            if( array[j] < array[min] )
                min = j;
        if( i != min )
            swap( array, i, min);
    }
    return array;
}

function insertionSort(array){
    let N = array.length;
    for( let i = 1; i < N; i++ ){
        let j = i;
        while( (j - 1) > -1 && array[j] < array[j-1] ){
            swap(array, j, j-1);
            j--;
        }
    }
    return array;
}

function shellSort(array){
    /* based on insertion sort */
    let N = array.length;
    for( let i = 1; i < N; i++ ){
        let j = ( i + 3 < N ) ? i + 3 : N - 1;
        while( (j - 1) > -1 && array[j] < array[j-1] ){
            swap(array, j, j-1);
            j--;
        }
    }
    return array;
}

function mergeSort(array){
    function merge(array, i, j){
        console.log(i+ ":" + j);
        if( j - i > 1 ){
            var left = j - Math.floor( ( j - i ) / 2);
            var right = j - left;
            merge(array, i, left);
            merge(array, right, j);
            for( let p1 = right; p1 < j; p1 ++ ){
                p2 = p1;
                while(p2  > i && array[p2] < array[p1]){
                    p2--; 
                }
                swap( array, p2, p1 );
            }
        } 
    }
    merge( array, 0, array.length );
    return array;
} 

function quickSort(array){
    return array;
}