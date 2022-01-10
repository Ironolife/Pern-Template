import { Prisma } from '@prisma/client';

export const userProfileArgs = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    createdAt: true,
    roles: true,
    email: true,
    username: true,
  },
} as Prisma.UserArgs);

export type UserProfile = Prisma.UserGetPayload<typeof userProfileArgs>;

export type ProfileResposne = {
  profile: UserProfile;
};
