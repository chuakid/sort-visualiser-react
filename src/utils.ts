import { Block } from "./App";

export const generateRandom: () => Block[] = () => Array.from({ length: 100 }, () => Math.floor(Math.random() * 100)).map(value => ({
    state: "none",
    value
}))
