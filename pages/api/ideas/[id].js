import dbConnect from "@/db/connect";
import Idea from "@/db/models/Idea";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
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
    return;
  }

  // PUT-Methode
  if (request.method === "PUT") {
    try {
      if (session) {
        const idea = await Idea.findOneAndUpdate(
          { _id: id }, // Verwenden Sie den extrahierten Wert direkt hier
          request.body,
          { new: true }
        );
        response.status(200).json(idea);
      } else {
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      response.status(500).json({ message: "Error updating idea" });
    }
    return;
  }

  // DELETE-Methode
  if (request.method === "DELETE") {
    try {
      if (session) {
        const idea = await Idea.findOneAndDelete({ _id: id }); // Verwenden Sie den extrahierten Wert direkt hier
        response.status(200).json(idea);
      } else {
        response.status(401).json({ status: "Not authorized" });
      }
    } catch (error) {
      response.status(500).json({ message: "Error deleting idea" });
    }
    return;
  }

  // Falls keine der erwarteten Methoden übereinstimmt
  response.status(405).json({ message: "Method not allowed" });
}
