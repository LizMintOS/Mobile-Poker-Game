import { useGameActions } from "../api/games/functions";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useState } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGame } from "../contexts/GameProvider";
import { usePlayerActions } from "../api/players/functions";

import { Player } from "../api/players/types";

import PlayingCardList from "../components/cards/CardList";
import PressButton from "../components/common/buttons/PressButton";
import { Card } from "../utils/cards";

const Game = () => {
  const { currentUser } = useAuth();
  const userId = currentUser!.uid;
  const { game, gameId, clearGame } = useGame();
  const { getPlayer, listenToPlayer } = usePlayerActions(currentUser);
  const { updateGame, updateGameTransaction } = useGameActions(currentUser);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);

  const [loading, setLoading] = useState(false);
  const [isTurn, setIsTurn] = useState(game?.turnOrder[game.turn] === userId);
  const [player, setPlayer] = useState<Player>({
    id: userId,
    hand: [],
  });

  const selectCard = (card: Card, isSelected: boolean) => {
    setSelectedCards((prevSelectedCards) =>
      isSelected
        ? [...prevSelectedCards, card]
        : prevSelectedCards.filter((c) => c !== card)
    );
  };

  useEffect(() => {
    setLoading(true);
    if (game) {
      setIsTurn(game.turnOrder[game.turn] === userId);

      const unsubscribe = listenToPlayer(gameId!, userId, (player) => {
        setPlayer(player);
        console.log(player);
        setLoading(false);
      });

      console.log(isTurn);
      console.log(player.hand);

      return () => unsubscribe();
    }
  }, [isTurn, gameId, game, userId]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full mt-4 text-center border-1 border-slate-100/50">
          {isTurn && player && player.hand ? (
            <>
              <h1 className="font-semibold text-green-700 mb-8">Your Turn!</h1>
              <LoadingWrapper
                loading={loading}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
                size={80}
              >
                <div className="flex flex-row h-full w-full">
                  <div className="w-full mt-4 ml-4">
                    <PlayingCardList
                      cardNames={player.hand}
                      selectedCards={selectedCards}
                      selectCard={selectCard}
                    />
                  </div>

                  <div className="self-center justify-center align-center items-center w-1/2 flex">
                    <div className="flex flex-col gap-8 w-fit self-center align-center justify-center items-center">
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
              </LoadingWrapper>
            </>
          ) : (
            <h1>Waiting for players to finish...</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
