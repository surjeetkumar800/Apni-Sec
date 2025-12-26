"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const resend_1 = require("resend");
const env_1 = require("../config/env");
class EmailService {
    constructor() {
        this.resend = new resend_1.Resend(env_1.env.RESEND_API_KEY);
    }
    // ================= WELCOME EMAIL =================
    async sendWelcomeEmail(email, name) {
        await this.resend.emails.send({
            from: env_1.env.FROM_EMAIL,
            to: email,
            subject: "Welcome to ApniSec – Your account is ready 🚀",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #ffffff;">
          <h2 style="color:#111827;">Welcome, ${name} 👋</h2>

          <p style="color:#374151; font-size:15px;">
            Thanks for signing up with <strong>ApniSec</strong>.
            Your account has been successfully created.
          </p>

          <p style="color:#374151; font-size:15px;">
            You can now raise security issues, track their status,
            and manage your profile from your dashboard.
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="font-size:13px; color:#6b7280;">
            © ${new Date().getFullYear()} ApniSec. All rights reserved.
          </p>
        </div>
      `,
        });
    }
    // ================= ISSUE CREATED EMAIL =================
    async sendIssueCreatedEmail(email, name, issue) {
        await this.resend.emails.send({
            from: env_1.env.FROM_EMAIL,
            to: email,
            subject: "🛡️ New Security Issue Created | ApniSec",
            html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #ffffff;">
          
          <h2 style="color:#111827;">Hello ${name},</h2>

          <p style="color:#374151; font-size:15px;">
            A new security issue has been successfully created in your ApniSec account.
          </p>

          <div style="background:#f9fafb; padding:16px; border-radius:8px; margin:20px 0;">
            <p><strong>Issue Type:</strong> ${issue.type}</p>
            <p><strong>Title:</strong> ${issue.title}</p>
            <p><strong>Description:</strong></p>
            <p style="color:#374151;">${issue.description}</p>
          </div>

          <p style="color:#374151; font-size:15px;">
            Our security team will review this issue shortly.
          </p>

          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;" />

          <p style="font-size:13px; color:#6b7280;">
            © ${new Date().getFullYear()} ApniSec. All rights reserved.
          </p>

        </div>
      `,
        });
    }
    // EmailService.ts
    async sendPasswordResetEmail(email, name, resetLink) {
        await this.resend.emails.send({
            from: env_1.env.FROM_EMAIL,
            to: email,
            subject: "Reset your ApniSec password 🔐",
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:24px;">
        <h2>Hello ${name},</h2>

        <p>
          We received a request to reset your ApniSec account password.
        </p>

        <p>
          Click the button below to reset your password:
        </p>

        <div style="margin: 20px 0;">
          <a href="${resetLink}"
             style="background:#111827;color:#ffffff;
             padding:12px 20px;text-decoration:none;
             border-radius:6px;">
            Reset Password
          </a>
        </div>

        <p style="font-size:13px;color:#6b7280;">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <hr />
        <p style="font-size:12px;color:#9ca3af;">
          © ${new Date().getFullYear()} ApniSec
        </p>
      </div>
    `,
        });
    }
    //update profile
    async sendProfileUpdatedEmail(email, name) {
        await this.resend.emails.send({
            from: env_1.env.FROM_EMAIL,
            to: email,
            subject: "Your ApniSec profile has been updated ✏️",
            html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin:auto; padding:24px;">
        <h2>Hello ${name},</h2>
        <p>

          This is a confirmation that your ApniSec profile information has been successfully updated.
        </p>
        <p style="font-size:13px;color:#6b7280;">
          If you did not make this change, please contact our support team immediately.
        </p>
        <hr />  
        <p style="font-size:12px;color:#9ca3af;">

          © ${new Date().getFullYear()} ApniSec
        </p>
      </div>
    `,
        });
    }
}
exports.EmailService = EmailService;
