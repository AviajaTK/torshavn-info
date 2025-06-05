// app/utils/storage.ts

export interface VisitorLog {
  visitorType: string;
  category: string;
  timestamp: string;
}

// In-memory storage for visitor logs
export const visitorLogs: VisitorLog[] = [];

// Helper functions for managing logs
export function addLog(log: VisitorLog) {
  visitorLogs.push(log);
}

export function getLogs(startDate?: string, endDate?: string): VisitorLog[] {
  if (!startDate && !endDate) {
    return visitorLogs;
  }

  return visitorLogs.filter(log => {
    const logDate = new Date(log.timestamp);
    if (startDate && new Date(startDate) > logDate) return false;
    if (endDate && new Date(endDate) < logDate) return false;
    return true;
  });
} 