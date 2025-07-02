import axios from "axios";
import AuthAPI from "../auth/auth";
import BookAPI from "../book/book";

export interface PageData {
  id: string;
  bookId: string;
  pageNumber: number;
  content: string;
  pageVideoId: string;
}

interface BookWithPages {
  id: string;
  numPages: number;
  BookPages: PageData[];
}

export default class ReaderAPI {
  private static apiUrl =
    process.env.NEXT_PUBLIC_BOOK_API || "https://ebusiness-api.helixhub.info";

  private authApi = new AuthAPI();
  private api = new BookAPI();

  // Liefert eine einzelne Seite als HTML-String zurück.
  public async getBookWithPages(bookId: string): Promise<BookWithPages> {
    const url = `${ReaderAPI.apiUrl}/book/${bookId}?relations=BookPages`;
    const token = await this.authApi.getAuthToken();
    const resp = await axios.get<BookWithPages>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return resp.data;
  }

  public async getVideoIdByPageId(id: string) {
    const bookPageUrl = `${ReaderAPI.apiUrl}/book-page/${id}`;
    const token = await this.authApi.getAuthToken();
    const bookPageResp = await axios.get<PageData>(bookPageUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const storageId = bookPageResp.data.pageVideoId;
    return `${ReaderAPI.apiUrl}/storage/${storageId}`;
  }

  public async updateBookPage(bookId: string, bookPage: number) {
    const userBooks = await this.api.getBooksForUser();
    const userBook = userBooks.find((ub) => ub.bookId === bookId);
    const userBookId = userBook?.id;
    const token = await this.authApi.getAuthToken();
    const url = `${ReaderAPI.apiUrl}/user-book/${userBookId}`;
    const pageData = { bookPage: bookPage };
    await axios.patch(url, pageData, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
