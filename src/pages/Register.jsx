import { SVGinstagram } from "../components/SVG_Instagram";
import * as Yup from "yup";
import * as YupPassword from "yup-password";
import { useFormik } from "formik";
import Button from "react-bootstrap/Button";
import { Card, Container, Form } from "react-bootstrap";
import { SVGeyePassword } from "../components/SVG_eye_password";
import { useState } from "react";
import { api } from "../json-server/api";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const navigate = useNavigate();
  const [showpassword, setShowpassword] = useState(false);
  const toast = useToast();
  function showpass() {
    setShowpassword(!showpassword);
    if (showpassword) {
      document.getElementById("password").type = "text";
    } else document.getElementById("password").type = "password";
  }

  YupPassword(Yup);
  const formik = useFormik({
    initialValues: { email: "", username: "", phone: "", password: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(""),
      phone: Yup.string().required(""),
      username: Yup.string().required(""),
      password: Yup.string().required().min(8, "minimal 8 characters"),
    }),
    onSubmit: async (values) => {
      const res = await api.post("/user/new_account", {
        params: {
          email: values.email,
          phone: values.phone,
          username: values.username,
          password: values.password,
        },
      });
      const isExist = res.data.payload;
      if (isExist) {
        toast({
          title: "email or username or phone number has been used",
          duration: 1500,
          status: "error",
          position: "top",
        });
      } else {
        await api.post(`/user`, {
          ...values,
          username: values.email,
          gender: "",
          bio: "",
          image_url: "",
          fullname: "",
        });
        toast({
          title: "register success",
          duration: 1500,
          status: "success",
          position: "top",
        });
        navigate(`/login`);
      }
    },
  });
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
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Phone number, email, or username"
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
                variant="primary"
                className="w-100"
                onClick={formik.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
          <span className="my-4">
            <span className="mt-1">Already have an account?</span>
            <a
              href="/login"
              style={{ textDecoration: "none" }}
              className="ml-1"
            >
              Sign in.
            </a>
          </span>
        </Card>
      </Container>
    </>
  );
};
