export interface IUser {
    id: number;
    username: string;
    email: string;
    userGroup: string;
}
export interface NavigationItems {
    id: number;
    name: string;
    router_link: string;
    icon_cls: string;
    level: string;
    parent_id: string;
    is_disabled: string;
}
export interface TraderAccountMdl {
    id: number;
    name: string;
    contact_person: string;
    tin_no1: number;
    tin_no2: number;
    tin_no3: number;
    country_id: number;
    region_id: number;
    district_id: number;
    physical_address: string;
    postal_address: string;
    telephone_no: string;
    code_no: string;
    mobile_no: string;
    email_address: string;
    status_id: number;
    trader_category_id: number;
    tin_certificate: number;
    contact_person_email: string;
}
export interface CountriesMdl {
    id: number;
    name: string;
    description: string;
}
export interface UserMdl {
    trader_no: number;
    company_name: string;
    description: string;
}export interface SystemData {
    system: number;
}