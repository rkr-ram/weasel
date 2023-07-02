export const HOST = process.env.HOST;

const AUTH_ROUTE = `${HOST}/api/auth`;

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;

export const ONBOARD_USER_ROUTE=`${AUTH_ROUTE}/onboard-user`

export const GET_ALL_CONTACTS_ROUTE=`${AUTH_ROUTE}/get-contacts`
