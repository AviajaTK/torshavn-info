import { NextResponse } from 'next/server';
import { getVisitorLogs } from '@/app/utils/flowcore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;

    const logs = await getVisitorLogs(startDate, endDate);
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}
