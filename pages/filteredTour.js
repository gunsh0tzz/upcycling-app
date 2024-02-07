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
  margin: 1rem 0.5rem 0.5rem 1rem;
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
  font-size: 1.2rem;
  /* color: white; */
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
  width: 110px;
  height: 50px;
  padding: 0.5rem;
  color: white;
  background-color: #a97bb5;
  align-self: center;
  margin-top: 3rem;
  border-radius: 0.8rem;
  border: none;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
`;

const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
`;

const StyledLink = styled(Link)`
  padding: 0.5rem;
  background-color: #fafafa;
  display: flex;
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
            Wood
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("plastic")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1576037728058-ab2c538ac8d0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Plastic
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("cardboard")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1624137527136-66e631bdaa0e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Cardboard
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("glass")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1542661206-03e9001692de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Glass
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("metal")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1612058237353-6213b412a1c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Metal
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("paper")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1603484477859-abe6a73f9366?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Paper
          </StyledButton>
          <StyledButton
            onClick={() => handleMaterialButtonClick("textile")}
            style={isMaterialButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1591195854242-8804547cdcab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Textile
          </StyledButton>
        </ButtonContainer>
      </Section>
    );
  };

  const renderFormsSection = () => {
    return (
      <Section>
        <Question>What shape has your recycling object?</Question>{" "}
        <ButtonContainer>
          <StyledButton
            onClick={() => handleFormButtonClick("bottle")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1571727153934-b9e0059b7ab2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Bottle
          </StyledButton>
          <StyledButton
            onClick={() => handleFormButtonClick("cup")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1575026469075-99e9e3433e72?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Cup
          </StyledButton>
          <StyledButton
            onClick={() => handleFormButtonClick("can")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1561924018-4f213bdc7364?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Can
          </StyledButton>
          <StyledButton
            onClick={() => handleFormButtonClick("bag")}
            style={isFormButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1597348989645-46b190ce4918?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Bag
          </StyledButton>{" "}
        </ButtonContainer>
        <PrevButton onClick={handleFormPrevious}>
          <FontAwesomeIcon icon={faBackward} />
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
          <StyledButton
            onClick={() => handleDifficultyButtonClick("easy")}
            style={isDifficultyButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1519606247872-0440aae9b827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Easy
          </StyledButton>
          <StyledButton
            onClick={() => handleDifficultyButtonClick("medium")}
            style={isDifficultyButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1519606247872-0440aae9b827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Medium
          </StyledButton>
          <StyledButton
            onClick={() => handleDifficultyButtonClick("difficult")}
            style={isDifficultyButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1519606247872-0440aae9b827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Difficult
          </StyledButton>
          <StyledButton
            onClick={() => handleDifficultyButtonClick("profi")}
            style={isDifficultyButtonHidden()}
            backgroundImageUrl="https://images.unsplash.com/photo-1519606247872-0440aae9b827?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
            Profi
          </StyledButton>
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
            <FontAwesomeIcon icon={faBackward} />
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
            <>
              <StyledMessage>Sorry, no matching idea found</StyledMessage>

              <StyledLink href="/">
                <p>Homepage</p>
                <FontAwesomeIcon icon={faSignsPost} />
              </StyledLink>
            </>
          )}
        </CardList>
      </Container>
    </>
  );
}
