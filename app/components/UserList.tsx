// FETCH DATA FROM SERVER COMPONENT (EASYEST WAY)

"use server";

export default async function UserList() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
    {
      cache: "no-store", // Optionnel, pour désactiver la mise en cache
    }
  );
  const users = await response.json();

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <ul>
        {users.map((user: { id: number; name: string }) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
