import feathers from "@feathersjs/client";
import socketio from "@feathersjs/socketio-client";
import io from "socket.io-client";
import { API_URL } from "../../store";

//
const socket = io(API_URL);
const client = feathers();

client.configure(socketio(socket));
// client.configure(
//   feathers.authentication({
//     storage: window.localStorage,
//   })
// );

// https://docs.feathersjs.com/guides/basics/authentication.html#browser-authentication
export default client;

// // Establish a Socket.io connection
// const socket = io();

// // Initialize our Feathers client application through Socket.io
// // with hooks and authentication.
// const client = feathers();
// client.configure(feathers.socketio(socket));

// // Use localStorage to store our login token
// client.configure(feathers.authentication({
//   storage: window.localStorage
// }));

// const login = async () => {
//   try {
//     // First try to log in with an existing JWT
//     return  await client.reAuthenticate();
//   } catch (error) {
//     // If that errors, log in with email/password
//     // Here we would normally show a login page
//     // to get the login information
//     return await client.authenticate({
//       strategy: 'local',
//       email: 'email',
//       password: 'password'
//     });
//   }
// };

// const main = async () => {
//   const auth = await login();

//   console.log('User is authenticated', auth);

//   // Log out
//   // await client.logout();
// };

// main();
