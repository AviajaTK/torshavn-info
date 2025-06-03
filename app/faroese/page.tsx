'use client'

import { useRouter } from 'next/navigation'
import { logVisitorQuery, deleteLastLog } from '../utils/flowcore'
import toast from 'react-hot-toast'

export default function FaroesePage() {
  const router = useRouter()

  const handleLogClick = async (queryType: string) => {
    const result = await logVisitorQuery('Føroyingur', queryType)
    if (result.success) {
      toast.success('Loggað!')
    } else {
      toast.error('Feilur við innsending.')
    }
  }

  const handleDeleteClick = async () => {
    const result = await deleteLastLog()
    if (result.success) {
      toast.success('Input slettað!')
    } else {
      toast.error('Einki at sletta.')
    }
  }

  return (
    <main>
      <div className="container">
        <div className="button-grid">
          <button onClick={() => handleLogClick('TK Buss')} className="button button-tk-buss">
            TK Buss
          </button>
          <button onClick={() => handleLogClick('Kommunalar Tænastur')} className="button button-kommunalar">
            Kommunalar Tænastur
          </button>
          <button onClick={() => handleLogClick('Kunning í TK')} className="button button-kunning-tk">
            Kunning í TK
          </button>
          <button onClick={() => handleLogClick('Kunning uttanfyri TK')} className="button button-kunning-uttanfyri">
            Kunning uttanfyri TK
          </button>
          <button onClick={() => handleLogClick('Tiltøk')} className="button button-tiltok">
            Tiltøk
          </button>
          <button onClick={() => handleLogClick('Annað')} className="button button-annad">
            Annað
          </button>
        </div>
        <div className="button-stack">
          <button onClick={handleDeleteClick} className="button button-sletta">
            Sletta seinasta input
          </button>
          <button onClick={() => router.push('/')} className="button button-enda">
            Enda
          </button>
        </div>
      </div>
    </main>
  )
}
