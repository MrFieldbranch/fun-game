import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import apiService from "../services/api-service";
import { IUserResponse } from "../models/IUserResponse";

const HighScoreView = () => {
  const [listOfUsers, setListOfUsers] = useState<IUserResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    sortUsersByNicknameAsc();
  }, []);

  const sortUsersByNicknameAsc = async () => {
    setIsLoading(true);
    const users = await apiService.getNicknamesAscendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByNicknameDesc = async () => {
    setIsLoading(true);
    const users = await apiService.getNicknamesDescendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByNumberOfGamesAsc = async () => {
    setIsLoading(true);
    const users = await apiService.getNumberOfGamesAscendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByNumberOfGamesDesc = async () => {
    setIsLoading(true);
    const users = await apiService.getNumberOfGamesDescendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByNumberOfWinsAsc = async () => {
    setIsLoading(true);
    const users = await apiService.getNumberOfWinsAscendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByNumberOfWinsDesc = async () => {
    setIsLoading(true);
    const users = await apiService.getNumberOfWinsDescendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByWinPercentAsc = async () => {
    setIsLoading(true);
    const users = await apiService.getWinPercentAscendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  const sortUsersByWinPercentDesc = async () => {
    setIsLoading(true);
    const users = await apiService.getWinPercentDescendingAsync();
    setListOfUsers(users);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <p>Laddar listan...</p>
    ); /* Kanske wrappa p-taggen så att den hamnar i mitten? */
  }

  return (
    <div className="logged-in-container">
      <Nav />
      <div className="high-score">
        <div className="high-score-headers">
          <div className="high-score-header-group">
            <h2>Namn</h2>
            <div className="high-score-sorting-buttons">
              <button
                className="direction-1"
                onClick={sortUsersByNicknameAsc}
              >A on top</button>
              <button
                className="direction-2"
                onClick={sortUsersByNicknameDesc}
              >Ö on top</button>
            </div>
          </div>
          <div className="high-score-header-group">
            <h2>Antal spel</h2>
            <div className="high-score-sorting-buttons">
              <button
                className="direction-1"
                onClick={sortUsersByNumberOfGamesDesc}
              >Max on top</button>
              <button
                className="direction-2"
                onClick={sortUsersByNumberOfGamesAsc}
              >Min on top</button>
            </div>
          </div>
          <div className="high-score-header-group">
            <h2>Antal vinster</h2>
            <div className="high-score-sorting-buttons">
              <button
                className="direction-1"
                onClick={sortUsersByNumberOfWinsDesc}
              >Max on top</button>
              <button
                className="direction-2"
                onClick={sortUsersByNumberOfWinsAsc}
              >Min on top</button>
            </div>
          </div>
          <div className="high-score-header-group">
            <h2>Vinstprocent</h2>
            <div className="high-score-sorting-buttons">
              <button
                className="direction-1"
                onClick={sortUsersByWinPercentDesc}
              >Max on top</button>
              <button
                className="direction-2"
                onClick={sortUsersByWinPercentAsc}
              >Min on top</button>
            </div>
          </div>
        </div>
        {listOfUsers.length === 0 ? (
          <p>Inga användare finns</p>
        ) : (
          listOfUsers.map((user) => (
            <div className="high-score-user" key={user.id}>
              <p className="user-record-data">{user.nickname}</p>
              <p className="user-record-data">{user.numberOfGames}</p>
              <p className="user-record-data">{user.numberOfWins}</p>
              <p className="user-record-data">{user.winPercent}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HighScoreView;
