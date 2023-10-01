import { SVGinstagram } from "../components/SVG/SVG_Instagram";
import * as Yup from "yup";
import * as YupPassword from "yup-password";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { Card, Container, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { SVGeyePassword } from "../components/SVG/SVG_eye_password";
import { useDispatch } from "react-redux";
import { userLogin } from "../redux/middleware/auth-middleware";
import { useNavigate } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAdditionalUserInfo,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../library/firebase";
import { useToast } from "@chakra-ui/react";
import { SVGorRegister } from "../components/SVG/SVGorRegister";
import { api } from "../json-server/api";

class NewUser {
  constructor(
    username = "",
    email = "",
    gender = "",
    password = "",
    bio = "",
    image_url = "",
    fullname = ""
  ) {
    this.username = username;
    this.email = email;
    this.gender = gender;
    this.password = password;
    this.bio = bio;
    this.image_url = image_url;
    this.fullname = fullname;
  }
}

export const Login = () => {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];
  function showpass() {
    setShowpassword(!showpassword);
    if (showpassword) {
      document.getElementById("password").type = "text";
    } else document.getElementById("password").type = "password";
  }

  const loginbyGoogle = () => {
    const provider = new GoogleAuthProvider();
    let result;
    signInWithPopup(auth, provider)
      .then(async (res) => {
        const thisuser = res.user.providerData[0];
        const temp_res = await api.get(`users`, {
          params: { email: thisuser.email },
        });
        const temp = temp_res.data[0];
        if (!temp?.id) {
          const newuser = new NewUser(thisuser.displayName, thisuser.email);
          newuser.image_url = thisuser.photoURL;
          newuser.google_uid = thisuser.uid;
          await api.post(`users`, newuser).then(async (res) => {
            const tmp_res = await api.get(`users`, {
              params: { email: thisuser.email },
            });
            const tmp = tmp_res.data[0];
            await dispatch(userLogin(tmp));
            localStorage.setItem("instagram-auth", tmp.id);
          });
        }
        if (temp.id) {
          temp.google_uid = thisuser.uid;
          await api.patch(`users/${temp.id}`, temp);
          dispatch(userLogin(temp));
          localStorage.setItem("instagram-auth", temp.id);
        }
      })
      .catch((err) => {
        return toast({
          title: "login failed",
          description: result,
          duration: 1500,
          status: "error",
          position: "top",
        });
      })
      .finally(() => {
        navigate(`/home`);
        return toast({
          title: "login success",
          status: "success",
          isClosable: "true",
          position: "top",
          duration: 1500,
        });
      });
  };

  const loginbyfacebook = () => {
    const provider = new FacebookAuthProvider();
    let result;
    signInWithPopup(auth, provider)
      .then(async (res) => {
        let additional = getAdditionalUserInfo(res);
        const avatar = additional.profile?.picture.data.url;
        res.user.providerData[0].photoURL = avatar;
        updateProfile(auth.currentUser, { photoURL: avatar });
        const thisuser = res.user.providerData[0];
        const temp_res = await api.get(`users`, {
          params: { email: thisuser.email },
        });
        const temp = temp_res.data[0];
        if (!temp?.id) {
          const newuser = new NewUser(thisuser.displayName, thisuser.email);
          newuser.image_url = thisuser.photoURL;
          newuser.google_uid = thisuser.uid;
          await api.post(`users`, newuser).then(async (res) => {
            const tmp_res = await api.get(`users`, {
              params: { email: thisuser.email },
            });
            const tmp = tmp_res.data[0];
            result = await dispatch(userLogin(tmp));
            localStorage.setItem("instagram-auth", tmp.id);
          });
        }
        if (temp.id) {
          temp.google_uid = thisuser.uid;
          await api.patch(`users/${temp.id}`, temp);
          result = await dispatch(userLogin(temp));
          localStorage.setItem("instagram-auth", temp.id);
        }
      })
      .catch((err) => console.log(err));
  };

  YupPassword(Yup);
  const formik = useFormik({
    initialValues: { accountID: "", password: "" },
    validationSchema: Yup.object().shape({
      accountID: Yup.string().required(),
      password: Yup.string().required().min(8),
    }),
    onSubmit: async (values) => {
      const result = await dispatch(userLogin(values));
      if (result === "success") {
        navigate(`/home`);
        return toast({
          title: "login success",
          status: "success",
          isClosable: "true",
          position: "top",
          duration: 1500,
        });
      }
      return toast({
        title: "login failed",
        description: result,
        duration: 1500,
        status: "error",
        position: "top",
      });
    },
  });

  useEffect(() => {
    if (localStorage.getItem(`instagram-auth`)) navigate(`/home`);
  }, []);

  return (
    <>
      <Container
        className="d-flex justify-content-center p-0"
        style={{ maxWidth: "390px" }}
      >
        <Card
          className="d-flex justify-content-center align-items-center vh-100"
          style={{
            width: "100%",
            borderRadius: "30px",
          }}
        >
          <SVGinstagram />
          <Form className="mt-5 w-100" style={{ maxWidth: "320px" }}>
            <Form.Group className="mb-3" controlId="accountID">
              <Form.Control
                type="text"
                placeholder="username/email/phone"
                autoFocus
                onChange={(e) =>
                  formik.setFieldValue(e.target.id, e.target.value)
                }
              />
              <span className="text-danger">{formik.errors.email}</span>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="password"
              style={{ position: "relative" }}
            >
              <Form.Control
                type="password"
                placeholder="Password"
                autoFocus
                onChange={(e) =>
                  formik.setFieldValue(e.target.id, e.target.value)
                }
              />
              <Form.Label
                style={{ position: "absolute", right: "5px", top: "5px" }}
                onClick={showpass}
              >
                <SVGeyePassword />
              </Form.Label>
              <span className="text-danger">{formik.errors.password}</span>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                id="loginbutton"
                variant="primary"
                className="w-100"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
          <span className="my-4">
            {/* <span className="mt-1">Forget your login details?</span> */}
            <a
              href="/forgot_password"
              style={{ textDecoration: "none" }}
              className="mx-1"
            >
              <b>Forgot password?</b>
            </a>
          </span>
          <span className="">
            <span className="mt-1">Dont have an account?</span>
            <a
              href="/register"
              style={{ textDecoration: "none" }}
              className="mx-1"
            >
              <b>Register</b>
            </a>
          </span>
          <SVGorRegister />
          <Button
            variant="primary"
            className="w-100 my-4"
            onClick={loginbyGoogle}
            style={{ maxWidth: "320px", textAlign: "center" }}
          >
            <span
              className="d-flex justify-content-center"
              style={{ gap: "10px" }}
            >
              <span>
                <img
                  src="https://www.google.com/images/hpp/gsa_super_g-64.gif"
                  width={"24px"}
                />
              </span>
              <span>Login with Google</span>
            </span>
          </Button>
          <Button
            variant="primary"
            className="w-100 my-4"
            onClick={loginbyfacebook}
            style={{ maxWidth: "320px", textAlign: "center" }}
          >
            <span
              className="d-flex justify-content-center"
              style={{ gap: "10px" }}
            >
              <span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/2048px-Facebook_f_logo_%282019%29.svg.png"
                  width={"24px"}
                />
              </span>
              <span>Login with facebook</span>
            </span>
          </Button>
        </Card>
      </Container>
    </>
  );
};
