import { Board } from '../GameElements/Board';
import { Card } from '../GameElements/Card';
import { PlayerHand } from '../GameElements/PlayerHand';
import { InputParser } from './InputParser';
import { PokerHand } from '../GameElements/PokerHand';
import { Evaluator } from './Evaluator';
import { HandValues } from '../Interfaces/IHandValues';

export class Game {

    private board: Board;
    private hands: PlayerHand[];
    private takenCards: Card[];

    constructor(board: Board, ...hands: PlayerHand[]) {
        this.takenCards = [...board.getCards()];

        hands.forEach(hand => {
            this.takenCards = this.takenCards.concat(hand.getCards())
        });

        if (hands.length < 2) {
            throw new Error('Game must have at least 2 hands');
        } else if (this.takenCards.length != Card.removeDuplicates(this.takenCards).length) {
            throw new Error('Game cannot have duplicate cards');
        }

        this.board = board;
        this.hands = hands;
    }

    getBoard(): Board {
        return this.board;
    }

    getBoardCards(): Card[] {
        return this.board.getCards();
    }

    getHands(): PlayerHand[] {
        return this.hands
    }

    getTakenCards(): Card[] {
        return this.takenCards;
    }

    getPokerHands(): PokerHand[] {
        const pokerHands: PokerHand[] = [];

        for (let i = 0; i < this.hands.length; i++) {
            pokerHands.push((new Evaluator).createPokerHand(this.board, this.hands[i]));
        }
        return pokerHands;
    }

    sortByStrength(): [string, number][] {
        const evaluator = new Evaluator();
        const handValues: HandValues = {};

        for (let i = 0; i < this.getHands().length; i++) {
            handValues[this.getHands()[i].toString()] = evaluator.getValue(this.getPokerHands()[i].getCards());
        }

        const valuesArr = Object.entries(handValues).sort((a, b) => b[1] - a[1]);
        return valuesArr;
    }

    output(): string {
        const sortedHands = [...this.sortByStrength()];
        let output = '';
        const hands: string[] = [];
        
        for (let i = 0; i < sortedHands.length; i++) {
            hands.push(sortedHands[i][0]);
        }

        for (let i = 0; i < sortedHands.length; i++) {
            if (hands[i+1] && sortedHands[i][1] == sortedHands[i + 1][1]) {
                output += `${hands[i]}=${hands[i+1]} `;
                i++;
            } else {
                output += `${hands[i]} `;
            }
        }
        return output.trim();
    }

    static createFromString(input: string): Game {
        const board = InputParser.createBoard(input);
        const hands = InputParser.createHands(input);
        return new Game(board, ...hands);
    }

    printCurrentGame(): string {
        let output: string = '';
        output += this.board.toString();
        for (let hand of this.hands) {
            output += ' ' + hand.toString();
        }
        return output.trim();
    }
}