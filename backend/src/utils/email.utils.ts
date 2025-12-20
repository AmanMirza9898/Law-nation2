import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE === "true" || true, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

// Main sendEmail function
export async function sendEmail(options: EmailOptions) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env file");
    }
    await transporter.sendMail({
      from: `"Law Nation" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
    console.log(`Email sent successfully to ${options.to}`);
  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
}

// --- AUTH EMAILS ---
// --- PROFESSIONAL AUTH EMAILS (Signup/Login) ---
// --- RED & WHITE PROFESSIONAL THEME ---

// --- RED & WHITE PROFESSIONAL THEME (Signup Only) ---
export async function sendAuthNotification(userEmail: string, userName: string) {
  const subject = "Welcome to Law Nation! ⚖️";
  
  const htmlContent = `
    <div style="font-family: 'Helvetica', Arial, sans-serif; max-width: 600px; margin: auto; border: 2px solid #d32f2f; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
      
      <div style="background-color: #d32f2f; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 32px; letter-spacing: 2px; font-weight: bold; text-transform: uppercase;">LAW NATION</h1>
        <p style="color: #ffcdd2; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;">THE ULTIMATE LEGAL RESEARCH PORTAL</p>
      </div>
      
      <div style="padding: 40px 30px; color: #333; line-height: 1.8; text-align: center;">
        <h2 style="color: #d32f2f; font-size: 26px; margin-bottom: 20px;">Registration Successful</h2>
        
        <p style="font-size: 17px; color: #444;">
          We are honored to welcome you to <b>Law Nation Prime Times</b>. Your gateway to premium legal scholarships and expert research analysis is now active.
        </p>
        
        <div style="margin: 35px 0;">
          <a href="http://localhost:3000/law/home" style="background-color: #d32f2f; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">ACCESS PORTAL</a>
        </div>
        
        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;">
        
        <div style="font-size: 13px; color: #777;">
          <p style="margin: 0;">Regards,</p>
          <p style="margin: 5px 0; font-weight: bold; color: #d32f2f;">Executive Team, Law Nation</p>
        </div>
      </div>

      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #eeeeee;">
        Law Nation &copy; 2025 | New Delhi, India | Legal Scholarship Excellence
      </div>
    </div>
  `;

  return sendEmail({ to: userEmail, subject, html: htmlContent });
}

// --- ARTICLE EMAILS (RED THEME) ---

export async function sendArticleSubmissionConfirmation(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #d32f2f; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #d32f2f; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 22px;">LAW NATION</h1>
      </div>
      <div style="padding: 30px;">
        <h3 style="color: #d32f2f; border-bottom: 2px solid #f44336; padding-bottom: 10px;">Submission Received</h3>
        <p>Your article <b>"${articleTitle}"</b> has been received for review.</p>
        <p style="font-size: 14px; color: #666;"><b>Article ID:</b> ${articleId}</p>
      </div>
    </div>`;
  return sendEmail({ to: authorEmail, subject: "Article Received", html: htmlContent });
}

export async function sendAuthorAssignmentNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const htmlContent = `
    <div style="font-family: 'Georgia', serif; max-width: 600px; margin: auto; border: 1px solid #d4af37; border-radius: 8px; overflow: hidden;">
      <div style="background-color: #1a1a1a; padding: 20px; text-align: center;">
        <h1 style="color: #d4af37; margin: 0; font-size: 22px;">LAW NATION</h1>
      </div>
      <div style="padding: 30px; text-align: center;">
        <h2 style="color: #1a1a1a;">Editor Assigned</h2>
        <p style="font-size: 16px;">Your article <b>"${articleTitle}"</b> has been successfully assigned to an editor for formal review.</p>
        <p style="color: #555;">You will be notified once the review process is complete.</p>
      </div>
    </div>`;

  return sendEmail({ to: authorEmail, subject: "Status Update: Editor Assigned", html: htmlContent });
}

export async function sendEditorAssignmentNotification(editorEmail: string, editorName: string, articleTitle: string, authorName: string, category: string, articleId: string) {
  return sendEmail({
    to: editorEmail,
    subject: "New Review Task Assigned",
    html: `<h2>New Assignment</h2><p>Editor ${editorName}, you have a new article "${articleTitle}" from ${authorName} to review.</p>`,
  });
}

export async function sendArticleApprovalNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  return sendEmail({
    to: authorEmail,
    subject: "Article Approved and Published",
    html: `<h2>Congratulations!</h2><p>Dear ${authorName}, your article "<strong>${articleTitle}</strong>" has been published.</p>`,
  });
}

export async function sendArticleCorrectionNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string, editorComments?: string) {
  return sendEmail({
    to: authorEmail,
    subject: "Article Correction Required",
    html: `<h2>Correction Needed</h2><p>Your article "${articleTitle}" needs updates.</p>${editorComments ? `<p>Comments: ${editorComments}</p>` : ""}`,
  });
}