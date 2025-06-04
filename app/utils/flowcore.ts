// app/utils/flowcore.ts

export async function logVisitorInfo(visitorData: {
  visitorType: string;
  category: string;
  timestamp: string;
}) {
  console.log('Mock logging visitor data:', visitorData);
  return { success: true };
}

export async function getVisitorLogs(startDate?: string, endDate?: string) {
  return [
    {
      visitorType: 'Føroyingur',
      category: 'Kunning í TK',
      timestamp: new Date().toISOString(),
    },
    {
      visitorType: 'Útlendingur',
      category: 'SSL',
      timestamp: new Date().toISOString(),
    },
  ];
}
