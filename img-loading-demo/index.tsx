interface User {
  id: number;
  name: string;
  avatar: string;
}

interface UserListProps {
  users: User[];
}

const ABOVE_FOLD_THRESHOLD = 3;

export const UserList = ({ users }: UserListProps) => {
  return (
    <ul>
      {users.map((user, index) => {
        const isAboveFold = index < ABOVE_FOLD_THRESHOLD;
        
        return (
          <li key={user.id}>
            <img
              src={user.avatar}
              alt={user.name}
              loading={isAboveFold ? "eager" : "lazy"}
              fetchPriority={isAboveFold ? "high" : "low"}
              width="64"
              height="64"
            />
            <span>{user.name}</span>
          </li>
        );
      })}
    </ul>
  );
};
