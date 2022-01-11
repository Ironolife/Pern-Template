import WithAuth from '#web/components/withAuth';
import React, { VFC } from 'react';

const Profile: VFC = () => {
  return <div>Profile</div>;
};

export default WithAuth(Profile);
