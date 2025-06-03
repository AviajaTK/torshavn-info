// --- MOCKED VERSION FOR EXAM DEMO ---

let logs = [
  {
    visitorType: "Føroyingur",
    queryType: "Kunning í TK",
    timestamp: "2025-06-02T14:25:00Z",
    id: "log1"
  },
  {
    visitorType: "Útlendingur",
    queryType: "SSL",
    timestamp: "2025-06-02T15:45:00Z",
    id: "log2"
  },
  {
    visitorType: "Føroyingur",
    queryType: "TK Buss",
    timestamp: "2025-06-03T09:10:00Z",
    id: "log3"
  }
];

let counter = 4;

export async function logVisitorQuery(visitorType: string, queryType: string) {
  const newLog = {
    visitorType,
    queryType,
    timestamp: new Date().toISOString(),
    id: `log${counter++}`
  };
  logs.push(newLog);
  console.log('[MOCK] Logged:', newLog);
  await new Promise(resolve => setTimeout(resolve, 200));
  return { success: true };
}

export async function deleteLastLog() {
  if (logs.length > 0) {
    const removed = logs.pop();
    console.log('[MOCK] Deleted:', removed);
    return { success: true };
  }
  return { success: false, error: 'No logs to delete' };
}

export async function getVisitorLogs(startDate?: string, endDate?: string) {
  return {
    success: true,
    data: {
      logs,
      total: logs.length,
      page: 1,
      pageSize: 50
    }
  };
}

export interface VisitorLog {
  visitorType: string;
  queryType: string;
  timestamp: string;
  id: string;
}

export interface VisitorLogsResponse {
  logs: VisitorLog[];
  total: number;
  page: number;
  pageSize: number;
}
