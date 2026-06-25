import { NextResponse } from 'next/server'
import { getProjects, saveProjects } from '@/lib/redis'

export async function GET() {
  try {
    const projects = await getProjects()
    return NextResponse.json({ projects: projects || [] })
  } catch (error) {
    console.error('GET /api/projects error:', error)
    return NextResponse.json({ projects: [], error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const projects = await getProjects()
    const newProject = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    }
    const updated = [...projects, newProject]
    await saveProjects(updated)
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    console.error('POST /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const projects = await getProjects()
    const updated = projects.map((p: any) => p.id === body.id ? { ...p, ...body } : p)
    await saveProjects(updated)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PUT /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 })
    const projects = await getProjects()
    const updated = projects.filter((p: any) => p.id !== id)
    await saveProjects(updated)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE /api/projects error:', error)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
