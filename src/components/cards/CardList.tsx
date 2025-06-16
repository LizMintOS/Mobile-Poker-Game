import { Card } from "../../utils/cards";
import PlayingCard from "./Card";

interface PlayingCardListProps {
  cardNames: string[];
  selectedCards: Card[];
  selectCard: (card: Card, isSelected: boolean) => void;
}

const PlayingCardList = ({
  cardNames,
  selectedCards,
  selectCard,
}: PlayingCardListProps) => (
  <div className="flex flex-row gap-4">
    {cardNames.map((card, index) => (
      <PlayingCard
        cardName={card}
        key={index}
        isSelected={selectedCards.includes(card as Card)}
        selectCard={selectCard}
      />
    ))}
  </div>
);

export default PlayingCardList;
