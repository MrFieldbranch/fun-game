import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ILoginRequest } from "../models/ILoginRequest";
import { ITokenResponse } from "../models/ITokenResponse";
import apiService from "../services/api-service";

const LoginView = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    const loginRequest: ILoginRequest = {
      email: email,
      password: password,
    };
    try {
      const loginResponse: ITokenResponse = await apiService.loginAsync(
        loginRequest
      );
      apiService.setAuthorizationHeader(loginResponse.token);
      localStorage.setItem("nickname", loginResponse.nickname);
      navigate("/hangman");
    } catch (err: any) {
      setLoginError(err.message || "Inloggningen misslyckades.");
    }
  };

  const handleLoginError = () => {
    setEmail("");
    setPassword("");
    setLoginError(null);
  };

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
        <h1>LOGGA IN</h1>
        <div className="label-and-input">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            autoComplete="off"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="label-and-input">
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={() => handleLogin(email, password)}>OK</button>
      </div>

      <Link to="/start" className="link-to-start-in-login-register">Tillbaka till Start</Link>
    </div>
  );
};

export default LoginView;
