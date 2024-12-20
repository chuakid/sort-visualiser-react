import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { ALGOS, bubbleSort, Step } from './sorting'
import { Block, generateRandom, playStep, StateToColorMap } from './utils'
import { motion } from "motion/react"

function App() {
  const [size, setSize] = useState(100)
  const [array, setArray] = useState<Block[]>(generateRandom(size))
  const [isPlaying, setIsPlaying] = useState(false)
  const [sortingAlgo, setSortingAlgo] = useState<keyof typeof ALGOS>("bubblesort")
  const sortingGeneratorRef = useRef<Generator<Step>>(bubbleSort(array))
  const [animate, setAnimate] = useState(true)
  const [timer, setTimer] = useState(50)

  useEffect(() => {
    if (isPlaying) {
      const nextStep = sortingGeneratorRef.current.next()
      if (!nextStep.done) {
        const timeout = setTimeout(() => {
          setArray(array => playStep(array, nextStep.value))
        }, timer)
        return () => clearTimeout(timeout)
      } else setIsPlaying(false)
    }
  }, [isPlaying, array, timer])

  return (
    <div style={{ background: "black", minHeight: "100vh", minWidth: "100vw" }}>
      <div style={{ height: "500px", display: 'flex', alignItems: "flex-end" }}>
        {array.map((block) => <motion.div layout={animate} key={block.key} style={{
          height: `${block.value}%`, background: StateToColorMap[block.state],
          flex: 1
        }} />)}
      </div>
      <div className={styles.options}>
        <button onClick={() => {
          setIsPlaying(false)
          const newArray = generateRandom(size)
          setArray(newArray)
          sortingGeneratorRef.current = ALGOS[sortingAlgo](newArray)
        }}>Generate Array</button>
        <button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "Pause" : "Play"}</button>
        <label htmlFor='animate'>Animate</label> <input id="animate" type="checkbox" checked={animate} onChange={(e) => setAnimate(e.currentTarget.checked)} />

        <select value={sortingAlgo} onChange={(e) => {
          const algo = e.currentTarget.value as keyof typeof ALGOS
          setSortingAlgo(algo)
          sortingGeneratorRef.current = ALGOS[algo](array)
        }}>
          {Object.keys(ALGOS).map(algo => <option key={algo} value={algo}>{algo}</option>)}
        </select>
        <div style={{ border: "1px solid #eeeeee", padding: "8px" }}>
          <label>Time between steps: {timer}</label><input min={1} max={1000} step={1} type="range" onChange={e => setTimer(Number(e.currentTarget.value))} />
        </div>
        <div style={{ border: "1px solid #eeeeee", padding: "8px" }}>
          <label>Array size: {size}</label><input min={1} max={1000} step={1} type="range" onChange={e => {
            setSize(Number(e.currentTarget.value))
            const newArray = generateRandom(Number(e.currentTarget.value))
            setArray(newArray)
            sortingGeneratorRef.current = ALGOS[sortingAlgo](newArray)
          }} />
        </div>
      </div>

    </div >
  )
}

export default App
