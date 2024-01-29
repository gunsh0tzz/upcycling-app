import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Image from "next/image";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #fafafa;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0.8rem;
  border: 2px solid #fafafa;
  padding: 0.7rem;
  height: 60vh;
  max-height: 60vh;
  width: 85vw;
  overflow-y: auto;
`;
const StyledUnorderedList = styled.ul`
  list-style: none;
`;
const StyledTitle = styled.h3`
  margin-bottom: 0.5;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  align-self: center;
`;
const StyledSaveButton = styled.button`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  align-self: center;
  width: 30vw;
  padding: 0.2rem;
  border-radius: 0.8rem;
  border: none;
  background-color: #44c67f;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
const StyledButtonText = styled.p`
  padding: 0.2rem;
  padding-left: 0.3rem;
`;
const StyledCancelButton = styled.button`
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-top: 0.2rem;
  width: 30vw;
  padding: 0.2rem;
  border-radius: 0.8rem;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #ca92de;
`;
const StyledInput = styled.input`
  background-color: #f7f3f3;
  border-radius: 0.8rem;
  height: 4vh;
  padding: 0.3rem;
  padding-left: 1rem;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
const StyledTextarea = styled.textarea`
  background-color: #f7f3f3;
  border-radius: 0.8rem;
  height: 4vh;
  padding: 0.3rem;
  padding-left: 1rem;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;
const StyledTextareaInstruction = styled.textarea`
  background-color: #f7f3f3;
  border-radius: 0.8rem;
  min-height: 7vh;
  width: 53vw;
  resize: vertical;
  overflow-y: auto;
  padding-left: 1rem;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledInstructionButton = styled.button`
  padding: 0.2rem;
  background: transparent;
  margin-left: 0.1rem;
  border: none;
`;
export default function Form({ idea = {}, onSubmit }) {
  const [instructions, setInstructions] = useState(
    idea.instructions ? idea.instructions : [{ id: uuidv4(), value: "" }]
  );
  const router = useRouter();
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
    data.instructions = instructions
      .filter(
        (instruction) =>
          typeof instruction.step === "string" && instruction.step.trim() !== ""
      )
      .map((instruction, index) => ({
        id: `${data.id}.${index + 1}`,
        step: instruction.step.trim(),
      }));
    onSubmit({ ...idea, ...data });
    window.alert("Your new idea has been added!");
    const form = event.target.elements;
    event.target.reset();
    form.title.focus();
    router.push("/");
  }
  function handleCancel() {
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      router.push("/");
    }
  }
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledTitle>
          {router.query.id ? "update idea" : "add a new idea"}
        </StyledTitle>
        <label htmlFor="title" />
        <StyledInput
          id="title"
          name="title"
          defaultValue={idea.title}
          required
          placeholder="title"
        />
        <label htmlFor="image" />
        <StyledInput
          id="image"
          name="image"
          defaultValue={idea.image}
          placeholder="image"
        />
        <label htmlFor="items" />
        <StyledTextarea
          as="input"
          name="items"
          id="items"
          placeholder="item, item, item"
          defaultValue={idea.items}
          minLength={1}
          maxLength={150}
        />
        <label htmlFor="instructions" />
        {instructions.map((instruction, index) => (
          <div key={instruction.id}>
            <StyledUnorderedList>
              <li>
                <span>{index + 1}. </span>
                <StyledTextareaInstruction
                  type="text"
                  id="instructions"
                  placeholder="instructions"
                  value={instruction.step || ""}
                  onChange={(e) =>
                    handleInstructionChange(instruction.id, e.target.value)
                  }
                  required
                  minLength={1}
                  maxLength={150}
                  wrap="hard"
                  rows={5}
                />
                <StyledInstructionButton
                  type="button"
                  onClick={() => handleAddInstruction()}
                >
                  <Image
                    src={"/add_circle.svg"}
                    width={25}
                    height={25}
                    alt="plant icon"
                  />
                </StyledInstructionButton>
                {index > 0 && (
                  <StyledInstructionButton
                    type="button"
                    onClick={() => handleRemoveInstruction(instruction.id)}
                  >
                    <Image
                      src={"/recycling.svg"}
                      width={25}
                      height={25}
                      alt="plant icon"
                    />
                  </StyledInstructionButton>
                )}
                {/* <StyledInstructionButton
                  type="button"
                  onClick={() => handleRemoveInstruction(instruction.id)}
                >
                  <Image
                    src={"/recycling.svg"}
                    width={25}
                    height={25}
                    alt="plant icon"
                  />
                </StyledInstructionButton> */}
              </li>
            </StyledUnorderedList>
          </div>
        ))}
        <label htmlFor="hashtags" />
        <StyledTextarea
          as="input"
          id="hashtags"
          name="hashtags"
          placeholder="hashtag, hashtag, hashtag"
          defaultValue={idea.hashtags}
          minLength={1}
          maxLength={150}
        />
        <StyledSaveButton>
          <StyledButtonText>
            {router.query.id ? "save" : "add"}{" "}
          </StyledButtonText>
          <Image src={"/check.svg"} width={25} height={25} alt="check icon" />
        </StyledSaveButton>
      </StyledForm>
      <StyledCancelButton onClick={handleCancel}>
        <StyledButtonText>Cancel</StyledButtonText>
        <Image
          src={"/recycling_black.svg"}
          width={25}
          height={25}
          alt="check icon"
        />
      </StyledCancelButton>
    </>
  );
}
