import Image from "next/image";
import Fuse from "fuse.js";
import { useState } from "react";
import Card from "@/components/Card";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faMagnifyingGlass,
  faSignsPost,
} from "@fortawesome/free-solid-svg-icons";

const Selection = styled.div`
  margin: 0.75rem 0.5rem 0.5rem 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 0 3rem;

  @media screen and (min-width: 600px) {
    padding: 0 10rem;
    min-width: 42rem;
  }
`;

const Question = styled.h3`
  text-align: center;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 0.3rem;
  width: fit-content;
  height: fit-content;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
`;

const CardList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  list-style-type: none;
  padding: 0;
  align-self: center;
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 7rem;
`;

const LinkWrapper = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
const CardListItem = styled.li`
  margin: auto;
  width: 100%;
  flex-shrink: 0;
  background-color: #fafafa;
  align-self: flex-end;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 0.7rem;
  position: relative;

  @media screen and (min-width: 600px) {
    margin-top: 2rem;
    min-height: 20rem;
  }
`;

const StyledButton = styled.button`
  background-image: url(${(props) => props.backgroundImageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: black;
  transition: transform 0.25s;
  border-radius: 0.8rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: scale(1.025);
  }
`;

const StyledDifficultyButton = styled.button`
  background-color: ${(props) => props.backgroundColor};
  background-size: cover;
  background-repeat: no-repeat;
  height: 100px;
  width: 100px;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: black;

  transition: transform 0.25s;
  border-radius: 0.8rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: scale(1.025);
  }
`;

const PrevButton = styled.button`
  width: 80px;
  height: 40px;
  background-color: #a97bb5;
  align-self: center;
  margin-top: 3rem;
  border-radius: 0.8rem;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const ResultsButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  height: 60px;
  padding: 0.5rem;
  color: white;
  background-color: #a97bb5;
  align-self: center;
  margin-top: 3rem;
  border-radius: 0.8rem;
  border: none;
  font-size: 1.1rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem;
  background-color: #fafafa;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  width: 200px;
  background-color: #a97bb5;
  color: white;
  text-decoration: none;
  border-radius: 0.8rem;
  font-size: 1.2rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    transform: scale(1.025);
  }
`;

const StyledMessage = styled.h3`
  font-size: 1.2rem;
  padding: 0.2rem;
  margin-bottom: 0.7rem;
  text-align: center;
`;

const TextBackground = styled.div`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 0.5rem;
  width: fit-content;
  margin: 0 auto;
  padding: 0.2rem;
`;

const MessageContainer = styled.div`
  padding: 0.7rem;
  border-radius: 0.8rem;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  background-color: #fafafa;
`;

const PrevIcon = styled(FontAwesomeIcon)`
  color: white;
  font-size: 1.2rem;
