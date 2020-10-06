import { Card } from './src/GameElements/Card';
import { Board } from './src/GameElements/Board';
import { PlayerHand } from './src/GameElements/PlayerHand';
import { Game } from './src/Components/Game';
import { InputParser } from './src/Components/InputParser';
import { Evaluator } from './src/Components/Evaluator';
import fs from 'fs';

const gameStringArr = fs.readFileSync('games.txt').toString().split("\n");

gameStringArr.forEach(gameString => {
    console.log(Game.createFromString(gameString).output());
})

