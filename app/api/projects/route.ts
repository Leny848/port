import { NextResponse } from "next/server";
import { get, set } from "@vercel/edge-config";

const PROJECTS_KEY = "portfolio_projects";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

async function getProjects(): Promise<any[]> {
  try {
    const data = await get(PROJECTS_KEY);
    // Ensure we always return an array
    if (Array.isArray(data)) {
      return data;
    }
    return [];
  } catch (error) {
    console.error("Error reading projects from Edge Config:", error);
    return [];
  }
}

async function saveProjects(projects: any[]) {
  try {
    await set(PROJECTS_KEY, projects);
  } catch (error) {
    console.error("Error saving projects to Edge Config:", error);
    throw error;
  }
}

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const projects = await getProjects();

    const newProject = {
      id: generateId(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    projects.push(newProject);
    await saveProjects(projects);

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const projects = await getProjects();

    const index = projects.findIndex((p: any) => p.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[index] = { ...projects[index], ...body, updatedAt: new Date().toISOString() };
    await saveProjects(projects);

    return NextResponse.json(projects[index]);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    let projects = await getProjects();

    projects = projects.filter((p: any) => p.id !== body.id);
    await saveProjects(projects);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
