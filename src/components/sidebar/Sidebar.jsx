import AdPremium from "./AdPremium";
import Edit from "./Edit";
import Experiences from "./Experiences";
import PeopleKnow from "./PeopleKnow";
import PeopleViewed from "./PeopleViewed";
import "./sidebar.css";

const { Container, Row, Col } = require("react-bootstrap");

const Sidebar = () => {
  return (
    <>
      <Edit text="Edit public profile & URL" />
      <Edit text="Add profile in another language" />
      <AdPremium />
      <PeopleViewed />
      <PeopleKnow />
    </>
  );
};
export default Sidebar;
