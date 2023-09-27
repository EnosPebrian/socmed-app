import { Button, Card, Container, Form } from "react-bootstrap";
import { SVGinstagram } from "../components/SVG/SVG_Instagram";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../json-server/api";
import { useToast } from "@chakra-ui/react";

export const Forgot_password = () => {
  const toast = useToast();
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
    }),
    onSubmit: async (values) => {
      toast({
        title: " processing",
        status: "loading",
        isClosable: true,
        duration: 5000,
      });
      await api
        .post(`/user/forgot_pass/${values.email.toLowerCase()}`, {})
        .then((result) => {
          toast({
            title: result.data,
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        })
        .catch((err) =>
          toast({
            title: err.response.data,
            status: "success",
            duration: 1500,
            isClosable: true,
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
        <h4 className="mt-4">Forgot Password</h4>
        <Form className="mt-5 w-100" style={{ maxWidth: "320px" }}>
          <div style={{ marginBottom: "16px" }}>Email recovery:</div>
          <Form.Group
            className="mb-3"
            controlId="email"
            style={{ position: "relative" }}
          >
            <Form.Control
              type="email"
              placeholder="your email"
              autoFocus
              onChange={(e) =>
                formik.setFieldValue(e.target.id, e.target.value)
              }
            />
            <span className="text-danger">{formik.errors.email}</span>
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
      </Card>
    </Container>
  );
};
