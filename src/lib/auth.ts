import { betterAuth } from "better-auth";
import { prisma } from "./prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {  twoFactor } from "better-auth/plugins"
import { Resend } from 'resend';
import { admin } from "better-auth/plugins"
import { adminRole, userRole } from "./permissions";




const resend = new Resend('re_QK3pjHou_AWFdh5BxgfStuEAvQ7wxNugg');


export const auth = betterAuth({
  //...
  appName: "Lab_log",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      redirectURI: "http://localhost:4000/api/auth/callback/github"
    },
  },
plugins: [
  admin({
    adminRoles:["admin"],
    defaultRole:"user",
    roles :{
      admin:adminRole,
      user:userRole
    }
  }) ,
  twoFactor({
    otpOptions: {
      async sendOTP({ user, otp }) {
        console.log("Sending OTP to:", user.email, otp);

        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: user.email!,
          subject: 'Your OTP',
          html: `<p>Your OTP is <strong>${otp}</strong></p>`
        });
      },
    }
  })
]

,

  events: {
    createUser(args: { user: any }) {
    
      console.log("USER CREATED:", args.user.email, args.user.id);
    },
    signIn(args: { user: any }) {
      console.log("USER SIGNED IN:", args.user.email, args.user.id);
    },
  },
})