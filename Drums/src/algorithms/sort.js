function sleep(milliseconds){
    let startTime = new Date();
    while (true) {
        if( new Date()-startTime >= milliseconds) {
            break;
        }
    }
}

var app = new Vue({
    el: '#app',
    data: {
        arr: [2, 4, 6, 8, 5, 3, 9, 1, 7, 0],
        func_arr: [ "bubbleSort", "selectionSort", "insertionSort", "shellSort" ]
    },
    methods: {
        executeSort:function(){
            let method;
            let variable = document.getElementById('func_sel').value;
            if( variable == "bubbleSort" ) method = this.bubbleSort;
            if( variable == "selectionSort" ) method = this.selectionSort;
            if( variable == "insertionSort" ) method = this.insertionSort;
            if( variable == "shellSort" ) method = this.shellSort;
            this.arr = method(this.arr);
        },
        swap:function(array, i, j){
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            this.$forceUpdate();
            sleep(100);
            //https://medium.com/@koheimikami/understanding-rendering-process-with-virtual-dom-in-vue-js-a6e602811782
        },
        
        bubbleSort(array){
            let N = array.length;
            for( let i = 0; i < N-1; i++ ){
                for (let j = 0; j<N-1; j++)
                    if( array[j] > array[j+1] )
                        this.swap( array, j, j+1 );
            }
            return array;
        },
        selectionSort(array){
            let N = array.length;
            for( let i = 0; i < N-1; i++ ){
                let min = i;
                for (let j = i; j<N; j++)
                    if( array[j] < array[min] )
                        min = j;
                if( i != min )
                    this.swap( array, i, min);
            }
            return array;
        },
        insertionSort(array){
            let N = array.length;
            for( let i = 1; i < N; i++ ){
                let j = i;
                while( (j - 1) > -1 && array[j] < array[j-1] ){
                    this.swap(array, j, j-1);
                    j--;
                }
            }
            return array;
        },
        shellSort(array){
            /* based on insertion sort */
            let N = array.length;
            for( let i = 1; i < N; i++ ){
                let j = ( i + 3 < N ) ? i + 3 : N - 1;
                while( (j - 1) > -1 && array[j] < array[j-1] ){
                    this.swap(array, j, j-1);
                    j--;
                }
            }
            return array;
        }
    }
})