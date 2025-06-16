import Cookies from 'js-cookie';
import axios from 'axios';

export default class AuthAPI {
  private static authCookieName = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME || 'auth_token';
  private static apiUrl = process.env.NEXT_PUBLIC_BOOK_API || 'https://ebusiness-api.helixhub.info';

  public isAuthenticated(): boolean {
    const cookieValue = Cookies.get(AuthAPI.authCookieName);

    return cookieValue !== undefined;
  }

  public getAuthToken(): string | null {
    const cookieValue = Cookies.get(AuthAPI.authCookieName);
    return cookieValue || null;
  }

  public async login(email: string, password: string): Promise<void> {
    // build full URL using the base API URL from env
    const url = `${AuthAPI.apiUrl}/auth/login`;

    // send POST to your real backend (expecting { token: string } in response)
    const response = await axios.post<{ token: string }>(
      url,
      { email, password }
    );

    // extract the token (e.g. a JWT) from response
    const token = response.data.token;

    // store it in a cookie
    Cookies.set(AuthAPI.authCookieName, token, { expires: 7 });
  }

  /**
   * Register a new user.
   * @param username  desired username
   * @param email     user email
   * @param password  user password
   * @param birthday  user birthday as Date
   * @returns          the created user object
   */
  public async register(
    username: string,
    email: string,
    password: string,
    birthday: Date
  ): Promise<{
    id: string;
    email: string;
    username: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  }> {
    // build full URL using the base API URL from env
    const url = `${AuthAPI.apiUrl}/user`;

    // prepare request payload according to Swagger schema
    const payload = {
      username,
      email,
      password,
      birthday: birthday.toISOString(),
    };

    // send POST to /auth/register expecting the created user in response
    const response = await axios.post<{
      id: string;
      email: string;
      username: string;
      birthday: string;
      createdAt: string;
      updatedAt: string;
    }>(url, payload);

    // return the created user object
    return response.data;
  }
};
