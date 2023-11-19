import axiosInstance from "../../config/axios.config";
import { Post } from "../../redux/posts";

/**
 * Fetch posts from jsonplaceholder
 * @returns Promise<Post[]>
 */
export const fetchPosts = async (): Promise<Post[]> => {
    const response = await axiosInstance.get(`/posts`)
    return response.data;
}