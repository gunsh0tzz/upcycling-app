import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import Image from "next/image";
import uploadImage from "@/lib/cloudinary";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.7rem;
  background-color: #fafafa;
  box-shadow: 0px 0px 0.5rem rgba(0, 0, 0, 0.3);
  border-radius: 0.8rem;
  border: 2px solid #fafafa;
  margin: 0.5rem 3rem 7rem 3rem;
  overflow-y: auto;

  @media (min-width: 1024px) {
    max-width: 42rem;
  }
`;

const StyledUnorderedList = styled.ul`
  list-style: none;
`;

const StyledListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const StyledTitle = styled.h3`
  margin-bottom: 0.5rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  align-self: center;
`;

const StyledSaveButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  align-self: center;
  width: 10rem;
  padding: 0.2rem;
  border-radius: 0.8rem;
  border: none;
  background-color: #44c67f;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledButtonText = styled.p`
  width: 100%;
  text-align: center;
`;

const StyledCancelButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-top: 0.2rem;
  width: 10rem;
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
  resize: vertical;
  overflow-y: auto;
  padding-left: 1rem;
  border: none;
  width: 90%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledInstructionButton = styled.button`
  padding: 0.2rem;
  background: transparent;
  margin-left: 0.1rem;
  border: none;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  gap: 1rem;
`;

const StyledInstructionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 5rem;
`;

const ResetContainer = styled.div`
  display: flex;
  gap: 0.4rem;
  width: 72%;
`;
const ImageContainer = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  width: 100%;
  margin-right: 1rem;
  gap: 0.3rem;
`;

const ResetButton = styled.button`
  width: fit-content;
  align-self: flex-end;
  background: transparent;
  border: none;
`;

const StyledCoverInput = styled.input`
  border-radius: 0.8rem;

  padding: 0.3rem;
  margin-left: 0.2rem;
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

  const handleResetButtonClick = () => {
    setImageValue("");
    setCoverValue("");
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const cover = idea.cover
      ? idea.cover
      : await uploadImage(event.target.cover.files[0]);

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
    onSubmit({ ...idea, ...data, cover });
    window.alert(
      idea.title ? "The idea was edited." : "Your new idea has been added!"
    );
    const form = event.target.elements;
    event.target.reset();
    form.title.focus();
    router.push("/");
  }
  function handleCancel(event) {
    event.preventDefault();
    const isConfirmed = window.confirm("Are you sure?");
    if (isConfirmed) {
      router.push("/");
    }
  }

  const [imageValue, setImageValue] = useState(idea.image);
  const [coverValue, setCoverValue] = useState(idea.cover);
  const [showImageInput, setShowImageInput] = useState(true);
  const [showCoverInput, setShowCoverInput] = useState(true);

  const handleImageInputChange = (event) => {
    setImageValue(event.target.value);
    setShowCoverInput(!event.target.value);
  };

  const handleCoverInputChange = (event) => {
    setCoverValue(event.target.value);
    setShowImageInput(!event.target.value);
  };

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
          aria-labelledby="title"
        />
        <ResetContainer>
          <ImageContainer>
            <label htmlFor="image" />
            {showImageInput && (
              <StyledInput
                id="image"
                name="image"
                value={imageValue}
                placeholder="image"
                aria-labelledby="image"
                onChange={handleImageInputChange}
              />
            )}
            {showCoverInput ? (
              !idea.cover && !idea.image ? (
                <>
                  <label htmlFor="cover" />
                  <StyledCoverInput
                    id="cover"
                    name="cover"
                    value={coverValue}
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={handleCoverInputChange}
                  />
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </ImageContainer>
          <ResetButton onClick={handleResetButtonClick}>
            <Image
              src={"/recycling.svg"}
              width={30}
              height={30}
              alt="reset icon"
            />
          </ResetButton>
        </ResetContainer>
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
              <StyledListItem>
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
                <StyledInstructionButtonContainer>
                  <StyledInstructionButton
                    type="submit"
                    onClick={() => handleAddInstruction()}
                  >
                    <Image
                      src={"/add_circle.svg"}
                      width={25}
                      height={25}
                      alt="delete icon"
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
                </StyledInstructionButtonContainer>
              </StyledListItem>
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
        <StyledButtonContainer>
          <StyledSaveButton aria-label="Save Idea">
            <StyledButtonText>
              {router.query.id ? "save" : "add"}{" "}
            </StyledButtonText>
            <Image src={"/check.svg"} width={25} height={25} alt="check icon" />
          </StyledSaveButton>
          <StyledCancelButton onClick={handleCancel} aria-label="Cancel">
            <StyledButtonText>Cancel</StyledButtonText>
            <Image
              src={"/recycling_black.svg"}
              width={25}
              height={25}
              alt="check icon"
            />
          </StyledCancelButton>
        </StyledButtonContainer>
      </StyledForm>
    </>
  );
}
