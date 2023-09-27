import { Button, Card, Container, Form } from "react-bootstrap";
import { SVGinstagram } from "../components/SVG/SVG_Instagram";
import { SVGeyePassword } from "../components/SVG/SVG_eye_password";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../json-server/api";
import { useToast } from "@chakra-ui/react";
YupPassword(Yup);

export const ResetPassword = () => {
  const nav = useNavigate();
  const toast = useToast();
  const { token } = useParams();
  const [showpassword, setShowpassword] = useState(true);
  const [showpasswordCon, setShowpasswordCon] = useState(false);
  function showpass() {
    setShowpassword(!showpassword);
    if (showpassword) {
      document.getElementById("password").type = "text";
    } else document.getElementById("password").type = "password";
  }
  function showpassCon() {
    setShowpasswordCon(!showpasswordCon);
    if (showpasswordCon) {
      document.getElementById("passwordConfirmation").type = "text";
    } else document.getElementById("passwordConfirmation").type = "password";
  }

  const formik = useFormik({
    initialValues: { password: "", passwordConfirmation: "" },
    validationSchema: Yup.object().shape({
      password: Yup.string().password().required(),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "password does not match")
        .required(),
    }),
    onSubmit: async (values) => {
      await api
        .post(`/user/reset_password/${token}`, { ...values })
        .then((result) =>
          toast({
            title: "Reset password success",
            description: result.data,
            isClosable: true,
            status: "success",
            duration: 2000,
          })
        )
        .then(() => nav("/login"))
        .catch((err) =>
          toast({
            title: "Error",
            description: err.response.data,
            isClosable: true,
            status: "error",
            duration: 2000,
          })
        );
    },
  });
  return (
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
        <h4 className="mt-4">Reset Password</h4>
        <Form className="mt-5 w-100" style={{ maxWidth: "320px" }}>
          <Form.Group
            className="mb-3"
            controlId="password"
            style={{ position: "relative" }}
          >
            <Form.Control
              type="password"
              placeholder="New password"
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
          <Form.Group
            className="mb-3"
            controlId="passwordConfirmation"
            style={{ position: "relative" }}
          >
            <Form.Control
              type="password"
              placeholder="New password confirmation"
              autoFocus
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            />
            <Form.Label
              style={{ position: "absolute", right: "5px", top: "5px" }}
              onClick={showpassCon}
            >
              <SVGeyePassword />
            </Form.Label>
            <span className="text-danger">
              <span className="text-danger">
                {formik.errors.passwordConfirmation}
              </span>
            </span>
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
          <div className="d-flex justify-content-center mt-4">
            <a href="/login">
              <b>Login page</b>
            </a>
          </div>
        </Form>
      </Card>
    </Container>
  );
};
