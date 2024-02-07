import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const team = [
  {
    image: "https://avatars.githubusercontent.com/u/149708083?v=4",
    forename: "Hendrik",
    username: "Hendrik-Pils",
    link: "https://github.com/Hendrik-Pils",
  },
  {
    image: "https://avatars.githubusercontent.com/u/149486750?v=4",
    forename: "Jore",
    username: "jore-averbeck",
    link: "https://github.com/jore-averbeck",
  },
  {
    image: "https://avatars.githubusercontent.com/u/68171149?v=4",
    forename: "Kevin",
    username: "kevinldg",
    link: "https://github.com/kevinldg",
  },
  {
    image: "https://avatars.githubusercontent.com/u/150039814?v=4",
    forename: "Sarah",
    username: "SarahJoyceMorgen",
    link: "https://github.com/SarahJoyceMorgen",
  },
];

const techs = [
  "React",
  "Next.js",
  "Node.js",
  "Vercel",
  "MongoDB",
  "Mongoose",
  "useSWR",
  "Cloudinary",
  "Font Awesome",
  "Fuse.js",
  "NextAuth.js",
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  margin-bottom: 15vh;
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const AboutCard = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 0 0.5rem black;
  width: fit-content;
  padding: 1rem;
  background-color: #fafafa;
  text-align: center;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledImage = styled(Image)`
  border-radius: 100%;
`;

const StyledLink = styled(Link)`
  color: black;

  &:hover {
    color: #ca92de;
  }
`;

const GithubLink = styled(Link)`
  text-decoration: none;

  padding: 0.5rem;
  border-radius: 0.5rem;

  background-color: black;
  color: white;

  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

const TechBadge = styled.p`
  padding: 0.5rem;
  border-radius: 0.25rem;
  background-color: white;
  color: black;
  box-shadow: 0 0 0.5rem black;
`;

export default function AboutPage() {
  return (
    <Wrapper>
      <h2>About the project</h2>
      <StyledContainer>
        <AboutCard>
          <p>
            An App for sharing upcycling ideas and improving sustainability.
          </p>
          <p>
            This app was a capstone project from Hendrik, Jore, Kevin and Sarah.
            Part of the course cgn-web-23-4 🐉 from the web development bootcamp
            by neue fische GmbH.
          </p>
          <StyledLink href="https://github.com/kevinldg/upcycling-app">
            To the GitHub repository
          </StyledLink>
        </AboutCard>
      </StyledContainer>
      <h2>Built by</h2>
      <StyledContainer>
        {team.map((member) => (
          <AboutCard key={uuidv4()}>
            <StyledImage
              src={member.image}
              alt={"Avatar from " + member.forename}
              width={192}
              height={192}
            />
            <h3>{member.forename}</h3>
            <h4>@{member.username}</h4>
            <GithubLink href={member.link}>
              <FontAwesomeIcon icon={faGithub} /> GitHub
            </GithubLink>
          </AboutCard>
        ))}
      </StyledContainer>
      <h2>Tech stack</h2>
      <StyledContainer>
        {techs.map((tech) => (
          <TechBadge key={uuidv4()}>{tech}</TechBadge>
        ))}
      </StyledContainer>
    </Wrapper>
  );
}
