import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ICreateNewUserRequest } from "../models/ICreateNewUserRequest";
import apiService from "../services/api-service";
import { ILoginRequest } from "../models/ILoginRequest";
import { ITokenResponse } from "../models/ITokenResponse";

const RegisterNewUserView = () => {
  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newNickname, setNewNickname] = useState<string>("");
  const [registrationError, setRegistrationError] = useState<string | null>(
    null
  );
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleRegisterAndLogin = async (
    newEmail: string,
    newPassword: string,
    newNickname: string
  ) => {
    if (
      newEmail.trim() === "" ||
      newPassword.trim() === "" ||
      newNickname.trim() === ""
    ) {
      setRegistrationError("Du måste skriva något i varje fält.");
      return;
    }
    const registerRequest: ICreateNewUserRequest = {
      email: newEmail,
      password: newPassword,
      nickname: newNickname,
    };
    try {
      await apiService.registerNewUserAsync(registerRequest);
    } catch (err: any) {
      setRegistrationError(err.message || "Registreringen misslyckades.");
      return;
    }
    const loginRequest: ILoginRequest = {
      email: newEmail,
      password: newPassword,
    };
    try {
      const loginResponse: ITokenResponse = await apiService.loginAsync(
        loginRequest
      );
      apiService.setAuthorizationHeader(loginResponse.token);
      localStorage.setItem("nickname", loginResponse.nickname);
      navigate("/hangman");
    } catch (err: any) {
      setLoginError(err.message || "Inloggningen misslyckades");
    }
  };

  const handleRegistrationError = () => {
    setNewEmail("");
    setNewPassword("");
    setNewNickname("");
    setRegistrationError(null);
  };

  const handleLoginError = () => {
    setLoginError(null);
    navigate("/login");
  };

  if (registrationError)
    return (
      <>
        <div className="overlay" onClick={(e) => e.stopPropagation()} />
        <div className="middle-of-overlay">
          <p>{registrationError}</p>
          <button onClick={handleRegistrationError}>Tillbaka</button>
        </div>
      </>
    );

  if (loginError)
    return (
      <>
        <div className="overlay" onClick={(e) => e.stopPropagation()} />
        <div className="middle-of-overlay">
          <p>{loginError}</p>
          <button onClick={handleLoginError}>Tillbaka</button>
        </div>
      </>
    );

  return (
    <div className="login-register">
      <div className="login-register-upper-part">
        <h1>NY ANVÄNDARE</h1>
        <div className="label-and-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            value={newEmail}
            required
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </div>
        <div className="label-and-input">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="label-and-input">
          <label htmlFor="nickname">Användarnamn:</label>
          <input
            type="text"
            autoComplete="off"
            id="nickname"
            value={newNickname}
            required
            onChange={(e) => setNewNickname(e.target.value)}
          />
        </div>
        <button
          onClick={() =>
            handleRegisterAndLogin(newEmail, newPassword, newNickname)
          }
        >
          OK
        </button>
      </div>

      <Link to="/start">Tillbaka till Start</Link>
    </div>
  );
};

export default RegisterNewUserView;
