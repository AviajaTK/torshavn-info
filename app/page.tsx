'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#1a1f35] p-4">
      <div className="absolute top-4 left-4 text-white text-lg font-bold">TK Info</div>
      <div className="flex flex-col items-center justify-center h-screen gap-8">
        <button className="button button-faroese w-96" onClick={() => router.push('/faroese')}>
          Føroyingur
        </button>
        <button className="button button-foreign w-96" onClick={() => router.push('/foreign')}>
          Útlendingur
        </button>
      </div>
    </main>
  );
}
