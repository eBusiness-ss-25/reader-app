import axios from "axios";
import AuthAPI from "../auth/auth";

export interface PageData {
  content: string;
  pageNumber: number;
  totalPages: number;
}

export default class ReaderAPI {
  private static apiUrl =
    process.env.NEXT_PUBLIC_BOOK_API || "https://ebusiness-api.helixhub.info";

  private authApi = new AuthAPI();

  /**
   * Liefert eine einzelne Seite als HTML-String zurück.
   */
  public async getPage(bookId: string, page: number): Promise<PageData> {
    const url = `${ReaderAPI.apiUrl}/books/${bookId}/pages/${page}`;
    const token = await this.authApi.getAuthToken();
    const resp = await axios.get<PageData>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  }
}
