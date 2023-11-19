import { AsyncBaseState } from "../../types"

export type Geo = {
    lat: string,
    lng: string,
}
export type Address = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: Geo,
}

export type Company = {
    name: string,
    catchPhrase: string,
    bs: string,
}

export type Organizer = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: Address,
    phone: string,
    website: string,
    company: Company,
}

export type IGetOrganizers = {} & AsyncBaseState;

export type OrganizersStateType = {
    organizers: Organizer[],
    getOrganizers: IGetOrganizers,
}

export const ORGANIZERS = 'organizers';
export type ORGANIZERS = typeof ORGANIZERS;

export const GET_ORGANIZERS = `${ORGANIZERS}/getOrganizersAction`;
export type GET_ORGANIZERS = typeof GET_ORGANIZERS;