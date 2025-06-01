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
  // TODO: Replace the placeholder below with your actual webhook URL from Flowcore
  const url = "https://webhook.api.flowcore.io/event/aviajatk/4ca9b13b-c4b9-43f0-9a05-d97ef5215561/visitor-log/visitor-action?key=022df4de-5279-4b56-9d87-05ad81548e7c";
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
  const baseUrl = "https://api.flowcore.io/read/aviajatk/visitor-logs";
  const queryParams = new URLSearchParams();
  
  if (startDate) {
    queryParams.append('startDate', startDate);
  }
  if (endDate) {
    queryParams.append('endDate', endDate);
  }

  const url = `${baseUrl}?${queryParams.toString()}`;

  try {
    console.log('Attempting to fetch visitor logs from:', url);
    // Debug: Log the API key (remove after debugging!)
    console.log('FLOWCORE_API_KEY_XYZ123:', process.env.FLOWCORE_API_KEY_XYZ123);
    // --- REAL FLOWCORE API CALL ---
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FLOWCORE_API_KEY_XYZ123}`,
      },
    });

    console.log('Flowcore read model response status:', response.status);
    const data = await response.json();
    console.log('Flowcore read model response:', data);

    if (!response.ok) {
      throw new Error(`Failed to fetch visitor logs: ${response.status} ${JSON.stringify(data)}`);
    }

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error("Error fetching visitor logs:", error);
    return {
      success: false,
      error: error instanceof Error ? (error.stack || error.message) : JSON.stringify(error)
    };
  }
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