// app/api/log/route.ts

import { NextResponse } from 'next/server';
import { addLog, getLogs } from '@/app/utils/storage';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate the data
    if (!data.visitorType || !data.category || !data.timestamp) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Add the log entry
    addLog(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to log visitor data' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(getLogs());
}
