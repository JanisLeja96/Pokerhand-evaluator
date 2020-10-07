import { Board } from '../../GameElements/Board';
import { InputParser } from '../InputParser';

describe('Inputparser', () => {
    it('Returns board from string', () => {
        const board = InputParser.createBoard('2d3d4d5d6d 7d8d 9dTd');

        expect(board.toString()).toEqual('2d3d4d5d6d');
    });

    it('Returns hands from string', () => {
        const hands = InputParser.createHands('2d3d4d5d6 7d8d 9dTd');

        expect(hands[0].toString()).toEqual('7d8d');
        expect(hands[1].toString()).toEqual('9dTd');
    });

    it('Returns cards from string', () => {
        const cards = InputParser.createCards('2d3d4d5d6d');

        expect(cards.toString()).toEqual('2d,3d,4d,5d,6d');
    })
})