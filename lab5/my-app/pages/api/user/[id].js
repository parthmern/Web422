let users = [
  { id: "1", name: "Parrth", status: "active" },
  { id: "2", name: "Patell", status: "active" },
];

export default function handler(req, res) {
  const { id } = req.query;
  const userIndex = users.findIndex((u) => u.id === id);

  if (req.method === "GET") {
    if (userIndex === -1) {
      return res.status(404).json({ error: "not found" });
    }

    return res.status(200).json(users[userIndex]);
  }

  if (req.method === "PUT") {
    if (userIndex === -1) {
      return res.status(404).json({ error: "not found" });
    }

    const updates = req.body || {};
    users[userIndex] = { ...users[userIndex], ...updates };

    return res.status(200).json({
      message: "User updated",
      user: users[userIndex],
    });
  }

  if (req.method === "DELETE") {
    if (userIndex === -1) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedUser = users[userIndex];
    users = users.filter((u) => u.id !== id);

    return res.status(200).json({
      message: "User deleted",
      user: deletedUser,
    });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  return res.status(405).json({ error: "Method Not Allowed" });
}
