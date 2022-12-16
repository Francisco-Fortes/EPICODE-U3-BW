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
import "../Profile.css";
import "../Feed.css";
import {
    BiLike,
    BiCommentDetail,
    BiRepost,
    BiSend,
    BiPencil,
    BiTrash,
} from "react-icons/bi";
import { useSelector } from "react-redux";
import FeedSidebar from "./FeedSidebar";
import LeftSidebar from "./LeftSidebar";

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + "y";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + "m";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + "d";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + "h";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + "mins";
    }
    return Math.floor(seconds) + " s";
}

export default function FeedPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState("");
    const localUser = useSelector((state) => state.activeUser);

    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/posts",
                opts
            );
            if (response.ok) {
                const data = await response.json();
                setError("");
                setIsLoading(false);
                setPosts(data.reverse());
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

    const sendPost = async (text) => {
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/posts",
                {
                    headers: {
                        ...opts.headers,

                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                        text: post,
                    }),
                }
            );

            if (response.ok) {
                fetchPosts();
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <LeftSidebar/>
                </Col>
                <Col md={6}>
                    <div className="profile-section start-a-post">
                        <img src={localUser?.image} />
                        <input
                            type="text"
                            placeholder="Start a post"
                            value={post}
                            onChange={(e) => {
                                setPost(e.target.value);
                            }}
                        />
                        {post && (
                            <Button
                                onClick={(e) => {
                                    sendPost(post);
                                    setPost("");
                                }}
                            >
                                Send
                            </Button>
                        )}
                    </div>
                    {isLoading && <Spinner />}
                    {!isLoading &&
                        !error &&
                        posts.slice(0, 25).map((post) => (
                            <>
                                <div className="profile-section post activity">
                                    {localUser._id === post.user._id ? (
                                        <BiPencil className="editPost" />
                                    ) : (
                                        <></>
                                    )}
                                    {localUser._id === post.user._id ? (
                                        <BiTrash className="deletePost" />
                                    ) : (
                                        <></>
                                    )}
                                    <div className="post-author">
                                        <div>
                                            <img src={post.user.image} />
                                        </div>
                                        <div>
                                            <span className="name">
                                                {post.user.name}{" "}
                                                {post.user.surname}
                                            </span>
                                            <span className="date">
                                                {timeSince(
                                                    new Date(post.createdAt)
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="post-text">{post.text}</div>
                                </div>
                                <div className="post-buttons">
                                    <div>
                                        <BiLike size={20} />
                                        Like
                                    </div>
                                    <div>
                                        <BiCommentDetail size={20} />
                                        Comment
                                    </div>
                                    <div>
                                        <BiRepost size={20} />
                                        Repost
                                    </div>
                                    <div>
                                        <BiSend size={20} />
                                        Send
                                    </div>
                                </div>
                            </>
                        ))}
                </Col>
                <Col md={3}>
                    <FeedSidebar/>
                </Col>
            </Row>
        </Container>
    );
}
