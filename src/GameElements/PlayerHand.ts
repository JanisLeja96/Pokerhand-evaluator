import Card from './Card';

export class PlayerHand {

    private hand: Card[];

    constructor(firstCard: Card, secondCard: Card) {
        if (firstCard == secondCard) {
            throw new Error('Cards cannot be the same');
        }
        this.hand = [firstCard, secondCard];
    }

    getCards(): Card[] {
        return this.hand;
    }

    toString(): string {
        const output = '';
        this.hand.forEach(card => output.concat(card.toString()));
        return output;
    }

}