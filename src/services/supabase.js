import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://fitdmjpnjogibrivtcsn.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpdGRtanBuam9naWJyaXZ0Y3NuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc5NjYwOTksImV4cCI6MjA0MzU0MjA5OX0.JMTtbpu9GHpogjmdpNsk1xOfvsEp7BkX8XYKTQXP5Yw";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
