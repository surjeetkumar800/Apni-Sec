import { IssueModel, IIssue } from "../models/IssueModel";
import { Types } from "mongoose";

export class IssueRepository {
  // CREATE
  async create(data: Partial<IIssue>) {
    return IssueModel.create(data);
  }

  // FIND BY ID
  async findById(id: string) {
    if (!Types.ObjectId.isValid(id)) return null;
    return IssueModel.findById(id);
  }

  // LIST WITH FILTERS
  async find(filters: {
    userId: string;
    type?: string;
    status?: string;
    search?: string;
  }) {
    const query: any = {
      userId: filters.userId,
      isDeleted: false,
    };

    if (filters.type) query.type = filters.type;
    if (filters.status) query.status = filters.status;

    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: "i" } },
        { description: { $regex: filters.search, $options: "i" } },
      ];
    }

    return IssueModel.find(query).sort({ createdAt: -1 });
  }

  // UPDATE
  async update(id: string, data: Partial<IIssue>) {
    if (!Types.ObjectId.isValid(id)) return null;

    return IssueModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
}
