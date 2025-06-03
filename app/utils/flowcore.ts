// TODO: Import actual Flowcore SDK when available
// import { FlowcoreClient } from '@flowcore/sdk';

// Mock Flowcore client for now
class MockFlowcoreClient {
  async logQuery(data: any) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Flowcore log:', data);
    return { success: true };
  }
}

// Create a singleton instance
const flowcoreClient = new MockFlowcoreClient();

export async function logVisitorQuery(visitorType: string, queryType: string) {
  const apiKey = process.env.NEXT_PUBLIC_FLOWCORE_API_KEY;
  if (!apiKey) {
    console.error('Flowcore API key is not configured');
    return { success: false, error: 'API key not configured' };
  }

  const url = `https://webhook.api.flowcore.io/event/aviajatk/4ca9b13b-c4b9-43f0-9a05-d97ef5215561/visitor-log/visitor-action?key=${apiKey}`;
  const payload = {
    visitorType,
    queryType,
    timestamp: new Date().toISOString(),
  };

  console.log('Attempting to log to Flowcore with payload:', payload);

  try {
    console.log('Sending request to Flowcore...');
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    console.log('Flowcore response status:', response.status);
    const responseText = await response.text();
    console.log('Flowcore response body:', responseText);

    if (!response.ok) {
      console.error("Flowcore error response:", responseText);
      throw new Error(`Failed to log to Flowcore: ${response.status} ${responseText}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Error logging to Flowcore:", error);
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Network error - please check your internet connection and Flowcore service availability');
    }
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

// Add read model functionality
export async function getVisitorLogs(startDate?: string, endDate?: string) {
  // Simulate visitor log data
  const logs = [
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

// Add type for visitor log data
export interface VisitorLog {
  visitorType: string;
  queryType: string;
  timestamp: string;
  id: string;
}

// Add type for the read model response
export interface VisitorLogsResponse {
  logs: VisitorLog[];
  total: number;
  page: number;
  pageSize: number;
} 