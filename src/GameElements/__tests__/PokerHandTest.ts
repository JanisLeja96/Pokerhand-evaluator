import { Card } from '../Card';
import { PokerHand } from '../PokerHand';

describe('Poker hand', () => {
    it('Poker hand must consist of exactly five cards', () => {
        expect(() => {
            new PokerHand([
                new Card('Q', 'd'),
                new Card('Q', 's'),
                new Card('T', 'd')
            ]);
        }).toThrowError();
    });

    it('Can be printed', () => {
        const pokerHand = new PokerHand([
            new Card('Q', 'd'),
            new Card('K', 'c'),
            new Card('J', 's'),
            new Card('T', 's'),
            new Card('6', 'd')
        ]);

        expect(pokerHand.toString()).toEqual('QdKcJsTs6d');
    })
})