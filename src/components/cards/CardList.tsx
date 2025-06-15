import PlayingCard from "./Card";

interface PlayingCardListProps {
  cardNames: string[];
}

const PlayingCardList = ({ cardNames }: PlayingCardListProps) => (
  <div>
    {cardNames.map((card, index) => (
      <PlayingCard cardName={card} key={index} />
    ))}
  </div>
);

export default PlayingCardList;