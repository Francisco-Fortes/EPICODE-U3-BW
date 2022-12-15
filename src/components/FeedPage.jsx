import React from "react";
import {
    Row,
    Col,
    Container,
    Modal,
    Button,
    Form,
    Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { opts, uri } from "../Morgan";

export default function FeedPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);

    const fetchPosts = async () => {
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/posts",
                opts
            );
            if (response.ok) {
                const data = await response.json();
                setError("");
                setIsLoading(false);
                setPosts(data);
            } else {
                setError("Error fetching profile");
                setIsLoading(false);
            }
        } catch (e) {
            console.log(e);
            setError("Error fetching profile");
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <h4>Left sidebar</h4>
                </Col>
                <Col md={6}>
                    <h4>Feed</h4>
                    <hr />
                    {isLoading && <Spinner />}
                    {!isLoading &&
                        !error &&
                        posts.slice(0, 25).map((post) => (
                            <div
                                style={{
                                    background: "white",
                                    padding: "1em",
                                    marginBottom: "1em",
                                }}
                            >
                                <p>{post.text}</p>
                                <p>
                                    by {post.user.name} {post.user.surname}
                                </p>
                            </div>
                        ))}
                </Col>
                <Col md={3}>
                    <h4>Right sidebar</h4>
                </Col>
            </Row>
        </Container>
    );
}
