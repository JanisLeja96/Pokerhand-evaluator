# Texas Holdem Hand Comparison Tool

To run this tool, use App.ts.

The input is to be read from the standard input in the form of:
```
<5 board cards> <hand 1> <hand 2> <...> <hand N>
```

where:
```
- <5 board cards> is a 10 character string where each 2 characters encode a card
- <hand X> is a 4 character string where each 2 characters encode a card, with 2 cards per hand
- <card> is a 2 character string with the first character representing the rank (one of "A", "K", "Q",
"J", "T", "9", "8", "7", "6", "5", "4", "3", "2") and the second character representing the suit (one of
"h", "d", "c", "s") .
```
