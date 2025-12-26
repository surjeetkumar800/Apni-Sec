import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import type { StringValue } from "ms";
import crypto from "crypto";

import { env } from "../config/env";
import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "./EmailService";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export class AuthService {
  private repo: UserRepository;
  private emailService: EmailService;

  constructor() {
    this.repo = new UserRepository();
    this.emailService = new EmailService();
  }

  /* ================= TOKEN HELPER ================= */
  private generateToken(userId: string): string {
    const payload = { id: userId };

    const options: SignOptions = {
      expiresIn: env.JWT_EXPIRES_IN as StringValue | number, // ✅ FIX
    };

    return jwt.sign(payload, env.JWT_SECRET, options);
  }

  /* ================= REGISTER ================= */
  async register(data: RegisterPayload) {
    const { name, email, password } = data;

    const normalizedEmail = email.toLowerCase().trim();

    const exists = await this.repo.findByEmail(normalizedEmail);
    if (exists) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.repo.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });

    const token = this.generateToken(user._id.toString());

    // 🔔 non-blocking welcome email
    this.emailService
      .sendWelcomeEmail(user.email, user.name)
      .catch(() => {});

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  /* ================= LOGIN ================= */
  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email.toLowerCase());
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user._id.toString());

    return {
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    };
  }

  /* ================= FORGOT PASSWORD ================= */
  async forgotPassword(email: string) {
    const user = await this.repo.findByEmail(email.toLowerCase());
    if (!user) {
      throw new Error("User not found");
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    await this.repo.update(user._id.toString(), {
      resetToken,
      resetTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 min
    });

    const resetLink = `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await this.emailService.sendPasswordResetEmail(
      user.email,
      user.name,
      resetLink
    );

    return { message: "Password reset email sent" };
  }

  /* ================= RESET PASSWORD ================= */
  async resetPassword(token: string, newPassword: string) {
    const user = await this.repo.findByResetToken(token);

    if (
      !user ||
      !user.resetTokenExpiry ||
      user.resetTokenExpiry < Date.now()
    ) {
      throw new Error("Invalid or expired reset token");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.repo.update(user._id.toString(), {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    });

    return { message: "Password reset successful" };
  }
}
