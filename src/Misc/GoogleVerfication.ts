const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
export async function verify(token: string) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "50096351635-sblfrcuu70p1a7k7ld629q3565kvoije.apps.googleusercontent.com", // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  console.log("this is payload");

  console.log(payload);

  const userid = payload["sub"];
  console.log("this is userid");

  console.log(userid);

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
