import { NextResponse } from 'next/server';
import { getVisitorLogs } from '@/app/utils/flowcore';

export async function GET(request: Request) {
  try {
    // Get query parameters from the request URL
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    // Fetch logs from Flowcore
    const result = await getVisitorLogs(startDate, endDate);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error },
        { status: 500 }
      );
    }

    // Return the data in the expected format
    return NextResponse.json({
      success: true,
      logs: result.data.logs || [],
      total: result.data.total || 0,
      page: result.data.page || 1,
      pageSize: result.data.pageSize || 10
    });
  } catch (error) {
    console.error('Error fetching visitor logs:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to fetch visitor logs' 
      },
      { status: 500 }
    );
  }
} 