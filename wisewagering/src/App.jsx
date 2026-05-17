// Import all of my needed libraries
import { useEffect, useState } from "react";
import "./App.css";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)
// Imports the Pie function to create my pie chart in saved bets page
import { Pie } from 'react-chartjs-2'
// Main component of my website to allow it to run
function App() {
  // Set all of my variables and store data
    const [page, setPage] = useState("home");
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [savedBets, setSavedBets] = useState([]);
    // Function to load the odds for each sport
    async function loadOdds(sport) {
        setLoading(true);
        try {
            const response = await fetch(
                 `/api/${sport}`
            );
            const data = await response.json();
            console.log(data);
            if (Array.isArray(data)) {
                setGames(data.slice(0, 9));
            }
        } catch (error) {
            console.log("Error loading odds:", error);
        }
        setLoading(false);
    }
    // Used to get the saved bets from the Supabase
    async function getSavedBets(){
        try{
            const response = await fetch(
                '/api/bets'
            );
            const data = await response.json()
            setSavedBets(data)
        } catch(error){
            console.log(error);
        }   
    }
// Runs the code when react loads or changes anything
useEffect(() => {
    loadOdds("nba");
    getSavedBets();

}, []);
// Function that is meant to save the bets to Supabase
async function saveBet(
    sport,
    team,
    odds,
    bet_type
){
    try{
      // Request the backend server
        await fetch(
            '/api/bets',
            {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    sport,
                    team,
                    odds,
                    bet_type
                })
            }
        )
        alert('Bet Saved!')
        getSavedBets();
    } catch(error){
        console.log(error)
    }
}
// Counds the amount of bets made for each sport
const nbaCount =
    savedBets.filter(
        bet => bet.sport === 'NBA'
    ).length
const mlbCount =
    savedBets.filter(
        bet => bet.sport === 'MLB'
    ).length
const nhlCount =
    savedBets.filter(
        bet => bet.sport === 'NHL'
    ).length
    // Populates the chart with the data from Supabase
