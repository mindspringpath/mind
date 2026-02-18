import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    message: 'Contact Form Test API',
    endpoint: '/api/contact',
    method: 'POST',
    required_fields: {
      fullName: 'string (required)',
      email: 'string (required)', 
      phone: 'string (optional)',
      message: 'string (required)'
    },
    usage: 'POST to /api/contact with JSON body containing the fields above'
  })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    return NextResponse.json({ 
      ok: true, 
      message: 'Contact form test successful',
      received: body,
      timestamp: new Date().toISOString()
    })
  } catch (error: any) {
    return NextResponse.json({ 
      ok: false, 
      error: 'Test failed',
      details: error?.message || 'Unknown error'
    }, { status: 400 })
  }
}
