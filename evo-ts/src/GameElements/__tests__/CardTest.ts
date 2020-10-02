import Card from "../Card";

describe('Card', () => {
    it('Can be created', () => {
        const card = new Card('Q', 's');

        expect(card.toString()).toEqual('Qs');
    });
    
    it('Throws error when invalid parameters are given', () => {

        expect(() => {
            new Card('s', 's');
        }).toThrow('Invalid card entered!');
    });

    it('Has value based on rank', () => {
        const card = new Card('2', 's');

        expect(card.getRankValue()).toEqual(2);
    });

    it('Has value based on suit', () => {
        const card = new Card('2', 's');

        expect(card.getSuitValue()).toEqual(53);
    })
})