// app/utils/flowcore.ts

// Flowcore webhook URL for logging visitor data
const FLOWCORE_WEBHOOK_URL = process.env.NEXT_PUBLIC_FLOWCORE_WEBHOOK_URL || 'https://webhook.api.flowcore.io/event/aviajatk/4ca9b13b-c4b9-43f0-9a05-d97ef5215561/visitor-log/visitor-action?key=00707fd0-4637-488b-997b-a8dad6cef0ec';

// Flowcore API URL for reading data (we'll need to get this from your Flowcore dashboard)
const FLOWCORE_API_URL = process.env.NEXT_PUBLIC_FLOWCORE_API_URL || 'https://api.flowcore.io';
const FLOWCORE_API_KEY = process.env.NEXT_PUBLIC_FLOWCORE_API_KEY;

export async function logVisitorInfo(visitorData: {
  visitorType: string;
  category: string;
  timestamp: string;
}) {
  try {
    console.log('Attempting to log to Flowcore with payload:', visitorData);
    
    const response = await fetch(FLOWCORE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    });

    console.log('Flowcore response status:', response.status);
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.log('Flowcore response body:', errorBody);
      throw new Error(`Failed to log to Flowcore: ${response.status} ${errorBody}`);
    }

    console.log('Successfully logged to Flowcore');
    return { success: true };
  } catch (error) {
    console.error('Error logging to Flowcore:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to log visitor data' };
  }
}

export async function getVisitorLogs(startDate?: string, endDate?: string) {
  try {
    // For now, we'll use a mock implementation since we need the Data Core API endpoint
    // This will be replaced once you provide the Data Core API URL
    
    console.log('Fetching visitor logs from Flowcore...');
    
    // Mock data for demonstration - replace this with actual Flowcore API call
    const mockLogs = [
      {
        visitorType: 'Borgari',
        category: 'Kunning uttanfyri TK',
        timestamp: '2025-01-27T10:30:00.000Z'
      },
      {
        visitorType: 'Ferðafólk',
        category: 'Aldursbólkur 18-25',
        timestamp: '2025-01-27T11:15:00.000Z'
      },
      {
        visitorType: 'Borgari',
        category: 'Kunning innanfyri TK',
        timestamp: '2025-01-27T12:00:00.000Z'
      }
    ];

    // Filter by date if provided
    let filteredLogs = mockLogs;
    if (startDate || endDate) {
      filteredLogs = mockLogs.filter(log => {
        const logDate = new Date(log.timestamp);
        if (startDate && new Date(startDate) > logDate) return false;
        if (endDate && new Date(endDate) < logDate) return false;
        return true;
      });
    }

    return filteredLogs;
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    return [];
  }
}

// TODO: Replace this function with actual Flowcore Data Core API call
// You'll need to provide:
// 1. Data Core API endpoint URL
// 2. API key or authentication method
// 3. The correct path to your visitor logs in the Data Core
async function getVisitorLogsFromFlowcore(startDate?: string, endDate?: string) {
  // This is where we'll implement the actual Flowcore API call
  // Example structure:
  /*
  const response = await fetch(`${FLOWCORE_API_URL}/datacore/your-datacore-id/records`, {
    headers: {
      'Authorization': `Bearer ${FLOWCORE_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch from Flowcore Data Core');
  }
  
  return await response.json();
  */
}
