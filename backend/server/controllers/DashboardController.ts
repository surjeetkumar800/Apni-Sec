import { Request, Response } from "express";
import { IssueModel } from "../models/IssueModel";

export class DashboardController {
  async stats(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;


      const baseFilter = {
        userId,
        isDeleted: false,
      };

      const totalIssues = await IssueModel.countDocuments(baseFilter);
      const openVulnerabilities = await IssueModel.countDocuments({
        ...baseFilter,
        status: "open",
      });
      const resolved = await IssueModel.countDocuments({
        ...baseFilter,
        status: "resolved",
      });

      return res.status(200).json({
        success: true,
        data: {
          totalIssues,
          openVulnerabilities,
          resolved,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to load dashboard stats",
      });
    }
  }
}
