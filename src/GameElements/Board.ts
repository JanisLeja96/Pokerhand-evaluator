import { Card } from './Card';

export class Board {

    private cards: Card[];

    constructor(cards: Card[]) {
        if (cards.length != 5) {
            throw new Error('Board must have 5 cards');
        } else if (Card.removeDuplicates(cards).length != cards.length) {
            throw new Error('Board cannot have duplicate cards');
        }
        this.cards = cards;
    }

    getCards(): Card[] {
        return this.cards;
    }

    toString(): string {
        let output = '';
        for (let card of this.cards) {
            output += card.toString();
        }
        return output;
    }
}