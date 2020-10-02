import Card from '../Card';
import { PlayerHand } from '../PlayerHand';

describe("Player's hand", () => {
    it('Must have two cards', () => {
        const playerHand = new PlayerHand(new Card('Q', 's'), new Card('K', 'd'));
        
        expect(playerHand.getCards().length).toEqual(2);
    });

    it('Should throw an error when cards are the same', () => {
        expect(() => {
            const playerHand = new PlayerHand(new Card('Q', 's'), new Card('Q', 's'));
        }).toThrowError();
    })
})