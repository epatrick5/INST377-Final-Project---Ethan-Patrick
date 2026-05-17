// MLB API also used to get the team name and different bets
export default async function handler(req, res) {
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/baseball_mlb/odds/?apiKey=${process.env.API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
  );
  const data = await response.json();
  res.status(200).json(data);
}