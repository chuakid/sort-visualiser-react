import { Step } from "./sorting"

export const generateRandom: (size: number) => Block[] = (size) => Array.from({ length: size }, () => Math.floor(Math.random() * 100)).map((value, i) => ({
    key: i,
    state: "none",
    value
}))

export const playStep = (arr: Block[], step: Step) => {
    const newarr = structuredClone(arr)
    switch (step.type) {
        case 'swapping':
            newarr[step.firstIndex].state = 'swapping'
            newarr[step.secondIndex].state = 'swapping'
            break
        case 'swap':
            {
                const temp = newarr[step.firstIndex]
                newarr[step.firstIndex] = newarr[step.secondIndex]
                newarr[step.secondIndex] = temp
                newarr[step.firstIndex].state = "none"
                newarr[step.secondIndex].state = "none"
                break
            }
        case 'compareStart':
            newarr[step.firstIndex].state = 'comparing'
            newarr[step.secondIndex].state = 'comparing'
            break
        case 'compareEnd':
            newarr[step.firstIndex].state = 'none'
            newarr[step.secondIndex].state = 'none'
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

export const StateToColorMap: Record<State, string> = {
    "comparing": "blue",
    "none": "white",
    "swapping": "green"
} as const
