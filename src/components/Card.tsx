import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface PlayingCardProps {
  cardName: string;
}

const PlayingCard = ({ cardName }: PlayingCardProps) => {
  const img = `src\\assets\\cards\\${cardName}.png`;
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardMedia sx={{ height: 140 }} image={img} />
    </Card>
  );
};

export default PlayingCard;
