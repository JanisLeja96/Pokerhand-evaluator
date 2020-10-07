import { Game } from './src/Components/Game';
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