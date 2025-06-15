import PlayingCard from "./Card";

interface PlayingCardListProps {
  cardNames: string[];
}

const PlayingCardList = ({ cardNames }: PlayingCardListProps) => (
  <div className="flex flex-row gap-4">
    {cardNames.map((card, index) => (
      <PlayingCard cardName={card} key={index} />
    ))}
  </div>
);

export default PlayingCardList;
