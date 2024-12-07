import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { quicksort, Step } from './sorting'
import { Block, generateRandom, playStep, StateToColorMap } from './utils'

function App() {
  const [array, setArray] = useState<Block[]>(generateRandom())
  const [isPlaying, setIsPlaying] = useState(false)
  const sortingGeneratorRef = useRef<Generator<Step>>(quicksort(array))

  useEffect(() => {
    if (isPlaying && sortingGeneratorRef.current) {
      const nextStep = sortingGeneratorRef.current.next()
      if (!nextStep.done) {
        const timeout = setTimeout(() => {
          setArray(array => playStep(array, nextStep.value))
        }, 1)
        return () => clearTimeout(timeout)
      } else setIsPlaying(false)
    }
  }, [isPlaying, array])

  return (
    <div style={{ background: "black", minHeight: "100vh", minWidth: "100vw" }}>
      <div style={{ height: "500px", display: 'flex', alignItems: "flex-end" }}>
        {array.map((block, i) => <div key={i} style={{
          height: `${block.value}%`, background: StateToColorMap[block.state],
          flex: 1
        }} />)}</div>
      <div className={styles.options}>
        <button onClick={() => {
          setIsPlaying(false)
          const newArray = generateRandom()
          setArray(newArray)
          sortingGeneratorRef.current = quicksort(newArray)
        }}>Generate Array</button>

        <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "Pause" : "Play"}</button>
      </div>

    </div >
  )
}

export default App
