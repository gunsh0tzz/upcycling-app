import dbConnect from "@/db/connect";
import Idea from "@/db/models/Idea";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  // GET-Methode
  if (request.method === "GET") {
    try {
      const idea = await Idea.findById(id);

      if (!idea) {
        return response.status(404).json({ status: "Not Found" });
      }

      response.status(200).json(idea);
    } catch (error) {
      response.status(500).json({ message: "Error fetching idea" });
    }
  }

  // PUT-Methode
  if (request.method === "PUT") {
    try {
      const idea = await Idea.findOneAndUpdate(
        { _id: id }, // Verwenden Sie den extrahierten Wert direkt hier
        request.body,
        { new: true }
      );
      response.status(200).json(idea);
    } catch (error) {
      response.status(500).json({ message: "Error updating idea" });
    }
  }

  // DELETE-Methode
  if (request.method === "DELETE") {
    try {
      const idea = await Idea.findOneAndDelete({ _id: id }); // Verwenden Sie den extrahierten Wert direkt hier
      response.status(200).json(idea);
    } catch (error) {
      response.status(500).json({ message: "Error deleting idea" });
    }
  }

  // Falls keine der erwarteten Methoden übereinstimmt
  response.status(405).json({ message: "Method not allowed" });
}
