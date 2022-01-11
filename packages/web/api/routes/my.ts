import { ProfileResposne } from '@pern-template/shared';
import { axiosAuth } from '#web/api/axios';

export const getMyProfile = () =>
  axiosAuth.get<ProfileResposne>('/my/profile').then((res) => res.data);
