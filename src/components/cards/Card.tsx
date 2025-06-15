import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useState } from "react";

interface PlayingCardProps {
  cardName: string;
}

const PlayingCard = ({ cardName }: PlayingCardProps) => {
  const img = `/src/assets/cards/${cardName}.png`;
  const [selected, setSelected] = useState(false);

  return (
    <div
      onClick={() => setSelected(!selected)}
      className={selected ? "shadow-md shadow-green-500" : ""}
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
