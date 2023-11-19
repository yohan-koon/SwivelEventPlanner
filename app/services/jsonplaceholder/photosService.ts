import axiosInstance from "../../config/axios.config";
import { Photo } from "../../redux/photos";

/**
 * Fetch photos from jsonplaceholder
 * @returns Promise<Photo[]>
 */
export const fetchPhotos = async (): Promise<Photo[]> => {
    const response = await axiosInstance.get(`/photos`)
    return response.data?.slice(0, 10);
}