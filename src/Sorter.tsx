import { Anchor, Button, Checkbox, Container, Group, Select, Slider, Stack, Text, Title } from '@mantine/core'
import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import ThemeSwitch from './components/ThemeSwitch'
import styles from "./styles.module.scss"
import { ALGOS, Step } from './utils/sorting'
import { Block, generateRandom, playStep } from './utils/utils'

const Sorter = () => {
    const [size, setSize] = useState(100)
    const [array, setArray] = useState<Block[]>(generateRandom(size))
    const [isPlaying, setIsPlaying] = useState(false)
    const [sortingAlgo, setSortingAlgo] = useState<keyof typeof ALGOS>("Bubblesort")
    const sortingGeneratorRef = useRef<Generator<Step>>(ALGOS.Bubblesort(array))
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
        <Container style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <div style={{ height: "500px", display: 'flex', alignItems: "flex-end" }}>
                {array.map((block) => <
                    motion.div
                    className={styles[block.state]}
                    layout={animate}
                    key={block.key}
                    style={{
                        height: `${block.value}%`,
                        flex: 1
                    }} />)}
            </div>
            <Stack align='flex-start'>
                <Title order={2}>Settings</Title>
                <ThemeSwitch />
                <Group>
                    <Button onClick={() => {
                        setIsPlaying(false)
                        const newArray = generateRandom(size)
                        setArray(newArray)
                        sortingGeneratorRef.current = ALGOS[sortingAlgo](newArray)
                    }}>Generate Array</Button>
                    <Button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? "Pause" : "Play"}</Button>
                    <Checkbox
                        label="Animate"
                        checked={animate}
                        onChange={(e) => setAnimate(e.currentTarget.checked)} />
                </Group>
                <Select
                    label="Sorting Algorithm"
                    value={sortingAlgo}
                    data={Object.keys(ALGOS)}
                    onChange={(val) => {
                        const algo = val as keyof typeof ALGOS
                        if (!algo) return
                        setSortingAlgo(algo)
                        sortingGeneratorRef.current = ALGOS[algo](array)
                    }} />
                <div style={{ alignSelf: "stretch" }}>
                    <Text>Time between steps: {timer}</Text>
                    <Slider
                        min={1} max={1000} step={1}
                        onChange={e => setTimer(e)} value={timer} />
                </div>
                <div style={{ alignSelf: "stretch" }}>
                    <Text>Size of array: {size}</Text>
                    <Slider
                        label={(size) => `Size of array: ${size}`}
                        min={1}
                        max={1000}
                        step={1}
                        value={size}
                        onChange={val => {
                            setSize(val)
                            const newArray = generateRandom(val)
                            setArray(newArray)
                            sortingGeneratorRef.current = ALGOS[sortingAlgo](newArray)
                        }}
                    />
                </div>
                <Anchor href='https://github.com/chuakid/sort-visualiser-react'>Source</Anchor>
            </Stack>

        </Container >
    )
}

export default Sorter