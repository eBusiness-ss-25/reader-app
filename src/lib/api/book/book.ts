import axios from "axios";
import AuthAPI from "../auth/auth";

export default class BookAPI {
  private static apiUrl =
    process.env.NEXT_PUBLIC_BOOK_API || "https://ebusiness-api.helixhub.info";
  private authApi = new AuthAPI();

  /**
   * Holt alle Bücher des eingeloggten Users (mit Buchdetails)
   */
  public async getBooksForUser(): Promise<
    {
      id: string;
      userId: string;
      bookId: string;
      bookPage: number;
      createdAt: string;
      updatedAt: string;
      book: {
        id: string;
        title: string;
        author?: string;
        introduction?: string;
        publishedAt?: string;
        categoryId?: string;
        [key: string]: unknown;
      };
    }[]
  > {
    const token = await this.authApi.getAuthToken();
    const userId = this.authApi.getUserId();

    if (!token || !userId) throw new Error("User nicht eingeloggt!");

    const url = `${BookAPI.apiUrl}/user-book/user/${userId}?relations=book`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  }
}
