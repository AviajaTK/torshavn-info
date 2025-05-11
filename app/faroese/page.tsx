'use client'

import { useRouter } from 'next/navigation'
import { logVisitorQuery } from '../utils/flowcore'
import toast from 'react-hot-toast'

export default function FaroesePage() {
  const router = useRouter()

  const handleButtonClick = async (queryType: string) => {
    try {
      const result = await logVisitorQuery('Føroyingur', queryType)
      if (result.success) {
        if (queryType === 'Sletta seinasta input') {
          toast.success('Input slettað!')
        } else {
          toast.success('Loggað!')
        }
      } else {
        toast.error('Feilur við innsending.')
      }
    } catch (error) {
      toast.error('Feilur við innsending.')
    }
  }

  return (
    <main>
      <div className="container">
        <div className="button-grid">
          <button
            onClick={() => handleButtonClick('TK Buss')}
            className="button button-tk-buss"
          >
            TK Buss
          </button>
          <button
            onClick={() => handleButtonClick('Kommunalar Tænastur')}
            className="button button-kommunalar"
          >
            Kommunalar Tænastur
          </button>
          <button
            onClick={() => handleButtonClick('Kunning í TK')}
            className="button button-kunning-tk"
          >
            Kunning í TK
          </button>
          <button
            onClick={() => handleButtonClick('Kunning uttanfyri TK')}
            className="button button-kunning-uttanfyri"
          >
            Kunning uttanfyri TK
          </button>
          <button
            onClick={() => handleButtonClick('Tiltøk')}
            className="button button-tiltok"
          >
            Tiltøk
          </button>
          <button
            onClick={() => handleButtonClick('Annað')}
            className="button button-annad"
          >
            Annað
          </button>
        </div>
        <div className="button-stack">
          <button
            onClick={() => handleButtonClick('Sletta seinasta input')}
            className="button button-sletta"
          >
            Sletta seinasta input
          </button>
          <button
            onClick={() => router.push('/')}
            className="button button-enda"
          >
            Enda
          </button>
        </div>
      </div>
    </main>
  )
}
