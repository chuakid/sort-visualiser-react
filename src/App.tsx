import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Sorter from './Sorter';

function App() {
  const theme = createTheme({
    cursorType: 'pointer',
  })
  return <MantineProvider theme={theme}>
    <Sorter />
  </MantineProvider>
}

export default App
