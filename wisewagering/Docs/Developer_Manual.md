# Developer Manual

1. To download my program you need to first clone my repository into your own personal 
repository. After cloning you need to make sure you download my project by going into
wisewagering file and executing "npm install" THis will install all necassary packages 
needed to run my program. You also need to go into the server file and execute "npm instll"
to download everything necassary for the server to run. 

2. When running this app it primarly uses Vercel to deploy the server. My frontend is main vite and react
but the server is taken care of through Vercel. To run the server through vercel just click the link in the previous readme. To run locally you must have access to my credentials (which I will not give out)

3. When running the website the main project testing includes the bets, odds, and the correct teams. 
Secondly, you want to make sure all of the sports were loaded in correctly. Moreover, save a bet by clicking 
which bet you want to add to the supabase and make sure that it was added correctly by going to the 
saved bets section. This will also have a pie chart using chart.js so make sure that loads correctly
and there is no error when using the chart.js. 

4. I have multiple API endpoints however, some of them do the same thing jsut with different data. 
First I have GET/API/NBA, GET/API/MLB, and GET/API/NHL. Each of these are used to get the bets for each game, 
odds for each bet, as well as the teams and the matchups. Secondly, I have the GET/API/Bets. This
is used to get the saved bets from the Supabase. After the data sent to the website it is displayed on 
a table in the saved bets section. Lastly, I have the POST/API/Bets. My post is used to send the saved bet data
to the Supabase and saved for later. the required info is the bet, odds, sport, and team.

5. There are some known bugs that I want to fix in the future. First, is the database in Supabase is 
currently used globally so anyone that saves a bet will have their data in the database. I want to 
make this private so it is unique for each of the users. Next, the Odds API I used has limited tickets
so eventually the key will run out and a new key will be needed. Third, the API may not provide odds and 
bets for every game in every sport. Fourth, I only wanted to do three sports that are currently on 
because I did not want to run out of API credits, and save my sanity instead of adding lots of sports lol. 
For the future there are many things that I want to add to make this website a better website. First, I want 
to have user accounts that saves their own data, user authentication, and allow the users to bet. Secondly, I 
wanted to add parlays that allow the users to add mutliple bets into one ticket but I could not figure that out 
and want to add that into the future. Third, I want to add live odds that shows the scores for each of the games
currently going on and show the odds and bets while the game is on. Lastly, I want to add searching and sorting
that allows the user to look up a specific team, bet, sport, and anything else in the sportsbook. 