import aiosmtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from jinja2 import Template
from typing import List, Optional
from ..core.config import settings


class EmailService:
    """Service for sending emails via SMTP."""
    
    @staticmethod
    async def send_email(
        to_email: str,
        subject: str,
        html_content: str,
        text_content: Optional[str] = None
    ) -> bool:
        """
        Send an email.
        
        Args:
            to_email: Recipient email address
            subject: Email subject
            html_content: HTML email content
            text_content: Plain text email content (optional)
        
        Returns:
            True if sent successfully, False otherwise
        """
        if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
            print("SMTP not configured, skipping email send")
            return False
        
        try:
            # Create message
            message = MIMEMultipart('alternative')
            message['From'] = f"{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>"
            message['To'] = to_email
            message['Subject'] = subject
            
            # Add text and HTML parts
            if text_content:
                part1 = MIMEText(text_content, 'plain')
                message.attach(part1)
            
            part2 = MIMEText(html_content, 'html')
            message.attach(part2)
            
            # Send email
            await aiosmtplib.send(
                message,
                hostname=settings.SMTP_HOST,
                port=settings.SMTP_PORT,
                username=settings.SMTP_USER,
                password=settings.SMTP_PASSWORD,
                start_tls=True
            )
            
            return True
            
        except Exception as e:
            print(f"Error sending email: {str(e)}")
            return False
    
    @staticmethod
    async def send_booking_confirmation(
        to_email: str,
        user_name: str,
        booking_id: str,
        service_name: str,
        scheduled_at: str,
        price: str
    ) -> bool:
        """Send booking confirmation email."""
        subject = "Booking Confirmation - PhotoStudio"
        
        html_template = """
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                .detail-label { font-weight: bold; color: #667eea; }
                .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
                .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>🎉 Booking Confirmed!</h1>
                </div>
                <div class="content">
                    <p>Dear {{ user_name }},</p>
                    <p>Thank you for booking with PhotoStudio! Your booking has been confirmed.</p>
                    
                    <div class="booking-details">
                        <h3>Booking Details</h3>
                        <div class="detail-row">
                            <span class="detail-label">Booking ID:</span>
                            <span>{{ booking_id }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Service:</span>
                            <span>{{ service_name }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Scheduled:</span>
                            <span>{{ scheduled_at }}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Price:</span>
                            <span>{{ price }}</span>
                        </div>
                    </div>
                    
                    <p>We're excited to capture your special moments! If you have any questions, please don't hesitate to contact us.</p>
                    
                    <div class="footer">
                        <p>PhotoStudio Team<br>
                        Email: {{ from_email }}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
        """
        
        template = Template(html_template)
        html_content = template.render(
            user_name=user_name,
            booking_id=booking_id,
            service_name=service_name,
            scheduled_at=scheduled_at,
            price=price,
            from_email=settings.SMTP_FROM_EMAIL
        )
        
        return await EmailService.send_email(to_email, subject, html_content)
    
    @staticmethod
    async def send_booking_status_update(
        to_email: str,
        user_name: str,
        booking_id: str,
        status: str
    ) -> bool:
        """Send booking status update email."""
        subject = f"Booking {status.title()} - PhotoStudio"
        
        status_messages = {
            'confirmed': 'Your booking has been confirmed!',
            'rejected': 'Unfortunately, your booking request has been declined.',
            'cancelled': 'Your booking has been cancelled.',
            'completed': 'Your photoshoot has been completed!'
        }
        
        message = status_messages.get(status, f'Your booking status has been updated to {status}.')
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Booking Update</h2>
                <p>Dear {user_name},</p>
                <p>{message}</p>
                <p><strong>Booking ID:</strong> {booking_id}</p>
                <p>Best regards,<br>PhotoStudio Team</p>
            </div>
        </body>
        </html>
        """
        
        return await EmailService.send_email(to_email, subject, html_content)
    
    @staticmethod
    async def send_welcome_email(to_email: str, user_name: str) -> bool:
        """Send welcome email to new users."""
        subject = "Welcome to PhotoStudio!"
        
        html_content = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Welcome to PhotoStudio! 📸</h2>
                <p>Dear {user_name},</p>
                <p>Thank you for joining PhotoStudio! We're thrilled to have you as part of our community.</p>
                <p>You can now:</p>
                <ul>
                    <li>Browse our photography services</li>
                    <li>Book photoshoots online</li>
                    <li>View our portfolio gallery</li>
                    <li>Manage your bookings</li>
                </ul>
                <p>If you have any questions, feel free to reach out to us.</p>
                <p>Best regards,<br>PhotoStudio Team</p>
            </div>
        </body>
        </html>
        """
        
        return await EmailService.send_email(to_email, subject, html_content)
