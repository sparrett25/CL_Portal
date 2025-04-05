import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArchetypeContent } from "@/utils/fetchArchetypeContent";

const ArchetypeTeachingsPage = () => {
  const { archetype } = useParams();
  const [teachings, setTeachings] = useState([]);

  useEffect(() => {
    fetchArchetypeContent(archetype, setTeachings);
    console.log("Fetching teachings for archetype:", archetype); // Log the archetype
  }, [archetype]);

  return (
    <div>
      <h1>Teachings for {archetype}</h1>
      {teachings.map((teaching) => (
        <div key={teaching.id}>
          <h3>{teaching.title}</h3>
          <p>{teaching.body}</p>
        </div>
      ))}
    </div>
  );
};

export default ArchetypeTeachingsPage;
