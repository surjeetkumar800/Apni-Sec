import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
   _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isActive: boolean;

  // 🔐 password reset fields
  resetToken?: string | null;
  resetTokenExpiry?: number | null;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // 🔐 reset password support
    resetToken: {
      type: String,
      default: null,
    },
    resetTokenExpiry: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
