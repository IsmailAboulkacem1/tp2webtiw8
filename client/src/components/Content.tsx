import { useState } from 'react'
export default function Content() {
  const [count, setCount] = useState(0)
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6">
      <p className="mb-4">Vous avez cliqué {count} fois</p>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={() => setCount(c => c + 1)}
      >
        Cliquer ici
      </button>
    </main>
  )
}
