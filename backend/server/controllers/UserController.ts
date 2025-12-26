import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  // ================= GET PROFILE =================
  // GET /api/users/profile
  getProfile = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const profile = await this.service.getProfile(user._id.toString());

      return res.status(200).json({
        success: true,
        data: profile,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message || "Failed to fetch profile",
      });
    }
  };

  // ================= UPDATE PROFILE =================
  // PUT /api/users/profile
  updateProfile = async (req: Request, res: Response) => {
    try {
      const user = (req as any).user;

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const updatedProfile = await this.service.updateProfile(
        user._id.toString(),
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        data: updatedProfile,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Profile update failed",
      });
    }
  };
}
