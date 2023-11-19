import axiosInstance from "../../config/axios.config";
import { Comment } from "../../redux/posts";

/**
 * Fetch comments from jsonplaceholder
 * @returns Promise<Comment[]>
 */
export const fetchComments = async (): Promise<Comment[]> => {
    const response = await axiosInstance.get(`/comments`)
    return response.data;
}