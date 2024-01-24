import dbConnect from "@/db/connect";
import Idea from "@/db/models/Idea";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const ideas = await Idea.find();

      return response.status(200).json(ideas);
    } catch (error) {
      console.error("Error fetching ideas:", error);
      response.status(500).json({ message: "Error fetching ideas" });
    }
  }
  if (request.method === "POST") {
    try {
      const idea = await Idea.create(request.body);
      response.status(201).json(idea);
    } catch (error) {
      response.status(500).json({ message: "Error creating idea" });
    }
    return;
  }

  response.status(405).json({ message: "Method not allowed" });
}
