import { Block } from "./utils"

export interface Step {
    type: "swapping" | "swap" | "compareStart" | "compareEnd"
    firstIndex: number
    secondIndex: number
}

export const ALGOS = {
    "bubblesort": bubbleSort,
    "quicksort": quicksort
} as const

export function* bubbleSort(arr: Block[]): Generator<Step> {
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
        type: "swapping",
        firstIndex: a,
        secondIndex: b
    }
    yield {
        type: "swap",
        firstIndex: a,
        secondIndex: b
    }
}

function* compare(newarr: Block[], a: number, b: number): Generator<Step> {
    yield {
        type: "compareStart",
        firstIndex: a,
        secondIndex: b
    }
    yield {
        type: "compareEnd",
        firstIndex: a,
        secondIndex: b
    }
    return newarr[a].value > newarr[b].value
}
export function* quicksort(arr: Block[]): Generator<Step> {
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