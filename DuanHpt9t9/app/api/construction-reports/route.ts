import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for construction reports (in production, use a database)
const reportsStorage = new Map<string, any>();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('reportId');
    
    if (reportId) {
      // Get specific report
      const report = reportsStorage.get(reportId);
      if (report) {
        return NextResponse.json(report);
      } else {
        return NextResponse.json({ error: 'Report not found' }, { status: 404 });
      }
    } else {
      // Get all reports
      const allReports = Array.from(reportsStorage.entries()).map(([id, data]) => ({
        id,
        ...data
      }));
      return NextResponse.json(allReports);
    }
  } catch (error) {
    console.error('Error in GET /api/construction-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, data } = body;
    
    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }
    
    // Save report data
    reportsStorage.set(reportId, {
      ...data,
      lastUpdated: new Date().toISOString()
    });
    
    console.log(`Saved report ${reportId}:`, data);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Report saved successfully',
      reportId 
    });
  } catch (error) {
    console.error('Error in POST /api/construction-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { reportId, data } = body;
    
    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }
    
    // Update existing report
    const existingReport = reportsStorage.get(reportId);
    if (!existingReport) {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
    
    const updatedReport = {
      ...existingReport,
      ...data,
      lastUpdated: new Date().toISOString()
    };
    
    reportsStorage.set(reportId, updatedReport);
    
    console.log(`Updated report ${reportId}:`, updatedReport);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Report updated successfully',
      reportId 
    });
  } catch (error) {
    console.error('Error in PUT /api/construction-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get('reportId');
    
    if (!reportId) {
      return NextResponse.json({ error: 'Report ID is required' }, { status: 400 });
    }
    
    if (reportsStorage.has(reportId)) {
      reportsStorage.delete(reportId);
      return NextResponse.json({ 
        success: true, 
        message: 'Report deleted successfully' 
      });
    } else {
      return NextResponse.json({ error: 'Report not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error in DELETE /api/construction-reports:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}