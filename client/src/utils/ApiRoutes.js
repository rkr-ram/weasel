export const HOST = process.env.HOST;

const AUTH_ROUTE = `${HOST}/api/auth`;
const MESSAGE_ROUTE = `${HOST}/api/message`

export const CHECK_USER_ROUTE = `${AUTH_ROUTE}/check-user`;

export const ONBOARD_USER_ROUTE=`${AUTH_ROUTE}/onboard-user`

export const GET_ALL_CONTACTS_ROUTE=`${AUTH_ROUTE}/get-contacts`

export const ADD_MESSAGE_ROUTE =`${MESSAGE_ROUTE}/add-message`

export const GET_MESSAGES_ROUTE =`${MESSAGE_ROUTE}/get-message`

