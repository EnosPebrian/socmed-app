import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { api } from "../json-server/api";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { renderImage } from "../library/renderImage";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ModalNewPost = ({ setShowModal, show, fetchPosts }) => {
  const handleClose = () => {
    setShowModal("");
  };
  const toast = useToast();

  const ToastSuccess = (title = "Success", description = "") => {
    return toast({
      status: "success",
      title: title,
      description: description,
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const ToastError = (title = "Error", description = "") => {
    return toast({
      status: "error",
      title: title,
      description: description,
      duration: 2000,
      isClosable: true,
      position: "top",
    });
  };

  const userSelector = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: { image_url: "", image: "", caption: "" },
    validationSchema: Yup.object().shape({
      image_url: Yup.string().required("must not empty"),
    }),
    onSubmit: async (values) => {
      values.user_id = userSelector?.id;
      const formData = new FormData();
      Object.entries(values).forEach((value) => {
        formData.append(value[0], value[1]);
      });

      try {
        const token = localStorage.getItem("instagram-auth");
        handleClose();
        await api.post(`/post/new_post?token=${token}`, formData);
        ToastSuccess();
        fetchPosts(1);
      } catch (err) {
        ToastError("Error on generating new post", err?.response?.data);
      }
    },
  });

  return (
    <>
      <Modal show={show === "OpenModalNewPost"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <img src="" alt="" id="modal-new-post" />
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="image_url_form">
              <Form.Label>Upload image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                name="image_url"
                onChange={async (e) => {
                  try {
                    const image_url = await renderImage(e, "modal-new-post");
                    formik.setFieldValue("image_url", image_url);
                    formik.setFieldValue("image", e.target.files[0]);
                  } catch (err) {
                    console.log(err);
                  }
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="caption_form">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="caption"
                onChange={(e) =>
                  formik.setFieldValue("caption", e.target.value)
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
