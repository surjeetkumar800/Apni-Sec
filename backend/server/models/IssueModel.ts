import mongoose, { Schema, Document, Model } from "mongoose";

export type IssueType =
  | "Cloud Security"
  | "Red Team Assessment"
  | "VAPT";

export type IssueStatus =
  | "open"
  | "in-progress"
  | "resolved"
  | "closed";

export interface IIssue extends Document {
  userId: mongoose.Types.ObjectId;
  type: IssueType;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: IssueStatus;
  isDeleted: boolean;              // ✅ SOFT DELETE
  createdAt: Date;
  updatedAt: Date;
}

const IssueSchema: Schema<IIssue> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["Cloud Security", "Red Team Assessment", "VAPT"],
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
      index: true,
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
      index: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Prevent model overwrite in dev / nodemon
export const IssueModel: Model<IIssue> =
  mongoose.models.Issue ||
  mongoose.model<IIssue>("Issue", IssueSchema);
