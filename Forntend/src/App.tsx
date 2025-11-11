import { useEffect, useState } from 'react'

export default function App() {
  const [message, setMessage] = useState<string>('Loading...')

  useEffect(() => {
    // Prefer relative path so Vite proxy can route to backend in Docker
    fetch('/api/ping')
      .then((r) => r.json())
      .then((data) => setMessage(data.message || JSON.stringify(data)))
      .catch(() => setMessage('Backend not reachable'))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 rounded-lg shadow bg-white">
        <h1 className="text-2xl font-bold mb-2">Orders Dashboard</h1>
        <p className="text-gray-600">API status: {message}</p>
      </div>
    </div>
  )
}
