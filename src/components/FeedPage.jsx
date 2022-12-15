import React from "react";
import { Row, Col, Container, Modal, Button, Form } from "react-bootstrap";

export default function FeedPage() {
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h4>Left sidebar</h4>
                </Col>
                <Col md={6}>
                    <h4>Col 2</h4>
                </Col>
                <Col md={3}>
                    <h4>Right sidebar</h4>
                </Col>
            </Row>
        </Container>
    );
}
