
import './App.css'
import { Button } from './components/Button'
import { Plusicon } from './icons/Plusicon'

function App() {
  

  return (
    <>
      <Button startIcon={<Plusicon />}  variant='primary' text='Share'></Button>
      <Button variant='secondary' text='Add Content'></Button>
        
    </>
  )
}

export default App
