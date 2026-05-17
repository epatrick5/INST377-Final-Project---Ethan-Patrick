// NHL API used for same as MLB and NBA
export default async function handler(req, res) {
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/icehockey_nhl/odds/?apiKey=${process.env.API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
  );

  const data = await response.json();

  res.status(200).json(data);
}