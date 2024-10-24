const express = require('express');
const cors = require('cors');
const path = require('path'); // Importer le module path
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Servir des fichiers statiques à partir du dossier 'public'
app.use(express.static(path.join(__dirname, 'public'))); // Ajouter cette ligne

let games = []; // Pour stocker les jeux

app.post('/create-game', (req, res) => {
    const players = req.body.players;

    // Vérifier qu'il y a au moins 6 joueurs
    if (players.length < 6) {
        return res.status(400).json({ success: false, message: "Il faut au moins 6 joueurs pour créer une partie." });
    }

    // Trier les joueurs par rang pour équilibrer les équipes
    players.sort((a, b) => {
        const ranksOrder = {
            "Bronze I": 1, "Bronze II": 2, "Bronze III": 3,
            "Silver I": 4, "Silver II": 5, "Silver III": 6,
            "Gold I": 7, "Gold II": 8, "Gold III": 9,
            "Platinum I": 10, "Platinum II": 11, "Platinum III": 12,
            "Diamond I": 13, "Diamond II": 14, "Diamond III": 15,
            "Champion I": 16, "Champion II": 17, "Champion III": 18,
            "Grand Champion I": 19, "Grand Champion II": 20,
            "Grand Champion III": 21, "Supersonic Legend": 22
        };

        return ranksOrder[a.rank] - ranksOrder[b.rank];
    });

    // Création des équipes
    const team1 = [];
    const team2 = [];

    for (let i = 0; i < players.length; i++) {
        if (i % 2 === 0) {
            team1.push(players[i]);
        } else {
            team2.push(players[i]);
        }
    }

    const game = {
        id: games.length + 1,
        team1,
        team2
    };

    games.push(game);
    res.json({ success: true, game });
});

// Réinitialiser les jeux
app.post('/reset-games', (req, res) => {
    games = []; // Réinitialiser le tableau des jeux
    res.json({ success: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
