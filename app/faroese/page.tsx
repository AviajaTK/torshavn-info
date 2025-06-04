'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { logVisitorInfo } from '@/app/utils/flowcore';

export default function FaroesePage() {
  const router = useRouter();

  const handleClick = async (category: string) => {
    const entry = { visitorType: 'Føroyingur', category, timestamp: new Date().toISOString() };
    const res = await logVisitorInfo(entry);
    if (res.success) toast.success('Loggað!');
  };

  const handleUndo = () => {
    toast('Input Slettað!');
  };

  const handleEnd = () => {
    router.push('/');
  };

  return (
    <main className="faroese-main">
      <div className="faroese-grid">
        <button className="button button-tk-buss" onClick={() => handleClick('TK Buss')}>TK Buss</button>
        <button className="button button-kommunalar" onClick={() => handleClick('Kommunalar Tænastur')}>Kommunalar Tænastur</button>
        <button className="button button-kunning-tk" onClick={() => handleClick('Kunning í TK')}>Kunning í TK</button>
        <button className="button button-kunning-uttanfyri" onClick={() => handleClick('Kunning uttanfyri TK')}>Kunning uttanfyri TK</button>
        <button className="button button-tiltok" onClick={() => handleClick('Tiltøk')}>Tiltøk</button>
        <button className="button button-annad" onClick={() => handleClick('Annað')}>Annað</button>
      </div>
      <button className="button button-sletta wide-btn" onClick={handleUndo}>Sletta seinasta input</button>
      <button className="button button-enda wide-btn" onClick={handleEnd}>Enda</button>
    </main>
  );
}
