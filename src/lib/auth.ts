import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import {
  getResetPasswordEmailHtml,
  getVerifyEmailHtml,
} from "@/components/shared/email-template";
import { FROM_EMAIL, resend } from "./resend";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { passwordSchema } from "./validation";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      try {
        const emailHtml = getResetPasswordEmailHtml(user.email, url);

        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: "diegomillandev@gmail.com",
          subject: "Verify your email address",
          html: emailHtml,
        });

        if (error) {
          console.error("Resend error:", error);
          throw new Error("Failed to send reset password email");
        } else {
          console.log(
            "Reset password email sent successfully to: ",
            user.email,
          );
          console.log("Resend response data:", data?.id);
        }
      } catch (error) {
        console.error("Error sending reset password email:", error);
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        const emailHtml = getVerifyEmailHtml(user.email, url);

        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: "diegomillandev@gmail.com",
          subject: "Verify your email address",
          html: emailHtml,
        });

        if (error) {
          console.error("Resend error:", error);
          throw new Error("Failed to send reset password email");
        } else {
          console.log(
            "Reset password email sent successfully to: ",
            user.email,
          );
          console.log("Resend response data:", data?.id);
        }
      } catch (error) {
        console.error("Error sending reset password email:", error);
      }
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        input: false,
      },
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === "/sign-up" ||
        ctx.path === "/reset-password" ||
        ctx.path === "/change-password"
      ) {
        const password = ctx.body.password || ctx.body.newPassword;

        const { error } = passwordSchema.safeParse(password);
        if (error) {
          throw new APIError("BAD_REQUEST", {
            message: "Password not strong enough",
          });
        }
      }
    }),
  },
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
