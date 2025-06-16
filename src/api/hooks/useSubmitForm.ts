import { useAuth } from "../../contexts/AuthProvider";
import { useAuthProxy } from "../auth/AuthProxy";
import { useGameActions } from "../games/functions";
import { Game } from "../games/types";
import { usePlayerActions } from "../players/functions";
import { User } from "firebase/auth";

interface UseAuthFormProps {
  isLogin: boolean;
  isAnon: boolean;
  setIsAnon: (value: boolean) => void;
}

interface AuthFormData {
  email: string;
  password: string;
}

interface UseGameFormProps {
  user: User | null;
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
  const { getGameByGameId } = useGameActions(currentUser);
  const { addPlayer } = usePlayerActions(currentUser);

  const handleSubmitForm = async (data: GameFormData): Promise<Game | void> => {
    const { gameId } = data;

    const gameData: Game = (await getGameByGameId(gameId)) as Game;
    console.log("Got game: ", gameData.id, gameData.playerCount);

    if (gameData.playerCount == 8 || gameData.hasStarted) {
      throw "Game is already full.";
    }

    if (gameData.id) {
      const gameWithNewPlayer = (await addPlayer(gameData)) as Game;
      if (gameWithNewPlayer) {
        console.log("FORM HOOK: Player created for game: ", gameWithNewPlayer.id);
        
        return gameWithNewPlayer;
      }
    }
  };

  return { handleSubmitForm };
};
