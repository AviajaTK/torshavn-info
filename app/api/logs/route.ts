import { NextResponse } from 'next/server';
import { getLogs } from '@/app/utils/storage';

// In-memory storage for visitor logs (shared with /api/log/route.ts)
declare const visitorLogs: Array<{
  visitorType: string;
  category: string;
  timestamp: string;
}>;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const filteredLogs = getLogs(startDate, endDate);
    return NextResponse.json(filteredLogs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch visitor logs' },
      { status: 500 }
    );
  }
}
