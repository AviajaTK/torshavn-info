'use client';

import { useRouter } from 'next/navigation';
import { logVisitorQuery } from '../utils/flowcore';
import toast from 'react-hot-toast';

export default function ForeignPage() {
  const router = useRouter();

  const handleButtonClick = async (queryType: string) => {
    try {
      const result = await logVisitorQuery('Útlendingur', queryType);
      if (result.success) {
        if (queryType === 'Sletta seinasta input') {
          toast.success('Input slettað!');
        } else {
          toast.success('Loggað!');
        }
      } else {
        toast.error('Feilur við innsending.');
      }
    } catch (error) {
      toast.error('Feilur við innsending.');
    }
  };

  return (
    <main>
      <div className="container">
        <button
          onClick={() => handleButtonClick('Tax Free')}
          className="button button-tax-free"
        >
          Tax Free
        </button>
        <div style={{ height: '1.5rem' }} />
        <div className="button-grid">
          <button
            onClick={() => handleButtonClick('TK Buss')}
            className="button button-kunning-uttanfyri"
          >
            TK Buss
          </button>
          <button
            onClick={() => handleButtonClick('SSL')}
            className="button button-ssl"
          >
            SSL
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
        <div style={{ height: '1.5rem' }} />
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '0.5rem', 
          justifyContent: 'center',
          padding: '0 1rem'
        }}>
          <button
            onClick={() => handleButtonClick('Børn & Ung (0-17 ár)')}
            style={{
              backgroundColor: '#9ab2d6',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Børn & Ung (0-17 ár)
          </button>
          <button
            onClick={() => handleButtonClick('Ung ferðafólk (18-29 ár)')}
            style={{
              backgroundColor: '#9ab2d6',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Ung ferðafólk (18-29 ár)
          </button>
          <button
            onClick={() => handleButtonClick('Familjur & Pør (30-44 ár)')}
            style={{
              backgroundColor: '#9ab2d6',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Familjur & Pør (30-44 ár)
          </button>
          <button
            onClick={() => handleButtonClick('Empty nesters (45-59 ár)')}
            style={{
              backgroundColor: '#9ab2d6',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Empty nesters (45-59 ár)
          </button>
          <button
            onClick={() => handleButtonClick('Eftirlønarferðafólk (60+ ár)')}
            style={{
              backgroundColor: '#9ab2d6',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Eftirlønarferðafólk (60+ ár)
          </button>
        </div>
        <div style={{ height: '1.5rem' }} />
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
  );
}
