import React from "react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import supabase from "../../services/supabase";

const AuthScreen = () => {
  return (
    <section
      style={{ display: "flex", justifyContent: "center", width: "100%" }}
    >
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            input: { minWidth: "45vmin", color: "#fff" },
            message: { color: "#fff" },
          },
        }}
        providers={["google", "facebook", "twitter"]}
      />
    </section>
  );
};

export default AuthScreen;
