import GoogleLogin from "react-google-login";
import { User } from "../types";
import { loginGoogle } from "../api";

export default function Login({ setUser }: { setUser: (user?: User) => void }) {
  const handleSuccess = async (resp: any) => {
    loginGoogle(resp).then(setUser);
  };

  const handleFailure = (resp: any) => {
    console.error(resp);
  };

  return (
    <GoogleLogin
      clientId={process.env.GOOGLE_CLIENT_ID!}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      cookiePolicy="single_host_origin"
      autoLoad={false}
      theme="dark"
    />
  );
}
