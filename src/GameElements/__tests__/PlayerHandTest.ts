import Card from '../Card';
import { PlayerHand } from '../PlayerHand';

describe("Player's hand", () => {
    it('Must have two cards', () => {
        const playerHand = new PlayerHand(new Card('Q', 's'), new Card('K', 'd'));
        
        expect(playerHand.getCards().length).toEqual(2);
    });

    it('Should throw an error when cards are the same', () => {
        expect(() => {
            new PlayerHand(new Card('Q', 's'), new Card('Q', 's'));
        }).toThrowError();
    });

    it('Can print both cards as string', () => {
        const playerHand = new PlayerHand(new Card('Q', 'd'), new Card('Q', 's'));

        expect(playerHand.toString()).toEqual('QdQs');
    })
})