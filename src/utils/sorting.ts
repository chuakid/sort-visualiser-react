import { Block } from "./utils"

export interface Step {
    type: "swap" | "compare"
    firstIndex: number
    secondIndex: number
}

export const ALGOS = {
    "Bubblesort": bubbleSort,
    "Quicksort": quicksort,
    "SelectionSort": selectionSort,
    "Insertion Sort": insertionSort
} as const

function* bubbleSort(arr: Block[]) {
    const newArr = structuredClone(arr)
    let swapped = true
    while (swapped) {
        swapped = false
        for (let i = 0; i < newArr.length - 1; i++) {
            if (yield* compare(newArr, i, i + 1)) {
                swapped = true
                yield* swap(newArr, i, i + 1)
            }
        }
    }
}

function* swap(newarr: Block[], a: number, b: number): Generator<Step> {
    const temp = newarr[a]
    newarr[a] = newarr[b]
    newarr[b] = temp
    yield {
        type: "swap",
        firstIndex: a,
        secondIndex: b
    }
}

function* compare(newarr: Block[], a: number, b: number): Generator<Step> {
    yield {
        type: "compare",
        firstIndex: a,
        secondIndex: b
    }

    return newarr[a].value > newarr[b].value
}
function* quicksort(arr: Block[]) {
    const newArr = structuredClone(arr)
    function* quicksorter(low: number, high: number): Generator<Step> {
        if (low < high) {
            const pi = yield* partition(low, high);
            yield* quicksorter(low, pi - 1);
            yield* quicksorter(pi + 1, high);
        }
    }
    function* partition(low: number, high: number) {
        let pivot_spot = low - 1; //Current spot for pivot - 1
        for (let i = low; i <= high; i++) {
            if (yield* compare(newArr, high, i)) {
                pivot_spot++; //If a[i] is smaller then pivot belongs to to a[i+1]
                if (pivot_spot != i) {
                    yield* swap(newArr, pivot_spot, i)
                }
            }
        }
        yield* swap(newArr, pivot_spot + 1, high)
        return pivot_spot + 1;
    }
    yield* quicksorter(0, newArr.length - 1);
}

function* selectionSort(arr: Block[]) {
    for (let i = arr.length - 1; i >= 0; i--) {
        let currentLargestIndex = 0
        for (let j = 0; j <= i; j++) {
            if (currentLargestIndex < 0) {
                currentLargestIndex = j
            } else {
                if (yield* compare(arr, j, currentLargestIndex)) {
                    currentLargestIndex = j
                }
            }
        }
        yield* swap(arr, i, currentLargestIndex)
    }
}

function* insertionSort(arr: Block[]) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j > 0; j--) {
            if (!(yield* compare(arr, j - 1, j))) {
                break
            }
            yield* swap(arr, j, j - 1)
        }
    }
}