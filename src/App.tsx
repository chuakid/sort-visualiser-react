import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Sorter from './Sorter';

function App() {
  return <MantineProvider>
    <Sorter />
  </MantineProvider>
}

export default App
