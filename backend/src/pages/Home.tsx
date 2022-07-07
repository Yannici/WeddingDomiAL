import { useEffect, useRef, useState } from "react";
import { Alert, Col, Container, Row, Table } from "reactstrap";
import { IAlert, Registration } from "../interfaces";
import "./Home.css";

const Home = () => {
  const [alert, setAlert] = useState<IAlert>({
    visible: false,
    color: "",
    message: "",
  });
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const registrationsLoad = useRef(false);

  useEffect(() => {
    if (registrationsLoad.current) return;
    registrationsLoad.current = true;

    fetch(process.env.REACT_APP_API_ENDPOINT + "/registrations")
      .then((res) => res.json())
      .then((data) => setRegistrations(data.message))
      .catch((err) =>
        setAlert({
          visible: true,
          color: "danger",
          message: "Fehler beim Laden der Registrierungen.",
        })
      );
  }, [registrations, setRegistrations]);

  return (
    <div className="home">
      <Container>
        <Row>
          <Col className="mt-3">
            <Table bordered size="sm" striped>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Nimmt teil?</th>
                  <th>Anmeldung</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id}>
                    <td>{reg.name}</td>
                    <td>
                      <strong>
                        {reg.participation ? (
                          <span className="text-success">Ja</span>
                        ) : (
                          <span className="text-danger">Nein</span>
                        )}
                      </strong>
                    </td>
                    <td>{new Date(reg.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {alert.visible && (
              <Alert className="mt-3" color={alert.color}>
                {alert.message}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
