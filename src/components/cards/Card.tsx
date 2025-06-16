import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

import { Card as CardType } from "../../utils/cards";

interface PlayingCardProps {
  cardName: string;
  isSelected: boolean;
  selectCard: (card: CardType, isSelected: boolean) => void;
}

const PlayingCard = ({
  cardName,
  isSelected,
  selectCard,
}: PlayingCardProps) => {
  const img = `/src/assets/cards/${cardName}.png`;

  const handleClick = () => {
    selectCard(cardName as CardType, !isSelected);
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer transition-transform transform ${
        isSelected ? "shadow-lg shadow-green-500 scale-105" : "hover:scale-105"
      }`}
    >
      <Card sx={{ maxWidth: "fit-content" }}>
        <CardMedia
          sx={{ height: "fit-content", width: 150 }}
          component="img"
          alt="card"
          image={img}
        />
      </Card>
    </div>
  );
};

export default PlayingCard;
