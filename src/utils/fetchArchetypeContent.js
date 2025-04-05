import { supabase } from "@/lib/supabase";  // Import supabase client

// Function to fetch archetype-specific content: teachings, reflections, rituals
export const fetchArchetypeContent = async (archetype, setTeachings, setReflections, setRituals) => {
  try {
    // Fetch teachings
    const { data: teachings, error: teachingsError } = await supabase
      .from("library_entries")
      .select("*")
      .eq("category", "teachings")
      .eq("archetype", archetype);

    if (teachingsError) {
      console.error("Error fetching teachings:", teachingsError.message);
    } else {
      setTeachings(teachings); // Set teachings to state
    }

    // Fetch reflections
    const { data: reflections, error: reflectionsError } = await supabase
      .from("library_entries")
      .select("*")
      .eq("category", "reflections")
      .eq("archetype", archetype);

    if (reflectionsError) {
      console.error("Error fetching reflections:", reflectionsError.message);
    } else {
      setReflections(reflections); // Set reflections to state
    }

    // Fetch rituals
    const { data: rituals, error: ritualsError } = await supabase
      .from("library_entries")
      .select("*")
      .eq("category", "rituals")
      .eq("archetype", archetype);

    if (ritualsError) {
      console.error("Error fetching rituals:", ritualsError.message);
    } else {
      setRituals(rituals); // Set rituals to state
    }

  } catch (err) {
    console.error("Error fetching content:", err);
  }
};
