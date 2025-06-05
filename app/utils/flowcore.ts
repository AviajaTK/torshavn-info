// app/utils/flowcore.ts

const NETLIFY_API_URL = process.env.NEXT_PUBLIC_NETLIFY_API_URL || 'https://ubiquitous-clafoutis-7708b4.netlify.app';

export async function logVisitorInfo(visitorData: {
  visitorType: string;
  category: string;
  timestamp: string;
}) {
  try {
    const response = await fetch(`${NETLIFY_API_URL}/api/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorData),
    });

    if (!response.ok) {
      throw new Error('Failed to log visitor data');
    }

    return { success: true };
  } catch (error) {
    console.error('Error logging visitor data:', error);
    return { success: false, error: 'Failed to log visitor data' };
  }
}

export async function getVisitorLogs(startDate?: string, endDate?: string) {
  try {
    const url = new URL(`${NETLIFY_API_URL}/api/logs`);
    if (startDate) url.searchParams.append('startDate', startDate);
    if (endDate) url.searchParams.append('endDate', endDate);

    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error('Failed to fetch visitor logs');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    return [];
  }
}
