import { createClient } from "@supabase/supabase-js";
//
// const options = {
//   schema: 'public',
//   headers: { 'x-my-custom-header': 'my-app-name' },
//   autoRefreshToken: true,
//   persistSession: true,
//   detectSessionInUrl: true
// }
//
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
export default supabase;
