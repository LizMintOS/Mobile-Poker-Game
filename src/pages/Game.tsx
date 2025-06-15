import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useMemo, useState } from "react";
import RedButton from "../components/common/buttons/RedButton";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGame } from "../contexts/GameProvider";
import { usePlayerActions } from "../api/players/functions";

import { Player } from "../api/players/types";

import PlayingCardList from "../components/cards/CardList";
import Button from "@mui/material/Button";
import PressButton from "../components/common/buttons/PressButton";

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
  const cards = ["2C", "AH", "4D", "KS", "10D"];

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full mt-4 text-center border-1 border-slate-100/50">
          <p>game</p>
          <div className="flex flex-row h-full w-full">
            <div className="w-full mt-4 ml-4">
              <PlayingCardList cardNames={cards} />
            </div>

            <div className="self-center justify-center align-center items-center w-1/2 flex">
              <div className="flex flex-col gap-4 w-fit self-center align-center justify-center items-center">
                <PressButton
                  type="submit"
                  style="bg-green-600 border-green-700 h-14"
                >
                  End Turn
                </PressButton>
                <PressButton
                  type="button"
                  style="bg-yellow-400 border-yellow-600 h-14"
                >
                  Swap Cards
                </PressButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Game;
