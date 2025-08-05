'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#1a1f35] p-4 flex flex-col items-center justify-center">
      <div className="text-white text-2xl font-bold mb-12">TK Info</div>
      <div className="flex flex-col items-center justify-center gap-8">
        <button className="button button-faroese w-96" onClick={() => router.push('/faroese')}>
          Borgari
        </button>
        <button className="button button-foreign w-96" onClick={() => router.push('/foreign')}>
          Ferðafólk
        </button>
      </div>
    </main>
  );
}