const chartData = {
    labels: [
        'NBA',
        'MLB',
        'NHL'
    ],
    datasets: [
        {
            label: 'Saved Bets',
            data: [
                nbaCount,
                mlbCount,
                nhlCount
            ],
            backgroundColor: [
                '#66ff33',
                '#ff7b00',
                '#00bfff'
            ]
        }
    ]
}
// Used to display all the components to the screen
return (
    <div className="app-container">
      <header>
        <div className="logo">
          <span>WiseWagering</span>
        </div>
        {/* Nav bar to load any of the pages */}
        <nav>
            <button onClick={() => setPage("home")}>Home</button>
            <button onClick={() => setPage("for-dummies")}>Betting For Dummies</button>
            <button onClick={() => setPage("about")}>About My Project</button>
            <button onClick={() => setPage("saved")}>Saved Bets</button>
        </nav>
      </header>
      {/* Creates the home page which is the title, what I do, and the buttons to pick which sport to load the odds for */}
      {page === "home" && (
        <>
          <section className="home">
            <div>
              <h1>WiseWagering: Learn Betting</h1>
              <p>
                Learn every fundamental you need for sports betting. Start saving bets to look back at later. There is not much
                sports going on right now so I limited it to NBA, MLB, and NHL.
              </p>
            </div>
          </section>
          {/* Buttons to load the sports data */}
          <section className="sportsBtns">
            <button onClick={() => {(setPage("nba"), loadOdds("nba"));}}>
                NBA
            </button>
            <button onClick={() => {(setPage("mlb"), loadOdds("mlb"));}}>
                MLB
            </button>
            <button onClick={() => {(setPage("nhl"), loadOdds("nhl"));}}>
                NHL
            </button>
          </section>
        </>
      )}
      {/* The for dummies page is the page where users can learn more about sports betting */}
      {page === "for-dummies" && (
        <section className="dummysection">
          <h1>BETTING FOR DUMMIES</h1>
          <div className="infoGrid">
            <div className="infoCard">
              <h2>Moneyline</h2>
              <p>Moneyline is chosing who is going to win the game.</p>
            </div>
            <div className="infoCard">
              <h2>Odds</h2>
              <p>
                Odds are very simple. When a team is + odds they are the underdog and you will win more money
                if that bet wins. If the odds are - then that team is the favorite and you will win less money
                if that bet wins. 
              </p>
            </div>
            <div className="infoCard">
              <h2>Spreads</h2>
              <p>
                Spreads are used to give each team a handicap. The team must win
                by x amount of points, or the team can not lose by x amount of
                points. For example, if a team is -3 then they must win by at
                least 3 points or more to win the bet. If the spread is +3 then
                the team must lose by less than three points or outright win the
                game for the bet to win.
              </p>
            </div>
            <div className="infoCard">
              <h2>Point Totals</h2>
              <p>
                The point total or over/under in the game is to bet if the total amount of
                points accumulated by both teams is over or under a point
                line. If you bet the over the total points must be over the line and vice versa for the under.
              </p>
            </div>
          </div>
        </section>
      )}
      {/* About page talks about my project and why I chose this project */}
      {page === "about" && (
        <section className="dummysection">
          <h1>About My Project</h1>
          <div className="infoGrid">
            <div className="infoCard">
              <h2>Why I Chose This Project</h2>
              <p>
                I chose this project because I have been into sports and sports betting for awhile now. 
                When I first started I had no clue what to do and my friends helped me fully understand the basics of betting.
              </p>
            </div>
            <div className="infoCard">
                <h2>Goal</h2>
                <p>
                    I wanted to create a sportsbook that would teach the new users how to bet and give them an understanding of the basics.                 
                    Instead of having to start with nothing like I did, I want to create a platform
                    to give users the best experience when learning how to bet. 
                </p>
            </div>
          </div>
        </section>
      )}
      {/* NBA Page that loads the games and the odds for the moneyline, spreads, and point totals */}
      {page === "nba" && (
        <section className="odds">
          <h1 className="sport">NBA</h1>
          {loading ? (
            <h2 className="loading-text">Loading Odds...</h2>
          ) : (
            <div className="oddsGrid">
              {games.map((game, index) => {
                const moneyline = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "h2h",
                );
                const spreads = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "spreads",
                );
                const totals = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "totals",
                );
                // Shows on screen the teams and the different bets that can be saved
                return (
                  <div className="oddsCard" key={index}>
                    <h2>{game.away_team}</h2>
                    <p>VS</p>
                    <h2>{game.home_team}</h2>
                    <div className="marketOdds">
                      <h3>Moneyline</h3>
                      {/* Button to click the data and save the bet to the Supabase */}
                      <div className="betBtns">
                        {moneyline?.outcomes?.map((team, i) => (
                          <button key={i} onClick={() => 
                            saveBet(
                                'NBA',
                                team.name,
                                team.price,
                                'Moneyline'
                            )
                        }>
                            {team.name}
                            <br />
                            {team.price > 0 ? `+${team.price}` : team.price}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="marketOdds">
                        <h3>Spread</h3>
                        <div className="betBtns">
                            {spreads?.outcomes?.map((spread, i) => (
                            <button key={i} onClick={() => 
                                saveBet(
                                    'NBA',
                                    spread.name,
                                    spread.price,
                                    'Spread'
                                )
                            }>
                            {spread.name} {spread.point > 0 ? "+" : ""}
                            {spread.point} (
                            {spread.price > 0 ? `+${spread.price}` : spread.price}
                            )
                            </button>
                      ))}
                        </div>
                    </div>
                    <div className="marketOdds">
                        <h3>Totals</h3>
                        <div className="betBtns">
                            {totals?.outcomes?.map((total, i) => (
                            <button key={i} onClick={() => 
                                saveBet(
                                    'NBA',
                                    total.name,
                                    total.price,
                                    'Totals'
                                )
                            }>
                            {total.name} {total.point} (
                            {total.price > 0 ? `+${total.price}` : total.price})
                            </button>
                            
                      ))}
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
      {/* MLB page which loads all of the MLB games and the odds for the different bets */}
      {page === "mlb" && (
        <section className="odds">
          <h1 className="sport">MLB</h1>
          {loading ? (
            <h2 className="loading-text">Loading Odds...</h2>
          ) : (
            <div className="oddsGrid">
              {games.map((game, index) => {
                const moneyline = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "h2h",
                );
                const spreads = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "spreads",
                );
                const totals = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "totals",
                );
                // Shows the different bets that can be placed
                return (
                  <div className="oddsCard" key={index}>
                    <h2>{game.away_team}</h2>
                    <p>VS</p>
                    <h2>{game.home_team}</h2>
                    <div className="marketOdds">
                      <h3>Moneyline</h3>
                      <div className="betBtns">
                        {moneyline?.outcomes?.map((team, i) => (
                          <button key={i} onClick={() => 
                            saveBet(
                                'MLB',
                                team.name,
                                team.price,
                                'Moneyline'
                            )
                        }>
                            {team.name}
                            <br />
                            {team.price > 0 ? `+${team.price}` : team.price}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="marketOdds">
                        <h3>Spread</h3>
                        <div className="betBtns">
                            {spreads?.outcomes?.map((spread, i) => (
                            <button key={i} onClick={() => 
                                saveBet(
                                    'MLB',
                                    spread.name,
                                    spread.price,
                                    'Spread'
                                )
                            }>
                            {spread.name} {spread.point > 0 ? "+" : ""}
                            {spread.point} (
                            {spread.price > 0 ? `+${spread.price}` : spread.price}
                            )
                            </button>
                      ))}
                        </div>
                    </div>
                    <div className="marketOdds">
                        <h3>Totals</h3>
                        <div className="betBtns">
                            {totals?.outcomes?.map((total, i) => (
                            <button key={i} onClick={() => 
                                saveBet(
                                    'MLB',
                                    total.name,
                                    total.price,
                                    'Totals'
                                )
                            }>
                            {total.name} {total.point} (
                            {total.price > 0 ? `+${total.price}` : total.price})
                            </button>
                      ))}
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
      {/* NHL Page which is the same as the other sports pages just with Hockey data */}
      {page === "nhl" && (
        <section className="odds">
          <h1 className="sport">NHL</h1>
          {loading ? (
            <h2 className="loading-text">Loading Odds...</h2>
          ) : (
            <div className="oddsGrid">
              {games.map((game, index) => {
                const moneyline = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "h2h",
                );
                const spreads = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "spreads",
                );
                const totals = game.bookmakers?.[0]?.markets?.find(
                  (market) => market.key === "totals",
                );
                
                return (
                  <div className="oddsCard" key={index}>
                    <h2>{game.away_team}</h2>
                    <p>VS</p>
                    <h2>{game.home_team}</h2>
                    <div className="marketOdds">
                      <h3>Moneyline</h3>
                      <div className="betBtns">
                        {moneyline?.outcomes?.map((team, i) => (
                          <button key={i} onClick={() => 
                            saveBet(
                              'NHL',
                              team.name,
                              team.price,
                              'Moneyline'
                            )
                          }>
                            {team.name}
                            <br />
                            {team.price > 0 ? `+${team.price}` : team.price}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="marketOdds">
                      <h3>Spread</h3>
                      <div className="betBtns">
                            {spreads?.outcomes?.map((spread, i) => (
                            <button key={i} onClick={() =>  
                                saveBet(
                                    'NHL',
                                    spread.name,
                                    spread.price,
                                    'Spread'
                                )
                            }>
                            {spread.name} {spread.point > 0 ? "+" : ""}
                            {spread.point} (
                            {spread.price > 0 ? `+${spread.price}` : spread.price}
                            )
                            </button>
                      ))}
                        </div>
                    </div>
                    <div className="marketOdds">
                        <h3>Totals</h3>
                        <div className="betBtns">
                            {totals?.outcomes?.map((total, i) => (
                                <button key={i} onClick={() => 
                                    saveBet(
                                        'NHL',
                                        total.name,
                                        total.price,
                                        'Totals'
                                    )
                                }>
                                {total.name} {total.point} (
                                {total.price > 0 ? `+${total.price}` : total.price})
                                </button>
                      ))}
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}
      {/* Saved bets section that uses chart.js to display a pie chart with the percent of bets placed for each sport and show a table with all of the bets */}
    {page === "saved" && (
        <section className="savedSection">
            <h1>Saved Bets</h1>
            {/* Pie chart to use chart.js that shows how the total bets are divided per sport */}
            <div className="chartContainer">
            <Pie data={chartData} />
            </div>
            <table className="betsTable">
                <thead>
                    <tr>
                        <th>Sport</th>
                        <th>Team</th>
                        <th>Bet Type</th>
                        <th>Odds</th>
                    </tr>
                </thead>
                <tbody>
                {savedBets.map((bet, index) => (
                    <tr key={index}>
                        <td>{bet.sport}</td>
                        <td>{bet.team}</td>
                        <td>{bet.bet_type}</td>
                        <td>{bet.odds}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </section>
)}
    </div>
  );
}
export default App;
