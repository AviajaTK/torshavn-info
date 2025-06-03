import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.FLOWCORE_API_KEY_XYZ123;
  const url = 'https://api.flowcore.io/read/aviajatk/visitor-logs';

  if (!apiKey) {
    return NextResponse.json({ success: false, error: 'API key is missing' }, { status: 500 });
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    const data = await response.text();

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      body: data,
    }, { status: response.status });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
    }, { status: 500 });
  }
} 