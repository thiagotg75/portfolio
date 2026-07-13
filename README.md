# 🚀 Portfolio Full-Stack

> Portfólio profissional construído com Next.js 14, TypeScript, Tailwind CSS e backend Python/FastAPI.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.12-yellow?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-green?style=flat-square&logo=fastapi)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38BDF8?style=flat-square&logo=tailwind-css)

---

## ✨ Features

- **Hero animado** com efeito de digitação e terminal interativo
- **Skills** com barras de progresso animadas
- **Projetos** carregados dinamicamente do backend
- **Formulário de contato** com envio de email (SMTP)
- **Design responsivo** — mobile-first
- **Dark theme** elegante com paleta roxa/ciano
- **SEO otimizado** com metadata do Next.js
- **Backend REST** completo com FastAPI + PostgreSQL

---

## 🗂 Estrutura do Projeto

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Estilos globais
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navegação com scroll ativo
│   │   │   └── Footer.tsx      # Rodapé com links sociais
│   │   └── sections/
│   │       ├── HeroSection.tsx     # Hero com typing effect
│   │       ├── AboutSection.tsx    # Sobre mim + stats
│   │       ├── SkillsSection.tsx   # Skills com progress bars
│   │       ├── ProjectsSection.tsx # Projetos do backend
│   │       └── ContactSection.tsx  # Formulário de contato
│   ├── lib/
│   │   └── utils.ts            # Helpers e config
│   └── types/
│       └── index.ts            # TypeScript types
├── backend/
│   ├── main.py                 # FastAPI app entry point
│   ├── models/
│   │   ├── database.py         # SQLAlchemy setup
│   │   └── models.py           # DB models
│   ├── routes/
│   │   ├── projects.py         # CRUD projetos
│   │   ├── contact.py          # Formulário + email
│   │   └── skills.py           # Skills
│   ├── seed.py                 # Popular banco com dados
│   ├── requirements.txt
│   └── Dockerfile
├── docker-compose.yml          # Stack completa
├── Dockerfile.frontend
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Rodando o Projeto

### Opção 1: Docker Compose (recomendado)

```bash
# Subir tudo com um comando
docker-compose up -d

# Acessar
# Frontend: http://localhost:3000
# API:      http://localhost:8000
# Docs:     http://localhost:8000/docs
```

### Opção 2: Desenvolvimento local

#### Frontend (Next.js)

```bash
# Instalar dependências
npm install

# Variáveis de ambiente
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Rodar em dev
npm run dev
```

Acesse: http://localhost:3000

#### Backend (Python/FastAPI)

```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis
cp .env.example .env
# Edite o .env com suas configurações

# Popular banco de dados
python seed.py

# Rodar o servidor
uvicorn main:app --reload --port 8000
```

Acesse: http://localhost:8000/docs

---

## ⚙️ Configuração

### Frontend — `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend — `backend/.env`

```env
DATABASE_URL=postgresql://user:password@localhost:5432/portfolio
SECRET_KEY=sua-chave-secreta
ALLOWED_ORIGINS=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu@gmail.com
SMTP_PASSWORD=sua-senha-de-app
CONTACT_EMAIL=seu@email.com
```

> **SMTP com Gmail:** Crie uma "Senha de App" em myaccount.google.com/security

---

## 🛠 Personalizando

### Trocar suas informações

1. **Nome e bio** — edite `src/components/sections/HeroSection.tsx` e `AboutSection.tsx`
2. **Links sociais** — busque por `seuusername` em todos os arquivos e substitua
3. **Projetos** — adicione via API (`POST /api/projects`) ou edite o `seed.py`
4. **Skills** — edite o array em `SkillsSection.tsx` ou use a API
5. **Cores** — altere em `tailwind.config.ts`

### API Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/projects` | Listar projetos |
| GET | `/api/projects?featured=true` | Apenas destaques |
| POST | `/api/projects` | Criar projeto |
| PUT | `/api/projects/{id}` | Atualizar projeto |
| DELETE | `/api/projects/{id}` | Deletar projeto |
| GET | `/api/skills` | Listar skills |
| POST | `/api/skills` | Criar skill |
| POST | `/api/contact` | Enviar mensagem |
| GET | `/api/contact/messages` | Ver mensagens (admin) |

---

## 🚢 Deploy

### Frontend → Vercel

```bash
npm install -g vercel
vercel --prod
# Configure NEXT_PUBLIC_API_URL para a URL do seu backend
```

### Backend → Railway / Render / VPS

```bash
# Railway (recomendado)
railway init
railway up

# Ou Docker em qualquer VPS
docker-compose up -d --build
```

---

## 📄 Licença

MIT License — use, modifique e distribua à vontade!

---

> Feito com 💜 — Sinta-se livre para usar como base para o seu portfólio!
