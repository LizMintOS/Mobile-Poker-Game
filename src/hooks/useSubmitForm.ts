import { useAuth } from "../contexts/AuthProvider";
import { useAuthProxy } from "../api/auth/AuthProxy";
import { useGameProxy } from "../api/games/GameProxy";
import { Game } from "../api/games/types";
import { usePlayerProxy } from "src/api/players/PlayerProxy";

interface UseAuthFormProps {
  isLogin: boolean;
  isAnon: boolean;
  setIsAnon: (value: boolean) => void;
}

interface AuthFormData {
  email: string;
  password: string;
}

interface GameFormData {
  gameId: string;
}

export const useAuthForm = ({
  isLogin,
  isAnon,
  setIsAnon,
}: UseAuthFormProps) => {
  const { loginAnonymouslyUser, registerUser, loginUser } = useAuthProxy();
  const handleSubmitForm = async (data: AuthFormData): Promise<void> => {
    if (!isAnon && data.email && data.password) {
      isLogin
        ? await loginUser(data.email, data.password)
        : await registerUser(data.email, data.password);
    } else if (isAnon) {
      await loginAnonymouslyUser();
      setIsAnon(false);
    }
  };

  return { handleSubmitForm };
};

export const useGameForm = () => {
  const { currentUser } = useAuth();
  const { getGameByGameId } = useGameProxy(currentUser);
  const { addPlayer } = usePlayerProxy(currentUser);

  const handleSubmitForm = async (data: GameFormData): Promise<null | string> => {
    const { gameId } = data;

    const gameData = await getGameByGameId(gameId);

    if ('code' in gameData && gameData.code === 'not-found') {
      throw "Game not found.";
    }
    
    console.log("Got game: ", gameData.id, gameData.playerCount);

    if (gameData.playerCount == 8 || gameData.hasStarted) {
      throw "Game is already full.";
    }

    if (gameData.id) {
      await addPlayer(gameData).then(() => {
        console.log("FORM HOOK: Player created for game: ", gameData.id);
      });
      return gameData.id;
    }

    return null;
  };

  return { handleSubmitForm };
};
