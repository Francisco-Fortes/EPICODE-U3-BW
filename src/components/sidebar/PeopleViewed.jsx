import { Button, Card, Col, Row } from "react-bootstrap";

const PeopleViewed = () => {
  return (
    <Row>
      <Card className="frame mt-2">
        <Card.Body>
          <Card.Title className="d-flex">
            <h5>People also viewed</h5>
          </Card.Title>
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle"
                src="https://placekitten.com/50/50"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 d-flex row align-items-start">
                <p className="m-0" style={{ color: "red" }}>
                  <span className="f-14b">Name LastName</span> · 1st
                </p>
                <p className="m-0" style={{ color: "red" }}>
                  Job description
                </p>
              </Card.Text>
            </Col>
          </Row>
          {/* Add more fw */}
          <Button className="rd" variant="outline-dark">
            <h5 className="m-0 py-1 px-2">
              <svg
                className="mr-1"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="20"
                fill="currentColor"
                class="bi bi-send-fill"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
              Message
            </h5>
          </Button>
        </Card.Body>
        <Card.Body>
          <Card.Title className="d-flex">
            <h5>People also viewed</h5>
          </Card.Title>
          <Row className="justify-content-around px-4">
            <Col md={3} lg={3} className="p-0">
              <img
                className="circle"
                src="https://placekitten.com/50/50"
                alt="profile"
              />
            </Col>
            <Col md={9} lg={9} className="pl-3">
              <Card.Text className="mb-2 text-muted f-14 d-flex row align-items-start">
                <p className="m-0" style={{ color: "red" }}>
                  <span className="f-14b">Name LastName</span> · 2nd
                </p>
                <p className="m-0" style={{ color: "red" }}>
                  Job description
                </p>
              </Card.Text>
            </Col>
          </Row>
          {/* Add more fw */}
          <Button className="rd" variant="outline-dark">
            <h5 className="m-0 py-1 px-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-person-plus-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path
                  fill-rule="evenodd"
                  d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                />
              </svg>
              Connect
            </h5>
          </Button>
        </Card.Body>
      </Card>
    </Row>
  );
};
export default PeopleViewed;
