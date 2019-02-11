var app = new Vue({
    el: '#app',
    data: {
        arr: [2, 4, 6, 8, 5, 3, 9, 1, 7, 0]
    },
    methods: {
        executeBubbleSort:function(){
            this.arr = this.bubbleSort(this.arr);
        },
        swap:function(array, i, j){
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        },
        bubbleSort: function(array){
            let N = array.length;
            for( let i = 0; i < N-1; i++ ){
                for (let j = 0; j<N-1; j++)
                    if( array[j] > array[j+1] )
                        this.swap( array, j, j+1 );
            }
            return array;
        }
    }
})