import { memo, FC } from 'react';

import UserCard from './UserCard';
import { UserDocInterface } from '../StateInterface';

const UserListMemo: FC<{ users: UserDocInterface[] }> = memo(({ users }) => (
  <>
    {users.map((user) => (
      <UserCard key={user.id} user={user} />
    ))}
  </>
));

export default UserListMemo;
