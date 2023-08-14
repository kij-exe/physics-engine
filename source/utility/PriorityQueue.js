

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

    // the function to get the next element implemented in such a way that it does not result in a change of array length. Generally it might result in a huge waste of memory occupied by null entries. However, in my case, it is unlikely that the pq will enough large to a significant wastage while omitting performace loss from constant growing and shrinking
    getNext() {
        if (this.isEmpty()) {
            return null;
        }
        var item = this.heap[1];
        this.heap[1] = this.heap[this.nextIndex - 1];

        // Change an empty space to undefined to maintain integrity (empty elements of an array are declared as undefined if you try to access them)
        this.heap[--this.nextIndex] = undefined;
        this.sink(1);
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.heap[1];
    }

    sink(index) {
        // while the node has at least one child
        while (2 * index < this.nextIndex) {
            // make an assumption that the first child is the biggest one
            var maxChildIndex = index * 2;

            // check if there is a second child and if its bigger than the first one
            if (2 * index + 1 < this.nextIndex &&
                this.comparator(this.heap[index * 2 + 1], this.heap[index * 2]) > 0 
                /*right > left*/) {
                maxChildIndex = index * 2 + 1;
            }

            // check if the biggest child is greater than the current node. If so, swap and continue, otherwise stop
            if (this.comparator(this.heap[maxChildIndex], this.heap[index]) > 0 /*child > parent*/) {
                this.swap(maxChildIndex, index);
                index = maxChildIndex;
            } else {
                break;
            }
        }
    }

    rise(index) {
        // while the node has a parent
        while (index > 1) {
            var parentIndex = this.parentIndexOf(index);
            if (this.comparator(this.heap[index], this.heap[parentIndex]) > 0 
                /*child > parent*/) {
                this.swap(index, parentIndex);
                index = parentIndex;
            }
            else {
                break;
            }
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