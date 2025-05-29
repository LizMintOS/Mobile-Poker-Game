import Title from "../components/common/Title";
// get game 

const GameLobby = () => {
  return (
    <>
      <div className="flex justify-center items-center align-center relative min-h-4/5">
        <div className="bg-white shadow-xl rounded-2xl p-8 w-fit text-center border-1 border-slate-100/50">
          <Title title="Game Lobby" />
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-lg text-gray-700">Welcome to the Game Lobby!</p>
            <p className="text-sm text-gray-500">
              Waiting for players to join...
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameLobby;
