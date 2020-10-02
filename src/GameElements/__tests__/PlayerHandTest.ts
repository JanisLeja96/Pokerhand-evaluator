import Card from '../Card';
import { PlayerHand } from '../PlayerHand';

describe("Player's hand", () => {
    it('Must have two cards', () => {
        const playerHand = new PlayerHand(new Card('Q', 's'), new Card('K', 'd'));
        
        expect(playerHand.getCards().length).toEqual(2);
    })
})