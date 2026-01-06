import { Resend } from "resend";
import dotenv from "dotenv";
import { generateOtpEmailHtml } from "@/templates/email/auth/otp.template.js";
import { generateWelcomeEmailHtml } from "@/templates/email/auth/welcome.template.js";
import { generateArticleSubmissionHtml } from "@/templates/email/article/submission.template.js";
import { generateArticleVerificationHtml } from "@/templates/email/article/verification.template.js";
import { generateArticleVerificationCodeHtml } from "@/templates/email/article/verification-code.template.js";
import { generateAuthorAssignmentHtml } from "@/templates/email/article/assignment.template.js";
import { generateArticleApprovalHtml } from "@/templates/email/article/approval.template.js";
import { generateArticleCorrectionHtml } from "@/templates/email/article/correction.template.js";
import { generateEditorInvitationHtml } from "@/templates/email/editor/invitation.template.js";
import { generateEditorTaskAssignedHtml } from "@/templates/email/editor/task-assigned.template.js";
import { generateCoAuthorNotificationHtml } from "@/templates/email/article/coauthor-notification.template.js";
import { generateArticlePublishedHtml } from "@/templates/email/article/published.template.js";
import { generateEditorApprovalNotificationHtml } from "@/templates/email/admin/editor-approval.template.js";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);

// Main sendEmail function
export async function sendEmail(options: EmailOptions) {
  try {
    console.log(`📧 [Email] Attempting to send email to: ${options.to}`);
    console.log(`📧 [Email] Subject: ${options.subject}`);
    
    if (!process.env.RESEND_API_KEY) {
      console.error("❌ [Email] RESEND_API_KEY is missing in .env file");
      throw new Error("Missing RESEND_API_KEY in .env file");
    }

    const fromAddress = process.env.SMTP_FROM || "Law Nation <onboarding@resend.dev>";
    console.log(`📧 [Email] From address: ${fromAddress}`);
    
    const { data, error } = await resend.emails.send({
      from: fromAddress,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    if (error) {
      console.error("❌ [Email] Resend API error:", {
        message: error.message,
        name: error.name,
        statusCode: (error as any).statusCode,
        details: error
      });
      throw error;
    }

    console.log(`✅ [Email] Successfully sent to ${options.to}`);
    console.log(`📧 [Email] Resend email ID: ${data?.id}`);
    return data;
  } catch (error) {
    console.error("❌ [Email] Failed to send email:", {
      to: options.to,
      subject: options.subject,
      error: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

// --- AUTH EMAILS ---

export async function sendOtpEmail(userEmail: string, otp: string) {
  const { subject, html } = generateOtpEmailHtml({ otp });
  return sendEmail({ to: userEmail, subject, html });
}

export async function sendAuthNotification(userEmail: string, userName: string) {
  const { subject, html } = generateWelcomeEmailHtml({
    userName,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  });
  return sendEmail({ to: userEmail, subject, html });
}

// --- ARTICLE EMAILS ---

export async function sendArticleSubmissionConfirmation(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateArticleSubmissionHtml({
    authorName,
    articleTitle,
    articleId
  });
  return sendEmail({ to: authorEmail, subject, html });
}

export async function sendCoAuthorNotification(coAuthorEmail: string, coAuthorName: string, primaryAuthorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateCoAuthorNotificationHtml({
    coAuthorName,
    primaryAuthorName,
    articleTitle,
    articleId
  });
  return sendEmail({ to: coAuthorEmail, subject, html });
}

export async function sendAuthorAssignmentNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateAuthorAssignmentHtml({
    authorName,
    articleTitle,
    articleId
  });
  return sendEmail({ to: authorEmail, subject, html });
}

export async function sendEditorAssignmentNotification(editorEmail: string, editorName: string, articleTitle: string, authorName: string, category: string, articleId: string) {
  const { subject, html } = generateEditorTaskAssignedHtml({
    editorName,
    articleTitle,
    authorName,
    category,
    articleId
  });
  return sendEmail({ to: editorEmail, subject, html });
}

export async function sendArticleApprovalNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateArticleApprovalHtml({
    authorName,
    articleTitle,
    articleId
  });
  return sendEmail({ to: authorEmail, subject, html });
}

export async function sendArticleCorrectionNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string, editorComments?: string) {
  const { subject, html } = generateArticleCorrectionHtml({
    authorName,
    articleTitle,
    articleId,
    ...(editorComments && { editorComments })
  });
  return sendEmail({ to: authorEmail, subject, html });
}

// --- EMAIL VERIFICATION FOR ARTICLE SUBMISSION ---
export async function sendArticleVerificationEmail(
  authorEmail: string,
  authorName: string,
  token: string
) {
  const { subject, html } = generateArticleVerificationHtml({
    authorName,
    token,
    backendUrl: process.env.BACKEND_URL || 'http://localhost:4000'
  });
  return sendEmail({ to: authorEmail, subject, html });
}

// --- EMAIL VERIFICATION WITH CODE FOR ARTICLE SUBMISSION ---
export async function sendArticleVerificationCodeEmail(
  authorEmail: string,
  authorName: string,
  code: string
) {
  const { subject, html } = generateArticleVerificationCodeHtml({
    authorName,
    code
  });
  return sendEmail({ to: authorEmail, subject, html });
}

// --- EDITOR INVITATION EMAIL ---
export async function sendEditorInvitationEmail(
  editorEmail: string,
  editorName: string,
  token: string
) {
  console.log(`📧 [Editor Invitation] Preparing email for: ${editorEmail}`);
  console.log(`📧 [Editor Invitation] Editor name: ${editorName}`);
  console.log(`📧 [Editor Invitation] Token: ${token.substring(0, 10)}...`);
  console.log(`📧 [Editor Invitation] Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  
  const { subject, html } = generateEditorInvitationHtml({
    editorName,
    token,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  });
  
  console.log(`📧 [Editor Invitation] Email subject: ${subject}`);
  console.log(`📧 [Editor Invitation] Calling sendEmail function...`);
  
  return sendEmail({ to: editorEmail, subject, html });
}

/**
 * Send notification to admin when editor approves article
 */
export async function sendEditorApprovalNotificationToAdmin(
  adminEmail: string,
  adminName: string,
  articleTitle: string,
  editorName: string,
  articleId: string
) {
  const { subject, html } = generateEditorApprovalNotificationHtml({
    adminName,
    articleTitle,
    editorName,
    articleId
  });

  await sendEmail({
    to: adminEmail,
    subject,
    html,
  });
}

/**
 * Send notification to uploader when article is published (with link to change history)
 */
export async function sendArticlePublishedNotification(
  uploaderEmail: string,
  uploaderName: string,
  articleTitle: string,
  articleId: string,
  diffSummary?: string
) {
  const { subject, html } = generateArticlePublishedHtml({
    authorName: uploaderName,
    articleTitle,
    articleId,
    ...(diffSummary && { diffSummary })
  });

  await sendEmail({
    to: uploaderEmail,
    subject,
    html,
  });
}
