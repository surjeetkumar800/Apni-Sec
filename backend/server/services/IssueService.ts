import { IssueRepository } from "../repositories/IssueRepository";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";
import { IIssue, IssueStatus } from "../models/IssueModel";

export class IssueService {
  private repo: IssueRepository;
  private userRepo: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.repo = new IssueRepository();
    this.userRepo = new UserRepository();
    this.emailService = new EmailService();
  }

  // ================= CREATE ISSUE =================
  async createIssue(userId: string, data: any) {
    console.log("🟡 Creating issue for user:", userId);

    const issue = await this.repo.create({
      ...data,
      userId,
    });

    console.log("✅ Issue created:", issue._id.toString());

    // 🔥 ISSUE CREATE EMAIL (NON-BLOCKING)
    try {
      const user = await this.userRepo.findById(userId);

      if (user) {
        await this.emailService.sendIssueCreatedEmail(
          user.email,
          user.name,
          {
            type: issue.type,
            title: issue.title,
            description: issue.description,
          }
        );

        console.log("📧 Issue creation email sent to:", user.email);
      } else {
        console.warn("⚠️ User not found for issue email");
      }
    } catch (err: any) {
      console.error("❌ Issue email failed:", err.message);
      // ❗ email fail hone par API fail nahi hogi
    }

    return issue;
  }

  // ================= LIST ISSUES =================
  async listIssues(userId: string, query: any) {
    return this.repo.find({
      userId,
      type: query.type,
      status: query.status,
      search: query.search,
    });
  }

  // ================= GET SINGLE =================
  async getIssueById(issueId: string, userId: string) {
    const issue = (await this.repo.findById(issueId)) as IIssue | null;

    if (!issue || issue.isDeleted) {
      throw new Error("Issue not found");
    }

    if (issue.userId.toString() !== userId) {
      throw new Error("Unauthorized access");
    }

    return issue;
  }

  // ================= UPDATE ISSUE =================
  async updateIssue(issueId: string, userId: string, data: any) {
    const issue = await this.getIssueById(issueId, userId);

    const updated = await this.repo.update(issueId, {
      title: data.title ?? issue.title,
      description: data.description ?? issue.description,
      priority: data.priority ?? issue.priority,
    });

    if (!updated) {
      throw new Error("Issue update failed");
    }

    return updated;
  }

  // ================= UPDATE STATUS =================
  async updateStatus(issueId: string, userId: string, status: IssueStatus) {
    await this.getIssueById(issueId, userId);
    return this.repo.update(issueId, { status });
  }

  // ================= SOFT DELETE =================
  async deleteIssue(issueId: string, userId: string) {
    await this.getIssueById(issueId, userId);

    const deleted = await this.repo.update(issueId, {
      isDeleted: true,
    });

    if (!deleted) {
      throw new Error("Delete failed");
    }

    return deleted;
  }
}
