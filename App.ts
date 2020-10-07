import { Card } from './src/GameElements/Card';
import { Board } from './src/GameElements/Board';
import { PlayerHand } from './src/GameElements/PlayerHand';
import { Game } from './src/Components/Game';
import { InputParser } from './src/Components/InputParser';
import { Evaluator } from './src/Components/Evaluator';
import readline from 'readline';

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.question('Enter cards:\n', (cardsAsString) =>{
    const game = Game.createFromString(cardsAsString);
    console.log('Result: ' + game.output());
    input.close();
});