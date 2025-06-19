import { useGameProxy } from "../api/proxies/GameProxy";
import { useAuth } from "../contexts/AuthProvider";
import { useEffect, useMemo, useState } from "react";
import { LoadingWrapper } from "../components/common/LoadingWrapper";
import { useGame } from "../contexts/GameProvider";
import { usePlayerProxy } from "src/api/proxies/PlayerProxy";

import { Player } from "../api/types";

import PlayingCardList from "../components/cards/CardList";
import PressButton from "../components/common/buttons/PressButton";
import { Card, addCardsToHand, removeCardsFromDeck } from "../utils/cards";

const Game = () => {
  const { currentUser } = useAuth();
  const { game } = useGame();
  const { getPlayer, updatePlayerTransaction } = usePlayerProxy(currentUser);
  const { updateGameTransaction } = useGameProxy(currentUser);
  
  const userId = currentUser!.uid;

  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const isEndOfGame = useMemo(() => {
    return game ? game.turn >= game.playerCount : false;
  }, [game]);
  const isTurn = useMemo(() => {
    return game && game.playerCount > game.turn
      ? game.turnOrder[game.turn] === userId
      : false;
  }, [game]);
  const [player, setPlayer] = useState<Player>({
    id: userId,
    hand: [],
  });
  const [hand, setHand] = useState<Card[]>([]);
  const [deck, setDeck] = useState<Card[]>([]);

  const selectCard = (card: Card, isSelected: boolean) => {
    setSelectedCards((prevSelectedCards) =>
      isSelected
        ? [...prevSelectedCards, card]
        : prevSelectedCards.filter((c) => c !== card)
    );
  };

  useEffect(() => {
    const fetchPlayer = async () => {
      if (game) {
        if (isEndOfGame) {
          console.log("end of game: ", game.turn);
        } else if (isTurn) {
          const playerData: Player = await getPlayer(game.id);
          console.log("Got your data: ", playerData);
          setPlayer(playerData);

          if (hand.length === 0) {
            setHand(playerData.hand);
            if (deck.length === 0) setDeck(game.deck);
          }
        }
      }
      setLoading(false);
    };

    setLoading(true);
    fetchPlayer();
  }, [game, userId, isTurn]);

  const handleSwapCards = () => {
    setLoading(true);
    setDisabled(true);

    console.log("Swapping cards...", selectedCards, selectedCards.length);

    const removeCards = hand.filter((card) => !selectedCards.includes(card));
    const newCards = addCardsToHand(deck, selectedCards.length);
    const newHand = removeCards.concat(newCards);

    setHand(newHand);
    setDeck(removeCardsFromDeck(deck, newCards.slice(-selectedCards.length)));
    setSelectedCards([]);

    console.log("New Hand: ", newHand);

    setLoading(false);
  };

  const endTurn = async () => {
    setLoading(true);
    console.log("Ending turn with hand: ", hand);

    await updatePlayerTransaction({ hand: hand }, game!.id, userId);

    const turnIncrement = game!.turn + 1;

    console.log("Updating game...");

    await updateGameTransaction(game!.id, { deck: deck, turn: turnIncrement });

    console.log("Turn ended");

    setLoading(false);
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-full mt-4 text-center border-1 border-slate-100/50">
          {!isEndOfGame ? (
            <>
              {isTurn && player && hand ? (
                <>
                  <h1 className="font-semibold text-green-700 mb-6">
                    Your Turn!
                  </h1>
                  <h3 className="text-green-500 italic">
                    Refreshing page will reset your turn!
                  </h3>
                  <div>
                    <p>
                      Click cards that you want to swap then press the "Swap
                      Cards" button.{" "}
                    </p>

                    <p className="italic mb-2">
                      Careful! You can only swap once.
                    </p>
                  </div>
                  <h3 className="mb-4">When you've finished, press end turn</h3>
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
                          cardNames={hand}
                          selectedCards={selectedCards}
                          selectCard={selectCard}
                        />
                      </div>

                      <div className="self-center justify-center align-center items-center w-1/2 flex">
                        <div className="flex flex-col gap-8 w-fit self-center align-center justify-center items-center">
                          <PressButton
                            type="submit"
                            style="bg-green-600 border-green-700 h-14"
                            onClick={endTurn}
                          >
                            End Turn
                          </PressButton>
                          <PressButton
                            type="button"
                            style="bg-yellow-400 border-yellow-600 h-14"
                            onClick={handleSwapCards}
                            disabled={disabled}
                          >
                            {disabled ? (
                              <p>No more swaps</p>
                            ) : (
                              <p>Swap Cards</p>
                            )}
                          </PressButton>
                        </div>
                      </div>
                    </div>
                  </LoadingWrapper>
                </>
              ) : (
                <h1>
                  Waiting for player {game ? game.turn + 1 : ""} to finish...
                </h1>
              )}
            </>
          ) : (
            <h1>End of game</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Game;
