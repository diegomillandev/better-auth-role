import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
import { getVerifyEmailHtml } from "@/components/shared/email-template";
import { FROM_EMAIL, resend } from "./resend";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
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
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
