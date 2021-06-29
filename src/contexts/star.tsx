import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface IInputStar {
  repository_id: number;
  user_id: string;
}

interface IStarContext {
  handleStar: (data: IInputStar) => void;
  checkStar: (data: IInputStar) => boolean;
}

const StarContext = createContext<IStarContext>({} as IStarContext);

const StarProvider: React.FC = ({ children }) => {
  const [stars, setStars] = useState<IInputStar[]>(() => {
    const stars = localStorage.getItem("@pr:stars");
    if (!stars) {
      localStorage.setItem("@pr:stars", JSON.stringify([]));
      return [];
    }

    return JSON.parse(stars);
  });

  const handleStar = useCallback(
    ({ repository_id, user_id }: IInputStar) => {
      const findStar = stars.find(
        (star) =>
          star.repository_id === repository_id && star.user_id === user_id
      );
      let newStars = [];
      if (findStar) {
        newStars = stars.filter(
          (star) =>
            !(star.repository_id === repository_id && star.user_id === user_id)
        );
      } else {
        newStars = [
          ...stars,
          {
            repository_id,
            user_id,
          },
        ];
      }
      localStorage.setItem("@pr:stars", JSON.stringify(newStars));
      setStars(newStars);
    },
    [stars]
  );

  useEffect(() => {
    console.log(stars, "show starts");
  }, [stars]);

  const checkStar = useCallback(
    ({ user_id, repository_id }: IInputStar) => {
      const findStar = stars.find(
        (star) =>
          star.repository_id === repository_id && star.user_id === user_id
      );
      return !!findStar;
    },
    [stars]
  );

  return (
    <StarContext.Provider value={{ handleStar, checkStar }}>
      {children}
    </StarContext.Provider>
  );
};

export const useStar = (): IStarContext => {
  const context = useContext(StarContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default StarProvider;
