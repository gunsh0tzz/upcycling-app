import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Form({ onSubmit }) {
  const [instructions, setInstructions] = useState([
    { id: uuidv4(), value: "" },
  ]);
  const router = useRouter();

  //   function handleInstructionChange(index, value) {
  //     const newInstructions = [...instructions];
  //     newInstructions[index] = value;
  //     setInstructions(newInstructions);
  //   }

  function handleInstructionChange(id, value) {
    const newInstructions = instructions.map((instruction) =>
      instruction.id === id ? { ...instruction, step: value } : instruction
    );
    setInstructions(newInstructions);
  }

  function handleAddInstruction() {
    const newInstruction = { id: uuidv4(), step: "" };
    setInstructions([...instructions, newInstruction]);
  }
  //   function handleRemoveInstruction(index) {
  //     const newInstructions = [...instructions];
  //     newInstructions.splice(index, 1);
  //     setInstructions(newInstructions);
  //     // const newInstructions = instructions.filter(
  //     //   (instruction) => instruction.id !== id
  //     // );
  //     // setInstructions(newInstructions);
  //   }

  function handleRemoveInstruction(id) {
    const newInstructions = instructions.filter(
      (instruction) => instruction.id !== id
    );
    setInstructions(newInstructions);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));

    data.items = data.items.split(",").map((item) => item.trim());
    data.hashtags = data.hashtags.split(",").map((item) => item.trim());
    // data.instructions = data.instructions.split(",").map((item) => item.trim());

    // //Convert instructions to an array of objects
    // data.instructions = instructions
    //   .filter((instruction) => instruction.trim() !== "")
    //   .map((instruction, index) => ({
    //     id: `${data.id}.${index + 1}`,
    //     step: instruction.trim(),
    //   }));

    data.instructions = instructions
      .filter(
        (instruction) =>
          typeof instruction.step === "string" && instruction.step.trim() !== ""
      )
      .map((instruction, index) => ({
        id: `${data.id}.${index + 1}`,
        step: instruction.step.trim(),
      }));

    onSubmit(data);
    window.alert("Your new idea has been added!");
    const form = event.target.elements;
    event.target.reset();
    form.title.focus();
    router.push("/");
  }

  console.log(instructions.steps);
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">title:</label>
      <input id="title" name="title" />
      <label htmlFor="image">image:</label>
      <input id="image" name="image" />
      <label htmlFor="items">items:</label>
      <input id="items" name="items" />
      <label htmlFor="instructions">instructions:</label>

      {/* {instructions.map((instruction, index) => (
        <div key={index}>
          <input
            type="text"
            value={instruction}
            onChange={(e) => handleInstructionChange(index, e.target.value)}
          />
          <button type="button" onClick={() => handleAddInstruction()}>
            +
          </button>
          <button type="button" onClick={() => handleRemoveInstruction(index)}>
            x
          </button>
        </div>
      ))} */}
      {instructions.map((instruction) => (
        <div key={instruction.id}>
          <input
            type="text"
            value={instruction.step || ""}
            onChange={(e) =>
              handleInstructionChange(instruction.id, e.target.value)
            }
          />
          <button type="button" onClick={() => handleAddInstruction()}>
            +
          </button>
          <button
            type="button"
            onClick={() => handleRemoveInstruction(instruction.id)}
          >
            x
          </button>
        </div>
      ))}
      <label htmlFor="hashtags">hashtags:</label>
      <input id="hastags" name="hashtags" />
      <button>add</button>
    </form>
  );
}
