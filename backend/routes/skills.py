from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from models import get_db, Skill

router = APIRouter(prefix="/skills", tags=["skills"])


class SkillCreate(BaseModel):
    name: str
    category: str
    proficiency: float
    icon: Optional[str] = None


@router.get("/")
def list_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).order_by(Skill.category, Skill.proficiency.desc()).all()
    return [
        {
            "id": s.id,
            "name": s.name,
            "category": s.category,
            "proficiency": s.proficiency,
            "icon": s.icon,
        }
        for s in skills
    ]


@router.post("/", status_code=201)
def create_skill(data: SkillCreate, db: Session = Depends(get_db)):
    s = Skill(**data.model_dump())
    db.add(s)
    db.commit()
    db.refresh(s)
    return {"id": s.id, **data.model_dump()}
