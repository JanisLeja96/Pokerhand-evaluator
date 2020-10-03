import { Card } from '../Card';
import { Board } from '../Board';


describe('Board', () => {
    it('Can only be created with 5 cards', () => {
        expect(() => {
            new Board([
                new Card('Q', 's'),
                new Card('Q', 'd'), 
                new Card('K', 'd')
            ]);
        }).toThrowError();
    });

    it('Can be printed', () => {
        const board = new Board([
            new Card('Q', 's'),
            new Card('K', 'd'),
            new Card('A', 's'),
            new Card('J', 'd'),
            new Card('A', 'h')
        ]);

        expect(board.toString()).toEqual('QsKdAsJdAh');
    });

    it('Must not allow duplicate cards', () => {
        expect(() => {
            new Board([
                new Card('Q', 'd'),
                new Card('Q', 'd'),
                new Card('K', 'c'),
                new Card('A', 's'),
                new Card('J', 'c')
            ])
        }).toThrowError();
    })
}) 