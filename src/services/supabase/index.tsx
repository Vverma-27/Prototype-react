import { createClient } from "@supabase/supabase-js";

console.log(process.env);
const supabaseUrl = process.env.REACT_APP_API_URI || "";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
