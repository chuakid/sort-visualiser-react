import { Step } from "./sorting"

export const generateRandom: (size: number) => Block[] = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100)).map((value, i) => ({
    key: i,
    state: "none",
    value
}))

export const playStep = (arr: Block[], step: Step) => {
    const newarr: Block[] = arr.map(block => ({ ...block, state: "none" }))
    switch (step.type) {
        case 'swap':
            {
                newarr[step.firstIndex].state = 'swapping'
                newarr[step.secondIndex].state = 'swapping'
                const temp = newarr[step.firstIndex]
                newarr[step.firstIndex] = newarr[step.secondIndex]
                newarr[step.secondIndex] = temp
                break
            }
        case 'compare':
            newarr[step.firstIndex].state = 'comparing'
            newarr[step.secondIndex].state = 'comparing'
            break
    }
    return newarr
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const States = ["none", "swapping", "comparing"] as const
export type State = (typeof States)[number]

export interface Block {
    key: number,
    state: State
    value: number
}