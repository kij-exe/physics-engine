

class PriorityQueue {

    // binary heap based priority queue. Data is stored in an array where every element at index n has two child elements at indices 2n and 2n + 1. Every parent value is greater than both values of its two child elements.

    constructor(comparator = (a,b) => a - b) {
        this.heap = [null];
        this.nextIndex = 1;
        this.comparator = comparator;
    }

    push(item) {
        this.heap[this.nextIndex] = item;
        this.rise(this.nextIndex++);
    }

    // the function to get the next element implemented in such a way that it does not result in change of length of an array. Generally it might result in a huge waste of memory occupied by null entries. However, in my case, it is unlikely that the pq will enough large to a significant wastage while omitting performace loss from constant growing and shrinking
    getNext() {
        if (this.isEmpty()) {
            return null;
        }
        var item = this.heap[1];
        this.heap[1] = null;
        this.sink(--this.nextIndex);
        return item;
    }

    sink() {

    }

    rise(index) {
        if (index == 1) {
            return;
        }
        var parentIndex = this.parentIndexOf(index);
        var parent = this.heap[parentIndex];
        var child = this.heap[index];
        if (parent === null || this.comparator(child, parent) > 0 /*child > parent*/) {
            this.swap(parentIndex, index);
            this.rise(parentIndex);
        }
    }

    swap(index1, index2) {
        var temp = this.heap[index1];
        this.heap[index1] = this.heap[index2];
        this.heap[index2] = temp;
    }

    parentIndexOf(index) {
        return Math.floor(index / 2);
    }

    isEmpty() {
        return this.nextIndex == 1;
    }

    [Symbol.iterator]() {
        var copiedPq = new PriorityQueue(this.comparator);
        // creating a shallow copy to iterate through elements not changing structure of the original pq
        copiedPq.heap = [...this.heap];
        copiedPq.nextIndex = copiedPq.heap.length;
        return {
            copiedPq: copiedPq,
            next: function() {
                return {
                    done: this.copiedPq.isEmpty(),
                    value: this.copiedPq.getNext()
                }
            }
        }
    }

}

export {PriorityQueue as default};