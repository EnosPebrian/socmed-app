import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { api } from "../json-server/api";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userUpdate } from "../redux/middleware/auth-middleware";
import { renderImage } from "../library/renderImage";
const avatar_url = process.env.REACT_APP_API_IMAGE_AVATAR_URL;
const api_url = process.env.REACT_APP_API;

export const ModalEditProfile = ({ setShowModal, show, setAvatar }) => {
  const handleClose = () => {
    setShowModal("");
  };
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const ref = useRef();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      image_url: userSelector?.image_url,
      username: userSelector.username,
      fullname: userSelector.fullname,
      bio: userSelector.bio,
      gender: userSelector.gender,
      imgae: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      username: Yup.string().min(3),
      fullname: Yup.string().min(2),
    }),
    onSubmit: async (values) => {
      await dispatch(userUpdate(userSelector.id, values))
        .then((result) => {
          if (result === "success")
            toast({
              status: result,
              title: "Successfully update profile",
              duration: 1500,
              isClosable: true,
            });
        })
        .then(() => {
          const temp = document.getElementById("avatarImage").src;
          setAvatar("");
          setTimeout(() => setAvatar(temp), 1500);
          handleClose();
        })
        .catch((err) =>
          toast({
            status: "error",
            title: "Error updating your profile",
            duration: 1500,
            isClosable: true,
            description: err?.message,
          })
        );
    },
  });
  return (
    <>
      <Modal show={show === "OpenModalEditProfile"} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 d-flex justify-content-center my-3">
            <img
              id="editprofile-avatar"
              src={
                api_url + `user/render_image?username=` + formik.values.username
              }
              width={"100px"}
              style={{
                borderRadius: "50%",
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
          </div>
          <Form>
            <Form.Group className="mb-3" controlId="image_url_form">
              <Form.Label style={{ marginRight: "10px" }}>Image url</Form.Label>
              <input
                ref={ref}
                type="file"
                accept="image/*"
                name="image_url"
                onChange={(e) => {
                  renderImage(e, "editprofile-avatar");
                  formik.setFieldValue(`image_url`, e.target.value);
                  formik.setFieldValue(`image`, e.target.files[0]);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
              />{" "}
              {formik.errors.username}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
              />
              {formik.errors.fullname}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                type="text"
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={formik.handleSubmit}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