`;

export default function FilteredTour({
  ideas,
  onToggleFavourites,
  favouriteIdeas,
}) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);
  const [filteredIdeas, setFilteredIdeas] = useState([]);
  const [currentSection, setCurrentSection] = useState("materials");
  const [showNoIdeasMessage, setShowNoIdeasMessage] = useState(false);
  const [showResultsButton, setShowResultsButton] = useState(true);

  const fuse = new Fuse(ideas, {
    keys: ["hashtags"],
    minMatchCharLength: 3,
    threshold: 0.0,
  });

  const handleMaterialButtonClick = (material) => {
    if (!selectedMaterials.includes(material)) {
      setSelectedMaterials([...selectedMaterials, material]);
      setCurrentSection("forms");
    }
  };
  const handleFormButtonClick = (form) => {
    if (!selectedForms.includes(form)) {
      setSelectedForms([...selectedForms, form]);
      setCurrentSection("difficulties");
    }
  };
  const handleDifficultyButtonClick = (form) => {
    if (!selectedDifficulties.includes(form)) {
      setSelectedDifficulties([...selectedDifficulties, form]);
    }
  };

  const searchMaterials = () => {
    const filteredIdeas = ideas.filter((idea) => {
      return (
        idea.hashtags.some((tag) => selectedMaterials.includes(tag)) &&
        idea.hashtags.some((tag) => selectedForms.includes(tag)) &&
        idea.hashtags.some((tag) => selectedDifficulties.includes(tag))
      );
    });
    setFilteredIdeas(filteredIdeas);
    setShowNoIdeasMessage(filteredIdeas.length === 0);
    setShowResultsButton(false);
  };

  const isMaterialButtonHidden = () => {
    return selectedMaterials.length > 0 ? { display: "none" } : {};
  };

  const isFormButtonHidden = () => {
    return selectedForms.length > 0 ? { display: "none" } : {};
  };

  const isDifficultyButtonHidden = () => {
    return selectedDifficulties.length > 0 ? { display: "none" } : {};
  };

  function handleFormPrevious() {
    setCurrentSection("materials"), setSelectedMaterials([]);
    setShowNoIdeasMessage(false);
    setShowResultsButton(true);
  }
  function handleDifficultyPrevious() {
    setCurrentSection("forms"), setSelectedForms([]);
    setShowNoIdeasMessage(false);
    setShowResultsButton(true);
  }

  const renderMaterialsSection = () => {
    return (
      <Section>
        <Question>Which material do you want to upcycle?</Question>
        <ButtonContainer>
          <StyledButton
            onClick={() => handleMaterialButtonClick("wood")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1515446134809-993c501ca304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground> Wood</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("plastic")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://cdn.pixabay.com/photo/2020/05/04/10/31/the-bottle-5128607_1280.jpg"
          >
            <TextBackground> Plastic</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("cardboard")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://cdn.pixabay.com/photo/2019/02/07/12/17/packaging-3981072_1280.jpg"
          >
            <TextBackground> Cardboard</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("glass")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1569075857556-6e707cccc11f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground> Glass</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("metal")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1612058237353-6213b412a1c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground> Metal</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("paper")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1603484477859-abe6a73f9366?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground> Paper</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("textile")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://cdn.pixabay.com/photo/2015/12/19/02/12/texture-1099399_1280.jpg"
          >
            <TextBackground> Textile</TextBackground>
          </StyledButton>
        </ButtonContainer>
      </Section>
    );
  };

  const renderFormsSection = () => {
    return (
      <Section>
        <Question>What shape is your recycling object?</Question>{" "}
        <ButtonContainer>
          <StyledButton
            onClick={() => handleFormButtonClick("bottle")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1629227071576-e91767cc3024?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground>Bottle</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleFormButtonClick("cup")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1615485736894-a2d2e6d4cd9a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground>Cup</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleFormButtonClick("can")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1561924018-4f213bdc7364?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground>Can</TextBackground>
          </StyledButton>
          <StyledButton
            onClick={() => handleFormButtonClick("bag")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1597348989645-46b190ce4918?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            <TextBackground>Bag</TextBackground>
          </StyledButton>{" "}
        </ButtonContainer>
        <PrevButton onClick={handleFormPrevious}>
          <PrevIcon icon={faBackward} />
        </PrevButton>
      </Section>
    );
  };

  const renderDifficultiesSection = () => {
    return (
      <Section>
        {!selectedDifficulties.length > 0 ? (
          <Question>
            What level of difficulty should the upcycling ideas have?
          </Question>
        ) : (
          ""
        )}
        <ButtonContainer>
          <StyledDifficultyButton
            onClick={() => handleDifficultyButtonClick("easy")}
            style={isDifficultyButtonHidden()}
            backgroundColor="#6cbd76"
          >
            <TextBackground>Easy</TextBackground>
          </StyledDifficultyButton>
          <StyledDifficultyButton
            onClick={() => handleDifficultyButtonClick("medium")}
            style={isDifficultyButtonHidden()}
            backgroundColor="#e0792f"
          >
            <TextBackground> Medium</TextBackground>
          </StyledDifficultyButton>
          <StyledDifficultyButton
            onClick={() => handleDifficultyButtonClick("difficult")}
            style={isDifficultyButtonHidden()}
            backgroundColor="#e6413c"
          >
            <TextBackground> Difficult</TextBackground>
          </StyledDifficultyButton>
          <StyledDifficultyButton
            onClick={() => handleDifficultyButtonClick("profi")}
            style={isDifficultyButtonHidden()}
            backgroundColor="#a760e0"
          >
            <TextBackground>Profi</TextBackground>
          </StyledDifficultyButton>
        </ButtonContainer>
        {showResultsButton &&
        selectedDifficulties.length > 0 &&
        !filteredIdeas.length > 0 ? (
          <ResultsButton onClick={searchMaterials}>
            Show my Results <StyledIcon icon={faMagnifyingGlass} />
          </ResultsButton>
        ) : (
          ""
        )}
        {selectedDifficulties.length > 0 ? (
          ""
        ) : (
          <PrevButton onClick={handleDifficultyPrevious}>
            <PrevIcon icon={faBackward} />
          </PrevButton>
        )}
      </Section>
    );
  };

  return (
    <>
      <Selection>
        {currentSection === "materials" && renderMaterialsSection()}
        {currentSection === "forms" && renderFormsSection()}
        {currentSection === "difficulties" && renderDifficultiesSection()}
      </Selection>
      <Container>
        <CardList>
          {filteredIdeas.length > 0 &&
            filteredIdeas.map((filteredIdea) => (
              <LinkWrapper
                href={`/ideaDetails/${filteredIdea._id}`}
                aria-label={`Link to idea: ${filteredIdea.title}`}
                key={filteredIdea._id}
              >
                <CardListItem>
                  <Card
                    image={filteredIdea.image}
                    cover={filteredIdea.cover}
                    title={filteredIdea.title}
                    hashtags={filteredIdea.hashtags}
                    onToggleFavourites={onToggleFavourites}
                    favouriteIdeas={favouriteIdeas}
                    id={filteredIdea._id}
                  />
                </CardListItem>
              </LinkWrapper>
            ))}
          {showNoIdeasMessage && (
            <MessageContainer>
              <StyledMessage>Sorry, no matching idea found</StyledMessage>

              <StyledLink href="/">
                <p>Homepage</p>
                <FontAwesomeIcon icon={faSignsPost} />
              </StyledLink>
            </MessageContainer>
          )}
        </CardList>
      </Container>
    </>
  );
}
