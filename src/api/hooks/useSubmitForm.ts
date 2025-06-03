import { useAuthActions } from "../auth/functions";
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
  const { loginAnonymouslyUser, registerUser, loginUser } = useAuthActions();
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

export const useGameForm = ({ user }: UseGameFormProps) => {
  const { getGameByGameId } = useGameActions(user);
  const { addPlayer } = usePlayerActions(user);

  const handleSubmitForm = async (data: GameFormData): Promise<Game> => {
    const { gameId } = data;

    const gameData = await getGameByGameId(gameId);

    if (gameData) {
      const player = await addPlayer(gameData);
      if (player) {
        console.log("Player created: ", player.id);
      }
    }
    
    return gameData as Game;
  };

  return { handleSubmitForm };
};
