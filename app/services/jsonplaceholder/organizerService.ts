import axiosInstance from "../../config/axios.config";
import { Organizer } from "../../redux/organizers";

/**
 * Fetch organizers from jsonplaceholder
 * @returns Promise<Organizer[]>
 */
export const fetchOrganizers = async (): Promise<Organizer[]> => {
    const response = await axiosInstance.get(`/users`)
    return response.data;
}