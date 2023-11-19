import { LoadingType } from "./loadingStatus"

export type AsyncBaseState = {
    loading: LoadingType,
    error?: string | null,
}