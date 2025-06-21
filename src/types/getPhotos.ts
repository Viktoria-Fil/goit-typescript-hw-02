import axios from "axios";
import { IPhoto } from "./photo";

export interface IUnsplashResponse {
  total: number;
  total_pages: number;
  results: IPhoto[];
}
const API_KEY = "85TfTW3R-U1YQsCdr1MmVw4M8fcyoucTm1uJOgLbod8";
const BASE_URL = "https://api.unsplash.com/";

export const fetchImages = async (
  query: string,
  page: number,
  perPage = 12
): Promise<IUnsplashResponse> => {
  try {
    const { data } = await axios.get<IUnsplashResponse>(
      `${BASE_URL}/search/photos/`,
      {
        params: {
          client_id: API_KEY,
          orientation: "landscape",
          page: page,
          query: query,
          per_page: perPage,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      total: 0,
      total_pages: 0,
      results: [],
    };
  }
};