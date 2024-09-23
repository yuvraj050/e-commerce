import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="text-center">
      <div className="flex justify-center gap-4 mt-8">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="w-16 h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-16 h-16 react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-5xl font-bold my-8">Vite + React</h1>
      <div className="card">
        <button
          className="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="text-gray-500 mt-8">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
