import { Card } from './Card';

export class PokerHand {

    private hand: Card[];

    constructor(cards: Card[]) {
        if (cards.length != 5) {
            throw new Error('Poker hand must consist of 5 cards');
        }
        this.hand = cards;
    }

    getCards(): Card[] {
        return this.hand;
    }

    toString(): string {
        let output = '';
        this.hand.forEach(card => output += card.toString());
        return output;
    }

}