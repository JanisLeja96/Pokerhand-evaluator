import { Game } from './src/Core/Game';
import readline from 'readline';

const input = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

input.question('Enter cards:\n', (cardsAsString) =>{
    try {
        const game = Game.createFromString(cardsAsString);
        console.log('Result: ' + game.output());
    } catch (error) {
        console.log(error.message)
    }
    input.close();
});