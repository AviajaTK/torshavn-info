'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { logVisitorInfo } from '@/app/utils/flowcore';

export default function ForeignPage() {
  const router = useRouter();

  const handleClick = async (category: string) => {
    const entry = { visitorType: 'Útlendingur', category, timestamp: new Date().toISOString() };
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
    <main className="foreign-main">
      <button className="button button-tax-free wide-btn" onClick={() => handleClick('Tax Free')}>Tax Free</button>
      <div className="foreign-grid">
        <button className="button button-tk-buss" onClick={() => handleClick('TK Buss')}>TK Buss</button>
        <button className="button button-ssl" onClick={() => handleClick('SSL')}>SSL</button>
        <button className="button button-kunning-tk" onClick={() => handleClick('Kunning í TK')}>Kunning í TK</button>
        <button className="button button-kunning-uttanfyri" onClick={() => handleClick('Kunning uttanfyri TK')}>Kunning uttanfyri TK</button>
        <button className="button button-tiltok" onClick={() => handleClick('Tiltøk')}>Tiltøk</button>
        <button className="button button-annad" onClick={() => handleClick('Annað')}>Annað</button>
      </div>
      <div className="age-group-row">
        <button className="button button-age" onClick={() => handleClick('Børn & Ung (0–17 ár)')}>Børn & Ung (0–17 ár)</button>
        <button className="button button-age" onClick={() => handleClick('Ung ferðafólk (18–29 ár)')}>Ung ferðafólk (18–29 ár)</button>
        <button className="button button-age" onClick={() => handleClick('Familjur & Pør (30–44 ár)')}>Familjur & Pør (30–44 ár)</button>
      </div>
      <div className="age-group-row">
        <button className="button button-age" onClick={() => handleClick('Empty nesters (45–59 ár)')}>Empty nesters (45–59 ár)</button>
        <button className="button button-age" onClick={() => handleClick('Eftirlønarfør ferðafólk (60+ ár)')}>Eftirlønarfør ferðafólk (60+ ár)</button>
      </div>
      <button className="button button-sletta wide-btn" onClick={handleUndo}>Sletta seinasta input</button>
      <button className="button button-enda wide-btn" onClick={handleEnd}>Enda</button>
    </main>
  );
}
