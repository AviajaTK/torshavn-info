import { NextResponse } from 'next/server';
import { logVisitorQuery } from '@/app/utils/flowcore';

// Define the types for our logging data
type VisitorType = 'Føroyingur' | 'Útlendingur';
type QueryType = 
  | 'TK Buss'
  | 'Kommunalar Tænastur'
  | 'SSL'
  | 'Kunning í TK'
  | 'Kunning uttanfyri TK'
  | 'Mist & Funnið'
  | 'Annað'
  | 'Tiltøk'
  | 'Tax Free'
  | 'Børn & Ung (0-17 ár)'
  | 'Ung ferðafólk (18-29 ár)'
  | 'Familjur & Pør (30-44 ár)'
  | 'Empty nesters (45-59 ár)'
  | 'Eftirlønarferðafólk (60+ ár)';

interface LogData {
  visitorType: VisitorType;
  queryType: QueryType;
  timestamp: string;
}

export async function POST(request: Request) {
  try {
    const data: LogData = await request.json();
    
    // Log to Flowcore
    const result = await logVisitorQuery(data.visitorType, data.queryType);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to log to Flowcore');
    }

    return NextResponse.json(
      { success: true, message: 'Query logged successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging query:', error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to log query' },
      { status: 500 }
    );
  }
} 