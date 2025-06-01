'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main>
      <div className="container">
        <button
          onClick={() => router.push('/faroese')}
          className="button button-faroese"
        >
          Borgari
        </button>
        <div style={{ height: '1.5rem' }} />
        <button
          onClick={() => router.push('/foreign')}
          className="button button-foreign"
        >
          Ferðafólk
        </button>
      </div>
    </main>
  )
} 