// Import all necsasarry libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
// Loads environment varibales from my.env file
dotenv.config();
// Creates my server
const app = express();
// helps communicate with frontend
app.use(cors());
app.use(express.json());
// Choses which port my server is using
const PORT = 3000;
// API key for the odds API
const API_KEY = process.env.API_KEY;
// Used to access the Supabase URL and Key to access my database
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

// NBA API to get the odds, team name and the different bets
app.get("/api/nba", async (req, res) => {
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/basketball_nba/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`,
  );
  const data = await response.json();
  res.json(data);
});

// MLB API also used to get the team name and different bets
app.get("/api/mlb", async (req, res) => {
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`,
  );
  const data = await response.json();
  res.json(data);
});

// NHL API used for same as MLB and NBA
app.get("/api/nhl", async (req, res) => {
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`,
  );
  const data = await response.json();
  res.json(data);
});

// Used to retrieve the saved bets from my Supabase
app.get("/api/bets", async (req, res) => {
    const { data, error } = await supabase
        .from("Bets")
        .select("*");
    if(error){
        res.status(500).json({
            error:error.message
        });
    } else {
        res.json(data);
    }
});

// Saves the bets from the website and posts them to the database
app.post("/api/bets", async (req, res) => {
  const { sport, team, odds, bet_type } = req.body;
  const { data, error } = await supabase.from("Bets").insert([
    {
      sport,
      team,
      odds,
      bet_type,
    },
  ]);
  if (error) {
    res.status(500).json({
      error: error.message,
    });
  } else {
    res.json(data);
  }
});

// Starts my backend server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
