import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faXmark,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

const StyledHeading = styled.h2`
  margin: 1rem 0rem;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StyledInput = styled.input`
  border: 0;
  border-radius: 0.25rem;
  background-color: var(--green-200);
  color: white;
  padding: 0.25rem;

  &::placeholder {
    color: white;
  }
`;

const StyledTextarea = styled.textarea`
  border: 0;
  border-radius: 0.25rem;
  background-color: var(--green-200);
  color: white;
  padding: 0.25rem;

  &::placeholder {
    color: white;
  }
`;

const StyledUnorderedList = styled.ul`
  margin-left: 1rem;
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.button`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.175);
  border: 0;
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

const StyledInstructionButton = styled.button`
  background-color: rgba(0, 0, 0, 0.175);
  border: 0;
  border-radius: 0.25rem;
  padding: 0.25rem;
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
      <StyledHeading>
        {router.query.id ? "Update idea" : "Add a new idea"}
      </StyledHeading>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <StyledInput
          id="title"
          name="title"
          defaultValue={idea.title}
          required
        />
        <label htmlFor="image">Image URL:</label>
        <StyledInput id="image" name="image" defaultValue={idea.image} />
        <label htmlFor="items">Items:</label>
        <StyledTextarea
          as="input"
          name="items"
          placeholder="item, item, item"
          defaultValue={idea.items}
          minLength={1}
          maxLength={150}
        />
        <label htmlFor="instructions">Instructions:</label>

        {instructions.map((instruction, index) => (
          <div key={instruction.id}>
            <StyledUnorderedList>
              <StyledListItem>
                <span>{index + 1}. </span>
                <StyledTextarea
                  as="input"
                  type="text"
                  value={instruction.step || ""}
                  onChange={(e) =>
                    handleInstructionChange(instruction.id, e.target.value)
                  }
                  required
                  minLength={1}
                  maxLength={150}
                />
                <StyledInstructionButton
                  type="button"
                  onClick={() => handleAddInstruction()}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </StyledInstructionButton>
                <StyledInstructionButton
                  type="button"
                  onClick={() => handleRemoveInstruction(instruction.id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </StyledInstructionButton>
              </StyledListItem>
            </StyledUnorderedList>
          </div>
        ))}
        <label htmlFor="hashtags">Hashtags:</label>
        <StyledTextarea
          as="input"
          name="hashtags"
          placeholder="hashtag, hashtag, hashtag"
          defaultValue={idea.hashtags}
          minLength={1}
          maxLength={150}
        />
        <ButtonContainer>
          <StyledButton>
            {router.query.id ? (
              <FontAwesomeIcon icon={faFloppyDisk} />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}
          </StyledButton>
          <StyledButton onClick={handleCancel}>
            <FontAwesomeIcon icon={faXmark} />
          </StyledButton>
        </ButtonContainer>
      </StyledForm>
    </>
  );
}
