import { useEffect, useRef, useState } from 'react'
import './index.css'
import { bubbleSort, quicksort, Step } from './sorting'

const generateRandom: () => Block[] = () => Array.from({ length: 100 }, () => Math.floor(Math.random() * 100)).map(value => ({
  state: "none",
  value
}))


const playStep = (arr: Block[], step: Step) => {
  const newarr = structuredClone(arr)
  switch (step.type) {
    case 'swapping':
      newarr[step.firstIndex].state = 'swapping'
      newarr[step.secondIndex].state = 'swapping'
      break
    case 'swap':
      const temp = newarr[step.firstIndex]
      newarr[step.firstIndex] = newarr[step.secondIndex]
      newarr[step.secondIndex] = temp
      newarr[step.firstIndex].state = "none"
      newarr[step.secondIndex].state = "none"
      break
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

const States = ["none", "swapping", "comparing"] as const
type State = (typeof States)[number]

export interface Block {
  state: State
  value: number
}

const StateToColorMap: Record<State, string> = {
  "comparing": "blue",
  "none": "white",
  "swapping": "green"
} as const

function App() {
  const [array, setArray] = useState<Block[]>(generateRandom())
  const [isPlaying, setIsPlaying] = useState(false)
  const sortingGeneratorRef = useRef<Generator<Step> | null>()

  useEffect(() => {
    if (isPlaying) {
      const nextStep = sortingGeneratorRef.current?.next()
      if (!nextStep?.done) {
        const timeout = setTimeout(() => {
          setArray(array => playStep(array, nextStep!.value))
        }, 1)
        return () => clearTimeout(timeout)
      }
    }
  }, [isPlaying, array])



  return (
    <div style={{ background: "black", minHeight: "100vh", minWidth: "100vw" }}>
      <div style={{ height: "500px", display: 'flex', alignItems: "flex-end" }}>
        {array.map(block => <div style={{
          height: `${block.value}%`, background: StateToColorMap[block.state],
          flex: 1
        }} />)}</div>
      <button onClick={() => setArray(generateRandom)}>Generate Array</button>
      <button onClick={() => {
        sortingGeneratorRef.current = quicksort(array)
        setIsPlaying(true)
      }}>Sort</button>
      <button onClick={() => setIsPlaying(false)}>Pause</button>
      <button onClick={() => setIsPlaying(true)}>Play</button>
    </div >
  )
}

export default App
