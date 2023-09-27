import { Center } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import verified_gift from "../asset/verify.gif";
import error_verification from "../asset/error.gif";
import { api } from "../json-server/api";
import { useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

export const Verify = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  // console.log(params.user_id);
  const verifyUser = async () => {
    await api
      .post("/user/verify/token", {}, { params: { token: params.token } })
      .then(() => setSuccess(true))
      .catch((err) => {
        setSuccess(false);
        setError(err.response.data);
      });
  };

  const resendVerifLink = async () => {
    await api
      .post(`/user/resend_verification_link/${params.user_id}`, {})
      .then(() => setError("a new verification email has been sent"))
      .catch((err) => setError(err?.message));
  };
  useEffect(() => {
    verifyUser();
  }, []);

  return (
    <>
      <Center width={"100vw"} height={"60vh"}>
        <img src={success ? verified_gift : error_verification} />
      </Center>
      <Center height={"10vh"}>{error ? error : null}</Center>
      <Center>
        {success ? null : (
          <Button onClick={resendVerifLink}>Resend Verification</Button>
        )}
      </Center>
    </>
  );
};
