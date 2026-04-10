export default async function handler(req, res) {
  const { workId } = req.query;

  if (!workId) {
    return res.status(400).json({ error: "work id is neeeded" });
  }

  try {
    const response = await fetch(
      `https://openlibrary.org/works/${workId}.json`
    );
    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "got error", error: error });
  }
}
