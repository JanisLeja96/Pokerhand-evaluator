import { Game } from '../Game';
import { PokerHand } from '../../GameElements/PokerHand';
import { PlayerHand } from '../../GameElements/PlayerHand';
import { Card } from '../../GameElements/Card';
import { Board } from '../../GameElements/Board';
import { Evaluator } from '../Evaluator';

describe('Game', () => {
    it('Game must have all game elements', () => {
        const board = new Board([
            new Card('Q', 's'),
            new Card('T', 'c'),
            new Card('Q', 'c'),
            new Card('6', 's'),
            new Card('9', 'c')
        ]);
        const handOne = new PlayerHand(new Card('7', 'd'), new Card('3', 'c'));
        const handTwo = new PlayerHand(new Card('A', 'c'), new Card('A', 's'));
        const game = new Game(board, handOne, handTwo);
        
        expect(board).toEqual(game.getBoard());
        expect(handOne).toEqual(game.getHands()[0]);
        expect(handTwo).toEqual(game.getHands()[1]);
    });

    it('Game must have at least two hands', () => {
        expect(() => {
            const board = new Board([
                new Card('Q', 's'),
                new Card('T', 'c'),
                new Card('Q', 'c'),
                new Card('6', 's'),
                new Card('9', 'c')
            ]);
            const handOne = new PlayerHand(new Card('7', 'd'), new Card('3', 'c'));
            const game = new Game(board, handOne);
        }).toThrowError();
    });

    it('Game can print current cards', () => {
        const board = new Board([
            new Card('Q', 's'),
            new Card('T', 'c'),
            new Card('Q', 'c'),
            new Card('6', 's'),
            new Card('9', 'c')
        ]);
        const handOne = new PlayerHand(new Card('7', 'd'), new Card('3', 'c'));
        const handTwo = new PlayerHand(new Card('A', 'c'), new Card('A', 's'));
        const game = new Game(board, handOne, handTwo);

        expect(game.printCurrentGame()).toEqual('QsTcQc6s9c 7d3c AcAs');
    });

    it('Game can be created from string', () => {
        const input = 'KdAsJcTd7d 2d3d 5d6d';
        const game = Game.createFromString(input);

        expect(game.printCurrentGame()).toEqual(input);
    });

    it('Keeps track of taken cards', () => {
        const input = '2d3d4d5d6d 7d8d 9dTd';
        const game = Game.createFromString(input);

        expect(game.getTakenCards().toString()).toEqual('2d,3d,4d,5d,6d,7d,8d,9d,Td');
    });

    it('Does not allow duplicate cards', () => {
        expect(() => {
            Game.createFromString('2d3d4d5d6d 7d8d 2d3d');
        }).toThrowError();
    });

    it('Can create pokerhand for each player', () => {
        const game = Game.createFromString('8d9cTcJcQc 8cTh KcTd');
        const pokerHands = game.getPokerHands();
        
        expect(pokerHands[0].toString()).toEqual('QcJcTc9c8c');
        expect(pokerHands[1].toString()).toEqual('KcQcJcTc9c');
    });

    it('Can determine the winning hand', () => {
        const evaluator = new Evaluator();
        const game = Game.createFromString('2h3h4h5d8d KdKs 9hJh');
        const winnerValue = evaluator.getValue(game.getPokerHands()[1].getCards());
        const winningString = game.sortByStrength().filter(combination => combination.includes(winnerValue))[0][0];

        expect(winningString).toEqual('9hJh');
    });

    it('Can output hands by strength', () => {
        const game = Game.createFromString('8d9c8cKcQc TcTd ThJc');

        expect(game.output()).toEqual('TcTd ThJc');
    });

    it('Can output hands by strength when there is a tie', () => {
        const game = Game.createFromString('AdKdQdJd9d TcTd ThJc 7d6d');

        expect(game.output() == '7d6d=ThJc TcTd' || game.output() == 'ThJc=7d6d TcTd').toBeTruthy();
    })
})