import { ICreateNewUserRequest } from "../models/ICreateNewUserRequest";
import { IGameResultRequest } from "../models/IGameResultRequest";
import { ILoginRequest } from "../models/ILoginRequest";
import { ITokenResponse } from "../models/ITokenResponse";
import { IUserResponse } from "../models/IUserResponse";

export class ApiService {
  private requestHeaders: { [key: string]: string };

  constructor(private baseUrl: string) {
    this.requestHeaders = {
      "Content-Type": "application/json",
    };
  }

  setAuthorizationHeader(token: string): void {
    this.requestHeaders = {
      ...this.requestHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  removeAuthorizationHeader(): void {
    const { Authorization, ...rest } = this.requestHeaders;
    this.requestHeaders = rest;
  }

  async registerNewUserAsync(
    newUserRequest: ICreateNewUserRequest
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/registration`, {
      method: "POST",
      headers: { ...this.requestHeaders },
      body: JSON.stringify(newUserRequest),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Failed to register new user: ${
          errorMessage || "No error message provided by the server."
        }`
      );
    }
  }

  async loginAsync(loginRequest: ILoginRequest): Promise<ITokenResponse> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { ...this.requestHeaders },
      body: JSON.stringify(loginRequest),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(
        `Failed to login: ${
          errorMessage || "No error message provided by the server."
        }`
      );
    }

    const tokenResponse: ITokenResponse | null = await response.json();

    if (!tokenResponse) {
      throw new Error("Failed to deserialize user data.");
    }

    return tokenResponse;
  }

  async getNicknamesAscendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/nicknamesascending`, {
      method: "GET",
      headers: { ...this.requestHeaders },
    });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getNicknamesDescendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/nicknamesdescending`, {
      method: "GET",
      headers: { ...this.requestHeaders },
    });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getNumberOfGamesAscendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/numberofgamesascending`, {
        method: "GET",
        headers: { ...this.requestHeaders },
      });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getNumberOfGamesDescendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/numberofgamesdescending`, {
        method: "GET",
        headers: { ...this.requestHeaders },
      });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getNumberOfWinsAscendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/numberofwinsascending`, {
      method: "GET",
      headers: { ...this.requestHeaders },
    });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getNumberOfWinsDescendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/numberofwinsdescending`, {
        method: "GET",
        headers: { ...this.requestHeaders },
      });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getWinPercentAscendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/winpercentascending`, {
      method: "GET",
      headers: { ...this.requestHeaders },
    });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async getWinPercentDescendingAsync(): Promise<IUserResponse[]> {
    const response = await fetch(`${this.baseUrl}/user/winpercentdescending`, {
      method: "GET",
      headers: { ...this.requestHeaders },
    });

    const users: IUserResponse[] = await response.json();
    return users;
  }

  async createNewGameResultAsync(resultRequest: IGameResultRequest): Promise<void> {
    const response = await fetch(`${this.baseUrl}/user`, {
      method: "POST",
      headers: { ...this.requestHeaders },
      body: JSON.stringify(resultRequest),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to save game result: ${errorMessage || "No error message provided by the server."}`);
    }
  }
}

const apiUrl = "https://localhost:8000";
const apiService = new ApiService(apiUrl); /* Singleton */
export default apiService;
