import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  private service = new AuthService();

  // ================= REGISTER =================
  register = async (req: Request, res: Response) => {
    try {
      const user = await this.service.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ================= LOGIN =================
  login = async (req: Request, res: Response) => {
    try {
      const result = await this.service.login(
        req.body.email,
        req.body.password
      );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ================= FORGOT PASSWORD =================
  forgotPassword = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      await this.service.forgotPassword(email);

      return res.status(200).json({
        success: true,
        message: "Password reset email sent",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };

  // ================= RESET PASSWORD =================
  resetPassword = async (req: Request, res: Response) => {
    try {
      const { token, password } = req.body;

      await this.service.resetPassword(token, password);

      return res.status(200).json({
        success: true,
        message: "Password reset successful",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
}
