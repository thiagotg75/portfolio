import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from models import get_db, ContactMessage

router = APIRouter(prefix="/contact", tags=["contact"])


class ContactCreate(BaseModel):
    name: str
    email: str
    subject: str
    message: str


def send_email_notification(data: ContactCreate):
    """Send email notification when a contact message is received."""
    smtp_host = os.getenv("SMTP_HOST")
    smtp_user = os.getenv("SMTP_USER")
    smtp_pass = os.getenv("SMTP_PASSWORD")
    contact_email = os.getenv("CONTACT_EMAIL")

    if not all([smtp_host, smtp_user, smtp_pass, contact_email]):
        print("SMTP not configured — skipping email notification")
        return

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"[Portfolio] Nova mensagem: {data.subject}"
    msg["From"] = smtp_user
    msg["To"] = contact_email

    html = f"""
    <html><body style="font-family: monospace; background: #0a0a0f; color: #f8fafc; padding: 20px;">
      <div style="max-width: 500px; margin: 0 auto; border: 1px solid #1e2030; border-radius: 12px; padding: 24px;">
        <h2 style="color: #7c3aed; margin-bottom: 16px;">Nova mensagem no portfólio</h2>
        <p><strong>De:</strong> {data.name} ({data.email})</p>
        <p><strong>Assunto:</strong> {data.subject}</p>
        <hr style="border-color: #1e2030; margin: 16px 0;">
        <p style="white-space: pre-wrap;">{data.message}</p>
      </div>
    </body></html>
    """
    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP(smtp_host, int(os.getenv("SMTP_PORT", 587))) as server:
            server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, contact_email, msg.as_string())
    except Exception as e:
        print(f"Email error: {e}")


@router.post("/")
def send_contact(data: ContactCreate, db: Session = Depends(get_db)):
    # Save to DB
    msg = ContactMessage(
        name=data.name,
        email=data.email,
        subject=data.subject,
        message=data.message,
    )
    db.add(msg)
    db.commit()

    # Send email notification (non-blocking fail)
    try:
        send_email_notification(data)
    except Exception:
        pass

    return {"status": "ok", "message": "Mensagem recebida com sucesso!"}


@router.get("/messages")
def list_messages(db: Session = Depends(get_db)):
    """Admin endpoint to list all messages."""
    messages = db.query(ContactMessage).order_by(
        ContactMessage.created_at.desc()
    ).all()
    return [
        {
            "id": m.id,
            "name": m.name,
            "email": m.email,
            "subject": m.subject,
            "message": m.message,
            "read": m.read,
            "created_at": m.created_at.isoformat(),
        }
        for m in messages
    ]
