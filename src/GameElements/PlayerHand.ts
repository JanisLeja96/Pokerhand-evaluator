import Card from './Card';

export class PlayerHand {

    private hand: Card[];

    constructor(firstCard: Card, secondCard: Card) {
        if (Card.areEqual(firstCard, secondCard)) {
            throw new Error('Cards cannot be the same');
        }
        this.hand = [firstCard, secondCard];
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