import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Ensure your Supabase client is configured

export default function useRituals() {
  const [rituals, setRituals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRituals() {
      setLoading(true);
      const { data, error } = await supabase.from("rituals").select("*").order("title");
      if (error) {
        setError(error);
        setLoading(false);
      } else {
        setRituals(data);
        setLoading(false);
      }
    }

    fetchRituals();
  }, []);

  return { rituals, loading, error };
}
