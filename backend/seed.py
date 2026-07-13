"""
Script para popular o banco de dados com dados de exemplo.
Execute: python seed.py
"""
import json
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from models import Base, engine, SessionLocal, Project, Skill

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Seed projects
projects = [
    {
        "title": "E-Commerce Full-Stack",
        "description": "Plataforma de e-commerce completa com carrinho, pagamentos Stripe e painel admin. Frontend em Next.js 14 com App Router, backend em FastAPI com PostgreSQL.",
        "tech": ["Next.js", "FastAPI", "PostgreSQL", "Stripe", "Docker"],
        "github_url": "https://github.com/seuusername/ecommerce",
        "live_url": "https://ecommerce-demo.vercel.app",
        "featured": True,
    },
    {
        "title": "Task Manager com IA",
        "description": "Gerenciador de tarefas inteligente com priorização automática via OpenAI e notificações em tempo real.",
        "tech": ["React", "Python", "OpenAI", "WebSockets", "Redis"],
        "github_url": "https://github.com/seuusername/taskmanager",
        "featured": True,
    },
    {
        "title": "Dashboard Analytics",
        "description": "Dashboard de analytics em tempo real com gráficos interativos e exportação de relatórios.",
        "tech": ["Next.js", "TypeScript", "Recharts", "FastAPI"],
        "github_url": "https://github.com/seuusername/dashboard",
        "live_url": "https://dashboard-demo.vercel.app",
        "featured": False,
    },
    {
        "title": "API de Autenticação",
        "description": "Sistema completo de autenticação JWT, OAuth2, 2FA com documentação Swagger automática.",
        "tech": ["FastAPI", "SQLAlchemy", "PostgreSQL", "JWT"],
        "github_url": "https://github.com/seuusername/auth-api",
        "featured": False,
    },
]

skills = [
    {"name": "React / Next.js", "category": "Frontend", "proficiency": 95},
    {"name": "TypeScript", "category": "Frontend", "proficiency": 88},
    {"name": "Tailwind CSS", "category": "Frontend", "proficiency": 92},
    {"name": "Python / FastAPI", "category": "Backend", "proficiency": 90},
    {"name": "PostgreSQL", "category": "Backend", "proficiency": 85},
    {"name": "Docker", "category": "DevOps", "proficiency": 78},
    {"name": "Git / GitHub", "category": "DevOps", "proficiency": 95},
]

# Insert if empty
if db.query(Project).count() == 0:
    for p in projects:
        obj = Project(
            title=p["title"],
            description=p["description"],
            tech=json.dumps(p["tech"]),
            github_url=p["github_url"],
            live_url=p.get("live_url"),
            featured=p["featured"],
        )
        db.add(obj)
    print(f"✓ {len(projects)} projetos inseridos")

if db.query(Skill).count() == 0:
    for s in skills:
        db.add(Skill(**s))
    print(f"✓ {len(skills)} skills inseridas")

db.commit()
db.close()
print("✓ Banco populado com sucesso!")
