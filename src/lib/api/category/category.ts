// /lib/app/category.ts

import axios from "axios";
import AuthAPI from "../auth/auth";

export default class CategoryAPI {
    private static apiUrl =
        process.env.NEXT_PUBLIC_BOOK_API || "https://ebusiness-api.helixhub.info";

    private authApi = new AuthAPI();

    /**
     * Holt alle Kategorien vom Backend.
     */
    public async getAllCategories(): Promise<
        {
            id: string;
            name: string;
            createdAt: "2025-06-16T16:48:35.922Z";
            updatedAt: "2025-06-16T16:48:35.922Z"
        }[]
    > {
        const url = `${CategoryAPI.apiUrl}/category`;
        const token = await this.authApi.getAuthToken();
        const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${token}`},
        });

        // falls response.data ein Array ist, sonst ggf. response.data.data etc.
        return response.data;
    }

    public async getCategoryWithBooks(): Promise<
        {
            id: string;
            name: string;
            createdAt: "2025-06-16T16:48:35.922Z";
            updatedAt: "2025-06-16T16:48:35.922Z"
            Books: {
                id: string;
                title: string;}[]
        }[]
    > {
        const url = `${CategoryAPI.apiUrl}/category/?relations=Books`;
        const token = await this.authApi.getAuthToken();
        const response = await axios.get(url, {
            headers: {Authorization: `Bearer ${token}`},
        });

        // falls response.data ein Array ist, sonst ggf. response.data.data etc.
        return response.data;
    }
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  icon?: string;
}