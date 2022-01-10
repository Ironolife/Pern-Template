import { UserRole } from '@prisma/client';

export type AuthPayload = {
  userId: string;
  roles: UserRole[];
};

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}
