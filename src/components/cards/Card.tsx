import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface PlayingCardProps {
  cardName: string;
}

const PlayingCard = ({ cardName }: PlayingCardProps) => {
  const img = `/src/assets/cards/${cardName}.png`;
  console.log(img);
  return (
    <Card sx={{ maxWidth: "fit-content" }}>
      <CardMedia sx={{ height: "fit-content", width: 150 }} component="img" alt="card" image={img} />
    </Card>
  );
};

export default PlayingCard;
