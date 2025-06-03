import { NextResponse } from 'next/server';
import { getVisitorLogs } from '@/app/utils/flowcore';

export async function GET() {
  try {
    const result = await getVisitorLogs();
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
} 