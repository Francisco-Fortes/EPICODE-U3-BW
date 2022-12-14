import AdPremium from "./AdPremium";
import Edit from "./Edit";
import PeopleKnow from "./PeopleKnow";
import PeopleViewed from "./PeopleViewed";
import "./sidebar.css";

const { Container, Row, Col } = require("react-bootstrap");

const SideBar = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8} lg={8}>
          Main card
        </Col>
        {/* SIDEBAR STARTS HERE */}
        <Col md={4} lg={4}>
          <Edit text="Edit public profile & URL" />
          <Edit text="Add profile in another language" />
          <AdPremium />
          <PeopleViewed />
          <PeopleKnow />
        </Col>
      </Row>
    </Container>
  );
};
export default SideBar;
