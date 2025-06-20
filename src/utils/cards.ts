export type Card = `${'2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A'}${'H' | 'D' | 'C' | 'S'}`;

const deck: Card[] = [
  "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H", "JH", "QH", "KH", "AH",
  "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "JD", "QD", "KD", "AD",
  "2C", "3C", "4C", "5C", "6C", "7C", "8C", "9C", "10C", "JC", "QC", "KC", "AC",
  "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "JS", "QS", "KS", "AS"
];

export const HandRankings = {
  "Royal Flush": 10,
  "Straight Flush": 9,
  "Four of a Kind": 8,
  "Full House": 7,
  "Flush": 6,
  "Straight": 5,
  "Three of a Kind": 4,
  "Two Pair": 3,
  "One Pair": 2,
  "High Card": 1,
}

export const shuffleCards = (): Card[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck;
};

export const removeCardsFromDeck = (deck: Card[], hand: Card[]): Card[] => {
  return deck.filter((card) => !hand.includes(card));
}

export const addCardsToDeck = (hand: Card[], deck: Card[]): Card[] => {
  const newDeck = [...deck, ...hand];
  return newDeck;
}

export const addCardsToHand = (deck: Card[], totalNewCards: number): Card[] => {
  const newHand: Card[] = deck.slice(0, totalNewCards);
  return newHand;
}

export const scoreHand = (hand: Card[]): number => {
  const values: { [key: string]: number } = {};
  const suits: { [key: string]: number } = {};

  hand.forEach(card => {
    const value = card.charAt(0);
    const suit = card.charAt(1);
    values[value] = (values[value] || 0) + 1;
    suits[suit] = (suits[suit] || 0) + 1;
  });
  console.log(values);
  console.log(suits);

  const valueCounts = Object.values(values).sort((a, b) => b - a);

  if (valueCounts[0] === 4) return HandRankings["Four of a Kind"];
  if (valueCounts[0] === 3 && valueCounts[1] === 2) return HandRankings["Full House"];
  if (valueCounts[0] === 3) return HandRankings["Three of a Kind"];
  if (valueCounts[0] === 2 && valueCounts[1] === 2) return HandRankings["Two Pair"];
  if (valueCounts[0] === 2) return HandRankings["One Pair"];
  return HandRankings["High Card"];
};


