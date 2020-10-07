import { Board } from '../GameElements/Board';
import { Card } from '../GameElements/Card';
import { PlayerHand } from '../GameElements/PlayerHand';
export class InputParser {

    public static createBoard(input: string): Board {
        const inputArray = input.split(' ');

        const boardString = inputArray[0];
        const boardCardsAsStringArray = [];

        for (let i = 0; i < boardString.length / 2; i++) {
            boardCardsAsStringArray.push(boardString.substr(i*2, 2));
        }

        const boardArray = [];
        for (let cards of boardCardsAsStringArray) {
            boardArray.push(new Card(cards[0], cards[1]));
        }

        return new Board(boardArray);
    }

    public static createHands(input: string): PlayerHand[] {
        const inputArray = input.split(' ');
        
        const hands = [];
        const handsStringArray = inputArray.splice(1);
        for (let hand of handsStringArray) {
            hands.push(new PlayerHand(new Card(hand[0], hand[1]), new Card(hand[2], hand[3])));
        }
        
        return hands;
    }

    public static createCards(input: string): Card[] {
        const inputArray = input.replace(/([0-9A-Z])/g, " $1").trim().split(' ');

        const cards = [];
        for (let card of inputArray) {
            cards.push(new Card(card[0], card[1]));
        }
        return cards;
    }
}