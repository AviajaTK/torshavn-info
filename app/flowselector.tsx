// FlowSelector.tsx
import React, { useState } from 'react';

type FlowOption = {
  label: string;
  nextScreen?: 'citizen' | 'foreigner';
};

type FlowScreen = {
  options: FlowOption[];
};

const startScreen: FlowScreen = {
  options: [
    { label: 'Føroyingur', nextScreen: 'citizen' },
    { label: 'Ferðafólk', nextScreen: 'foreigner' },
  ],
};

const citizenScreen: FlowScreen = {
  options: [
    { label: 'TK Buss' },
    { label: 'Kommunalar Tænastur' },
    { label: 'Kunning í TK' },
    { label: 'Kunning uttanfyri TK' },
    { label: 'Mist & Funnið' },
    { label: 'Tiltøk' },
    { label: 'Enda' },
  ],
};

const foreignerScreen: FlowScreen = {
  options: [
    { label: 'TK Buss' },
    { label: 'SSL' },
    { label: 'Kunning í TK' },
    { label: 'Kunning uttanfyri TK' },
    { label: 'Annað' },
    { label: 'Tiltøk' },
    { label: 'Enda' },
  ],
};

function getColorClass(label: string): string {
  const map: Record<string, string> = {
    'Føroyingur': 'bg-blue-400',
    'Ferðafólk': 'bg-pink-200',
    'TK Buss': 'bg-green-300',
    'Kommunalar Tænastur': 'bg-yellow-200',
    'Kunning í TK': 'bg-cyan-200',
    'Kunning uttanfyri TK': 'bg-purple-200',
    'Mist & Funnið': 'bg-orange-100',
    'Tiltøk': 'bg-sky-200',
    'SSL': 'bg-rose-100',
    'Annað': 'bg-pink-100',
    'Enda': 'bg-rose-500 text-white',
  };
  return map[label] ?? 'bg-gray-300';
}

export default function FlowSelector() {
  const [screen, setScreen] = useState<FlowScreen>(startScreen);

  const handleClick = (option: FlowOption) => {
    if (option.label === 'Enda') {
      setScreen(startScreen); // Go back to start
      return;
    }

    if (option.nextScreen === 'citizen') {
      setScreen(citizenScreen);
    } else if (option.nextScreen === 'foreigner') {
      setScreen(foreignerScreen);
    }
  };

  return (
    <div className="min-h-screen bg-[#181c32] flex flex-col items-center justify-center space-y-4 px-4">
      {screen.options.map((option, i) => (
        <button
          key={i}
          onClick={() => handleClick(option)}
          className={`${getColorClass(option.label)} w-full max-w-md text-center rounded-xl px-8 py-4 text-black text-lg hover:opacity-90 transition`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
} 