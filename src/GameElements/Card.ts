import { IValue } from "../Interfaces/IValue";

export class Card {
    
    private rank: string;
    private rankValue: number;

    private suit: string;
    private suitValue: number;

    private static validRanks: string[] = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
    private static validSuits: string[] = ['s', 'h', 'c', 'd'];

    private static values : IValue = {
        '2': 2,
        '3': 3,
        '4': 5,
        '5': 7,
        '6': 9,
        '7': 11,
        '8': 13,
        '9': 17,
        'T': 19,
        'J': 23,
        'Q': 29,
        'K': 31,
        'A': 37,
        'c': 41,
        'h': 43,
        'd': 47,
        's': 53
    };

    constructor(rank: string, suit: string) {
        if (!Card.validRanks.includes(rank) || !Card.validSuits.includes(suit)) {
            throw new Error('Invalid card entered!' + ' Source: ' + rank);
        }
        this.rank = rank;
        this.suit = suit;
        this.rankValue = Card.values[rank];
        this.suitValue = Card.values[suit];
    }
    
    toString(): string {
        return this.rank + this.suit;
    }

    getRankValue(): number {
        return this.rankValue;
    }

    getSuitValue(): number {
        return this.suitValue;
    }

    getRank(): string {
        return this.rank;
    }

    getSuit(): string {
        return this.suit;
    }

    static areEqual(first: Card, second: Card): boolean {
        return first.rank == second.rank && first.suit == second.suit;
    }

    static removeDuplicates(cards: Card[]): Card[] {
        return cards.filter((v,i,a)=>a.findIndex(t=>(t.suit === v.suit && t.rank===v.rank))===i);
    }
}