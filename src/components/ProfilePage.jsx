import ProfileCenter from "./ProfileCenter";
import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProfilePage = (props) => {
    const { user_id } = useParams();
    return (
        <Container>
            <Row>
                <Col md={10}>
                    <ProfileCenter id={encodeURIComponent(user_id)} />
                </Col>
                <Col md={2}>
                    <h4>Right sidebar</h4>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfilePage;
