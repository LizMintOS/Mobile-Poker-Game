import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useMemo, useState } from "react";
import RedButton from "../components/common/buttons/RedButton";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGame } from "../contexts/GameProvider";
import { usePlayerActions } from "../api/players/functions";

import { Player } from "../api/players/types";

import PlayingCard from "../components/cards/Card";

const Game = () => {
  // const { currentUser } = useAuth();
  // const userId = currentUser!.uid;
  // const { game, gameId, clearGame } = useGame();
  // const { getPlayer, listenToPlayer } = usePlayerActions(currentUser);
  // const { updateGame, updateGameTransaction } = useGameActions(currentUser);

  // const [loading, setLoading] = useState(false);
  // const [isTurn, setIsTurn] = useState(false);
  // const [player, setPlayer] = useState<Player>({
  //   id: userId,
  //   hand: [],
  // });

  // useEffect(() => {
  //   setLoading(true);
  //   setIsTurn(game!.turnOrder[game!.turn] === userId);

  //   const unsubscribe = listenToPlayer(gameId!, userId, (player) => {
  //     setPlayer(player);
  //     setLoading(false);
  //   });

  //   return () => unsubscribe();
  // }, [isTurn, gameId, game, userId]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full text-center border-1 border-slate-100/50">
          <p>game</p>
          <PlayingCard cardName="2C" />
        </div>
      </div>
    </>
  );
};

export default Game;
