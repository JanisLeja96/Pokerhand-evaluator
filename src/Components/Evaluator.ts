import { Card } from '../GameElements/Card';
import { PlayerHand } from '../GameElements/PlayerHand';
import { PokerHand } from '../GameElements/PokerHand';
import { Board } from '../GameElements/Board';
import { HandValues } from '../Interfaces/IHandValues';
import { InputParser } from './InputParser';

export class Evaluator {
    
    private rankings: number[] = [];
    private done: number = 1;
    private cards: Card[];

    private highest: number = 0;
    private bestHand: Card[] | undefined;

    constructor() {
        this.cards = [
            new Card('2', 'd'),
            new Card('3', 'd'),
            new Card('4', 'd'),
            new Card('5', 'd'),
            new Card('6', 'd'),
            new Card('7', 'd'),
            new Card('8', 'd'),
            new Card('9', 'd'),
            new Card('T', 'd'),
            new Card('J', 'd'),
            new Card('Q', 'd'),
            new Card('K', 'd'),
            new Card('A', 'd')
        ];

        this.straights(true);
        this.quads();
        this.fullHouses();
        this.flushes(true);
        this.straights();
        this.trips();
        this.twoPairs();
        this.pairs();
        this.flushes();
    }

    addRanking(cards: Card[], suited: boolean = false): void {
        let value = 1;

        for(let card of cards) {
            value *= card.getRankValue();
        }

        if (suited) {
            value *= 59;
        }

        this.rankings[value] = this.done;
        this.done++;
    }

    pairs(): void {
        for (let a = 12; a >= 0; a--) {
            for (let b =  12; b >= 0; b--) {
                for (let c = b - 1; c >= 0; c--) {
                    for (let d = c - 1; d >= 0; d--) {
                        if (a != b && a != c && a != d && b != c && b != d && c != d) {
                            this.addRanking([
                                this.cards[a],
                                this.cards[a],
                                this.cards[b],
                                this.cards[c],
                                this.cards[d]
                            ]);
                        }
                    }
                }
            }
        }
    }

    twoPairs(): void {
        for(let a = 12; a >= 0; a--) {
            for (let b = a - 1; b >= 0; b--) {
                for (let c = 12; c >= 0; c--) {
                    if (a != b && a != c && b != c) {
                        this.addRanking([
                            this.cards[a],
                            this.cards[a],
                            this.cards[b],
                            this.cards[b],
                            this.cards[c]
                        ]);
                    }
                }
            }
        }
    }

    trips(): void {
        for (let a = 12; a >= 0; a--) {
            for (let b = 12; b >= 0; b--) {
                for (let c = b - 1; c >= 0; c--) {
                    if (a != b && a != c) {
                        this.addRanking([
                            this.cards[a],
                            this.cards[a],
                            this.cards[a],
                            this.cards[b],
                            this.cards[c]
                        ])
                    }
                }
            }
        }
    }

