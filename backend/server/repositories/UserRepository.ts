import { UserModel, IUser } from "../models/UserModel";

export class UserRepository {
  // ================= CREATE =================
  async create(data: Partial<IUser>): Promise<IUser> {
    return UserModel.create(data);
  }

  // ================= FIND BY EMAIL =================
  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).select("+password");
  }

  // ================= FIND BY ID =================
  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id);
  }

  // ================= UPDATE USER =================
  async update(
    userId: string,
    data: Partial<IUser>
  ): Promise<IUser | null> {
    return UserModel.findByIdAndUpdate(
      userId,
      { $set: data },
      { new: true }
    );
  }

  // ================= FIND BY RESET TOKEN =================
  async findByResetToken(token: string): Promise<IUser | null> {
    return UserModel.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
  }
}
