import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { users } from "../../data/testData";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

/*const validate = (values) => {
  const errors = {};

  if (!values.userName) {
    errors.userName = "Se requiere ingresar el usuario";
  }

  if (!values.password) {
    errors.password = "Se requiere ingresar la contraseña";
  }
  return errors;
};*/

export const Login = () => {
  const [error, setError] = useState(false);
  const [show, setShow] = useState(null);
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: "",
      password: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Usuario requerido"),
      password: Yup.string().required("Contraseña requerida"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await login(values);
        localStorage.setItem("my-personal-workspace", response.token);
        setAuth(values.userName)
        navigate('/dashboard')
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <Card style={{ width: "30rem" }} className="px-3 py-4" border="primary">
      <Card.Body>
        <Card.Title className="pb-5 text-center">
          Introduzca sus datos para ingresar
        </Card.Title>
        {error && (
          <Alert variant="danger" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Usuario y/o contraseña no válidos</Alert.Heading>
            <p>Intente nuevamente</p>
          </Alert>
        )}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            {formik.errors.userName && formik.touched.userName ? (
              <Alert variant="danger">{formik.errors.userName}</Alert>
            ) : null}
            <Form.Control
              id="userName"
              name="userName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              placeholder="Ingrese su usuario"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            {formik.errors.password && formik.touched.password ? (
              <Alert variant="danger">{formik.errors.password}</Alert>
            ) : null}
            <Form.Control
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Password"
            />
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Ingresar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
