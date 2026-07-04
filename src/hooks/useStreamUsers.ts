import { useEffect, useState } from "react";
import type { StreamChat, UserResponse } from "stream-chat";

const useStreamUsers = (client: StreamChat, userId: string) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // exclude diri sendiri lewat filter server
        const response = await client.queryUsers(
          { id: { $ne: userId } } as any,
          { last_active: -1 },
          { limit: 50 },
        );

        // exclude admin di sisi client, karena field "role"
        // tidak mendukung operator exclude di server
        const filtered = response.users.filter((u) => u.role !== "admin");
        setUsers(filtered);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        // todo: sentry logs & capture exception
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUsers();
  }, [client, userId]);

  return { users, loading };
};

export default useStreamUsers;