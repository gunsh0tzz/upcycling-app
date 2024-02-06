import Image from "next/image";
import Fuse from "fuse.js";
import { useState } from "react";

export default function FilteredTour({ ideas }) {
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedForms, setSelectedForms] = useState([]);

  const fuse = new Fuse(ideas, {
    keys: ["hashtags"],
    minMatchCharLength: 3,
    threshold: 0.0,
  });

  const handleMaterialButtonClick = (material) => {
    if (!selectedMaterials.includes(material)) {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const handleFormButtonClick = (form) => {
    if (!selectedForms.includes(form)) {
      setSelectedForms([...selectedForms, form]);
    }
  };

  const searchMaterials = () => {
    const filteredIdeas = ideas.filter((idea) => {
      return (
        idea.hashtags.some((tag) => selectedMaterials.includes(tag)) &&
        idea.hashtags.some((tag) => selectedForms.includes(tag))
      );
    });

    console.log(filteredIdeas);
  };

  console.log("Materials" + selectedMaterials);
  console.log("Forms" + selectedForms);
  return (
    <>
      <section>
        <h2>Material</h2>
        <button onClick={() => handleMaterialButtonClick("wood")}>
          <Image
            src="https://images.unsplash.com/photo-1515446134809-993c501ca304?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="wood"
            width={100}
            height={100}
          />
        </button>
        <button onClick={() => handleMaterialButtonClick("PET")}>
          <Image
            src="https://images.unsplash.com/photo-1576037728058-ab2c538ac8d0?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="plastic"
            width={100}
            height={100}
          />
        </button>
        <button onClick={() => handleMaterialButtonClick("cardboard")}>
          <Image
            src="https://images.unsplash.com/photo-1624137527136-66e631bdaa0e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="cardboard"
            width={100}
            height={100}
          />
        </button>
        <button onClick={() => handleMaterialButtonClick("glass")}>
          <Image
            src="https://images.unsplash.com/photo-1542661206-03e9001692de?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="glass"
            width={100}
            height={100}
          />
        </button>
      </section>

      <section>
        <h2>Form</h2>
        <button onClick={() => handleFormButtonClick("bottle")}>
          <Image
            src="https://images.unsplash.com/photo-1571727153934-b9e0059b7ab2?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="bottle"
            width={100}
            height={100}
          />
        </button>
        <button onClick={() => handleFormButtonClick("cup")}>
          <Image
            src="https://images.unsplash.com/photo-1575026469075-99e9e3433e72?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="cup"
            width={100}
            height={100}
          />
        </button>
        <button onClick={() => handleFormButtonClick("can")}>
          <Image
            src="https://images.unsplash.com/photo-1561924018-4f213bdc7364?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="can"
            width={100}
            height={100}
          />
        </button>
        <button onClick={() => handleFormButtonClick("bag")}>
          <Image
            src="https://images.unsplash.com/photo-1597348989645-46b190ce4918?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="bag"
            width={100}
            height={100}
          />
        </button>
      </section>

      <button onClick={searchMaterials}>Results</button>
    </>
  );
}
