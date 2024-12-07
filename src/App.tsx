import { useEffect, useRef, useState } from 'react'
import './index.css'
import { quicksort, Step } from './sorting'
import { Block, generateRandom, playStep, StateToColorMap } from './utils'

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
        {array.map((block, i) => <div key={i} style={{
          height: `${block.value}%`, background: StateToColorMap[block.state],
          flex: 1
        }} />)}</div>
      <button onClick={() => {
        setIsPlaying(false)
        setArray(generateRandom)
      }}>Generate Array</button>
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
