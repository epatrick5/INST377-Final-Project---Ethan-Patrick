// Import the Supabase client to interact with the database
import { createClient } from "@supabase/supabase-js";
// Create the client that holds the supabase URL and the public API key for authentication
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
// Gets the bets from the database 
export default async function handler(req, res) {
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("Bets")
      .select("*");
    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }
    return res.status(200).json(data);
  }
// Sends the bets to the database after a user clicks on a bet
  if (req.method === "POST") {
    const { sport, team, odds, bet_type } = req.body;
    const { data, error } = await supabase
      .from("Bets")
      .insert([
        {
          sport,
          team,
          odds,
          bet_type
        }
      ]);
    if (error) {
      return res.status(500).json({
        error: error.message
      });
    }
    return res.status(200).json(data);
  }
}