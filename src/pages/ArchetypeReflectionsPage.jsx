import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArchetypeContent } from "@/utils/fetchArchetypeContent";

const ArchetypeReflectionsPage = () => {
  const { archetype } = useParams();
  const [reflections, setReflections] = useState([]);

  useEffect(() => {
    fetchArchetypeContent(archetype, null, setReflections);
    console.log("Fetching reflections for archetype:", archetype); // Log the archetype
  }, [archetype]);

  return (
    <div>
      <h1>Reflections for {archetype}</h1>
      {reflections.map((reflection) => (
        <div key={reflection.id}>
          <h3>{reflection.title}</h3>
          <p>{reflection.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ArchetypeReflectionsPage;
