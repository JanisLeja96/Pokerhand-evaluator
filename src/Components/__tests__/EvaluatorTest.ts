import { Card } from '../../GameElements/Card';
import { PlayerHand } from '../../GameElements/PlayerHand';
import { PokerHand } from '../../GameElements/PokerHand';
import { Board } from '../../GameElements/Board';
import { InputParser } from '../InputParser';
import { Evaluator } from '../Evaluator';

describe('Evaluator', () => {
    it('Can compare hands', () => {
        const evaluator = new Evaluator();

        const pokerHandOne = new PokerHand(InputParser.createCards('AsAdAc2d3d'));
        const pokerHandOneValue = evaluator.getValue(pokerHandOne.getCards());

        const pokerHandTwo = new PokerHand(InputParser.createCards('KdQdJdTd9s'));
        const pokerHandTwoValue = evaluator.getValue(pokerHandTwo.getCards());

        expect(pokerHandOneValue > pokerHandTwoValue).toBeTruthy;
    });

    it('Can determine if there is a tie', () => {
        const evaluator = new Evaluator();

        const pokerHandOne = new PokerHand(InputParser.createCards('AsAdAc2d3d'));
        const pokerHandOneValue = evaluator.getValue(pokerHandOne.getCards());

        const pokerHandTwo = new PokerHand(InputParser.createCards('AsAdAc2s3c'));
        const pokerHandTwoValue = evaluator.getValue(pokerHandTwo.getCards());

        expect(pokerHandOneValue == pokerHandTwoValue).toBeTruthy;
    });

    it('Can create a pokerhand with 5 board cards', () => {
        const evaluator = new Evaluator();

        const board = InputParser.createBoard('4d5s6h7d8c');
        const playerCards = InputParser.createCards('9dTs');
        const playerHand = new PlayerHand(playerCards[0], playerCards[1]);
        let pokerHand = evaluator.createPokerHand(board, playerHand);
        pokerHand = new PokerHand(evaluator.sortCardsByRanks(pokerHand.getCards()));

        expect(pokerHand.toString()).toEqual('Ts9d8c7d6h');
    });

    
})