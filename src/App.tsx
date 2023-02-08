import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import supabase from "./services/supabase";
import AllocationScreen from "./Pages/AllocationScreen";
import AuthScreen from "./Pages/Auth";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const session = await supabase.auth.getSession();
      setUser(session?.data.session?.user || null);
      setLoading(false);
      console.log("🚀 ~ file: App.tsx:10 ~ session", session);
    })();
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);
  return user ? <AllocationScreen /> : <AuthScreen />;
}

export default App;
