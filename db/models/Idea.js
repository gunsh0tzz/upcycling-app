import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ideaSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  cover: {
    type: {
      url: String,
    },
  },
  items: [String],
  instructions: [
    {
      id: {
        type: String,
        required: true,
      },
      step: {
        type: String,
        required: true,
      },
    },
  ],
  hashtags: [
    {
      type: String,
    },
  ],
});

const Idea = models?.Idea || model("Idea", ideaSchema);
export default Idea;
