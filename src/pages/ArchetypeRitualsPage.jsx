import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArchetypeContent } from "@/utils/fetchArchetypeContent";  // Import the function to fetch archetype content

const ArchetypeRitualsPage = () => {
  const { archetype } = useParams();
  const [rituals, setRituals] = useState([]);

  useEffect(() => {
    fetchArchetypeContent(archetype, null, null, setRituals); // Fetch rituals based on archetype
    console.log("Fetching rituals for archetype:", archetype); // Log the archetype being fetched
  }, [archetype]);

  return (
    <div>
      <h1>Rituals for {archetype}</h1>
      {rituals.map((ritual) => (
        <div key={ritual.id}>
          <h3>{ritual.title}</h3>
          <p>{ritual.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ArchetypeRitualsPage;
