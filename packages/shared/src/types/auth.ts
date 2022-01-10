import { z } from 'zod';

export const registerFormSchema = z.object({
  username: z.string().min(6).max(20),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  usernameOrEmail: z.string().min(1),
  password: z.string().min(1),
});

export type LoginFormValues = z.infer<typeof loginFormSchema>;

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type AccessTokenResposne = {
  accessToken: string;
};
