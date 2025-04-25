import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
const API_URL = "https://api.balldontlie.io/v1/"

const yourApiKey = "e16ee92f-9111-4a74-afa5-ef3b17ce63db";
const config = {
  headers: { Authorization: `${yourApiKey}` },
};

app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));

app.get("/", (req,res) =>{
    res.render("index.ejs");
});

app.post("/submit", async (req,res) =>{
    const randomPlayer = Math.floor(Math.random()*360)+1;
    const randomTeam = Math.floor(Math.random()*30)+1;
   try {
    const resultTeam = await axios(API_URL + "teams/" + randomTeam, config)
    const team = resultTeam.data.data.full_name
    const resultPlayer = await axios(API_URL + "players/" + randomPlayer, config)
    const playerName = `${resultPlayer.data.data.first_name}  ${resultPlayer.data.data.last_name}`;
    res.render("index.ejs", {team: team, player: playerName });

} catch (error) {
    res.render("index.ejs", {content : JSON.stringify(error.response.data)})    
}

}
);

app.listen(port, ()=>{
console.log(`The server listen to the port ${port}`);
});
