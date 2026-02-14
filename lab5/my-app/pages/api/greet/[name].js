export default function handler(req, res) {
  const { name } = req.query;

  console.log(name);

  if (req.method === "GET") {
    return res.status(200).json({
      greeting: `Hello, ${name}!`,
    });
  }

  if (req.method === "POST") {
    const { message } = req.body || {};

    console.log(message);

    return res.status(200).json({
      greeting: `${message ?? "Hello"}, ${name}!`,
    });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