    flushes(suited: boolean = false): void {
        for (let a = 12; a >= 0; a--) {
            for (let b = a - 1; b >= 0; b--) {
                for (let c = b - 1; c >= 0; c--) {
                    for(let d = c - 1; d >= 0; d--) {
                        for (let e = d - 1; e >= 0; e--) {
                            if (a - 4 != e) {
                                const cards = [
                                    this.cards[a],
                                    this.cards[b],
                                    this.cards[c],
                                    this.cards[d],
                                    this.cards[e]
                                ];
                                if (cards[0].getRankValue() * cards[1].getRankValue() * cards[2].getRankValue() * cards[3].getRankValue() * cards[4].getRankValue() != 7770) {
                                    this.addRanking(cards, suited);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    fullHouses(): void {
        for (let i = 12; i >= 0; i--) {
            for(let j = 12; j >= 0; j--) {
                if (j != i) {
                    this.addRanking([
                        this.cards[i],
                        this.cards[i],
                        this.cards[i],
                        this.cards[j],
                        this.cards[j]
                    ]);
                }
            }
        }
    }

    quads(): void {
        for (let i = 12; i >= 0; i--) {
            for (let j = 12; j >= 0; j--) {
                if (j != i) {
                    this.addRanking([
                        this.cards[i],
                        this.cards[i],
                        this.cards[i],
                        this.cards[i],
                        this.cards[j]
                    ]);
                }
            }
        }
    }

    straights(suited: boolean = false): void {
        for (let i = 12; i > 2; i--) {
            const cards = [
                this.cards[i],
                this.cards[i - 1],
                this.cards[i - 2], 
                this.cards[i - 3]
            ];

            if (i > 3) {
                cards.push(this.cards[i - 4]);
            } else {
                cards.push(new Card('A', 'd'));
            }

            this.addRanking(cards, suited);
        }
    }

    private getValueOfFive(cards: Card[]): number {
        let rankValue = cards[0].getRankValue();
        let suitValue = cards[0].getSuitValue();

        for (let i = 1; i < 5; i++) {
            rankValue *= cards[i].getRankValue();
            suitValue *= cards[i].getSuitValue();
        }

        let rank = this.rankings[rankValue];

        if (suitValue === 115856201 || suitValue === 147008443 || suitValue === 229345007 || suitValue === 418195493) {
            rankValue *= 59;
            let temp = this.rankings[rankValue];

            if (temp < rank) {
                rank = temp;
            }
        }
        return rank;
    }

    getValue(cards: Card[]): number {
        if (cards.length < 5) {
            throw new Error('Not enough cards given to getValue method');
        } else {
            this.highest = this.rankings.length + 1;

            for (let a = cards.length - 1; a >= 0; a--) {
                for (let b = a - 1; b >= 0; b--) {
                    for (let c = b - 1; c >= 0; c--) {
                        for (let d = c - 1; d >= 0; d--) {
                            for (let e = d - 1; e >= 0; e--) {
                                let currentHand = [
                                    cards[a],
                                    cards[b],
                                    cards[c],
                                    cards[d],
                                    cards[e]
                                ];

                                let rank = this.getValueOfFive(currentHand);

                                if (rank < this.highest) {
                                    this.highest = rank;
                                    this.bestHand = currentHand;
                                }
                            }
                        }
                    }
                }
            }
        }
        return this.highest;
    }

    sortCardsByRanks(cards: Card[]): Card[] {
       return cards.sort((a, b) => (a.getRankValue() < b.getRankValue() ? 1 : -1));
    }

    createPokerHand(board: Board, playerHand: PlayerHand): PokerHand {
        const potentialHands: PokerHand[] = [];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 2; j++) {
                let potentialHandAsArray = [...board.getCards()];
                potentialHandAsArray[i] = playerHand.getCards()[j];
                potentialHands.push(new PokerHand(potentialHandAsArray));
            }
        }

        for (let i = 0; i < 5; i++) {
            for (let j = 4; j >= 0; j--) {
                let potentialHandAsArray = [...board.getCards()];
                for (let k = 0; k < 2; k++) {
                    potentialHandAsArray[i] = playerHand.getCards()[1 - k];
                    potentialHandAsArray[j] = playerHand.getCards()[k];
                    potentialHands.push(new PokerHand(potentialHandAsArray));
                }
            }
        }

        potentialHands.push(new PokerHand(board.getCards()));

        const handValues: HandValues = {};
        potentialHands.forEach(hand => handValues[hand.toString()] = this.getValue(hand.getCards()));

        const lowestValue: number = Math.min(...Object.values(handValues));
        const bestHand: string | undefined = Object.keys(handValues).find(key => handValues[key] === lowestValue);
        
        if (typeof bestHand != 'undefined') {
            let pokerHand = InputParser.createCards(bestHand)
            pokerHand = this.sortCardsByRanks(pokerHand);
            return new PokerHand(pokerHand);
        } else {
            throw new Error('Value of bestHand not found. Given hand might be impossible!');
        }

    }


}