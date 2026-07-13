import json
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from models import get_db, Project

router = APIRouter(prefix="/projects", tags=["projects"])


class ProjectSchema(BaseModel):
    id: int
    title: str
    description: str
    tech: list[str]
    github_url: str
    live_url: Optional[str] = None
    featured: bool
    image_url: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True


class ProjectCreate(BaseModel):
    title: str
    description: str
    tech: list[str]
    github_url: str
    live_url: Optional[str] = None
    featured: bool = False
    image_url: Optional[str] = None


def project_to_schema(p: Project) -> dict:
    return {
        "id": p.id,
        "title": p.title,
        "description": p.description,
        "tech": json.loads(p.tech) if isinstance(p.tech, str) else p.tech,
        "github_url": p.github_url,
        "live_url": p.live_url,
        "featured": p.featured,
        "image_url": p.image_url,
        "created_at": p.created_at.isoformat() if p.created_at else "",
    }


@router.get("/")
def list_projects(
    featured: Optional[bool] = None,
    db: Session = Depends(get_db)
):
    query = db.query(Project)
    if featured is not None:
        query = query.filter(Project.featured == featured)
    projects = query.order_by(Project.created_at.desc()).all()
    return [project_to_schema(p) for p in projects]


@router.get("/{project_id}")
def get_project(project_id: int, db: Session = Depends(get_db)):
    p = db.query(Project).filter(Project.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    return project_to_schema(p)


@router.post("/", status_code=201)
def create_project(data: ProjectCreate, db: Session = Depends(get_db)):
    p = Project(
        title=data.title,
        description=data.description,
        tech=json.dumps(data.tech),
        github_url=data.github_url,
        live_url=data.live_url,
        featured=data.featured,
        image_url=data.image_url,
    )
    db.add(p)
    db.commit()
    db.refresh(p)
    return project_to_schema(p)


@router.put("/{project_id}")
def update_project(
    project_id: int, data: ProjectCreate, db: Session = Depends(get_db)
):
    p = db.query(Project).filter(Project.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    p.title = data.title
    p.description = data.description
    p.tech = json.dumps(data.tech)
    p.github_url = data.github_url
    p.live_url = data.live_url
    p.featured = data.featured
    p.image_url = data.image_url
    db.commit()
    db.refresh(p)
    return project_to_schema(p)


@router.delete("/{project_id}", status_code=204)
def delete_project(project_id: int, db: Session = Depends(get_db)):
    p = db.query(Project).filter(Project.id == project_id).first()
    if not p:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(p)
    db.commit()
