import { Game, PlayerScore } from "src/api/types";

interface EndGameInfoBoxProps {
  game: Game;
}

const EndGameInfoBox = ({ game }: EndGameInfoBoxProps) => {
  const getWinners = (scores: PlayerScore[]) => {
    const maxScore = Math.max(...scores.map((score) => score.score));
    return scores
      .map((score, idx) => (score.score === maxScore ? idx : -1))
      .filter((idx) => idx !== -1);
  };

  return (
    <div className="bg-green-100 shadow-md shadow-green-900 rounded-2xl p-8 self-center w-fit text-center border-1 border-slate-100/50">
      <h1 className="text-3xl font-bold text-center mb-8 underline underline-offset-6">
        End of Game
      </h1>
      <div className="space-y-2 mb-6 pl-4">
        <p className="text-left text-xl font-semibold mb-4 underline underline-offset-4">
          Final Scores
        </p>
        <ul className="pl-2">
          {game.scores.map((hand, idx) => (
            <li key={idx} className="text-base italic text-left mb-4">
              <span className="font-medium pr-4">Player {idx + 1}:</span>{" "}
              {hand.name}
              <span className="font-bold pl-4">{hand.score} pts</span>
            </li>
          ))}
        </ul>

        <div className="space-y-2 mb-6 pl-4">
          <div className="text-left text-xl font-semibold flex flex-row">
            <p className="underline underline-offset-4 pr-4 mb-1">
              Winner{getWinners(game.scores).length > 1 ? "s" : ""}:{" "}
            </p>
            <div className="items-center flex">
              {getWinners(game.scores).map((winnerIdx) => (
                <span className="text-lg pr-2 ">
                  Player {winnerIdx + 1}
                  {game.scores.length > 1 &&
                  winnerIdx !== game.scores.length - 1
                    ? ", "
                    : ""}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndGameInfoBox;
