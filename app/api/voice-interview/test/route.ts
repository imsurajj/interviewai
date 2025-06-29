import { NextRequest, NextResponse } from 'next/server'

const OMNIDIM_API_KEY = process.env.OMNIDIM_API_KEY;
if (!OMNIDIM_API_KEY) {
  throw new Error('OMNIDIM_API_KEY is not set in environment variables.');
}
const OMNIDIM_BASE_URL = "https://backend.omnidim.io/api/v1"

export async function GET(request: NextRequest) {
  try {
    const results: any = {}
    
    // Test different endpoints to find the correct ones
    const endpointsToTest = [
      '/agents',
      '/agent', 
      '/agents/list',
      '/agent/list',
      '/calls',
      '/call',
      '/calls/dispatch',
      '/call/dispatch'
    ]

    for (const endpoint of endpointsToTest) {
      try {
        const response = await fetch(`${OMNIDIM_BASE_URL}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${OMNIDIM_API_KEY}`,
            'Content-Type': 'application/json'
          }
        })

        results[endpoint] = {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          headers: Object.fromEntries(response.headers.entries())
        }

        if (response.ok) {
          try {
            const data = await response.json()
            results[endpoint].data = data
          } catch (e) {
            results[endpoint].data = "Could not parse JSON"
          }
        }
      } catch (error) {
        results[endpoint] = {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }

    return NextResponse.json({
      success: true,
      results,
      apiKey: OMNIDIM_API_KEY.substring(0, 20) + '...',
      baseUrl: OMNIDIM_BASE_URL
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { error: 'Failed to test API endpoints' },
      { status: 500 }
    )
  }
} 