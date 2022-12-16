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
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState("");
    const [deletingPost, setDeletingPost] = useState("");

    const [postType, setPostType] = useState("text");
    const [postImage, setPostImage] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState("");

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

    const clearForm = () => {
        setPost("");
        setPostType("text");
        setPostImage(null);
        setPostImageUrl("");
    };

    const sendPost = async () => {
        setIsUploading(true);
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
                const data = await response.json();
                setPosts([
                    {
                        ...data,
                        user: localUser,
                    },
                    ...posts,
                ]);
                setIsUploading(false);
            } else {
                setIsUploading(false);
            }
        } catch (e) {
            setIsUploading(false);
            console.log(e);
        }
    };

    const sendPostWithImage = async () => {
        if (!postImage) return sendPost();
        setIsUploading(true);
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
                const { _id } = await response.json();

                const formData = new FormData();
                formData.append("post", postImage);

                const imageUploadResponse = await fetch(
                    "https://striveschool-api.herokuapp.com/api/posts/" + _id,
                    {
                        headers: {
                            ...opts.headers,
                        },
                        method: "POST",
                        body: formData,
                    }
                );
                setIsUploading(false);

                if (response.ok) {
                    const data = await imageUploadResponse.json();
                    setPosts([
                        {
                            ...data,
                            user: localUser,
                        },
                        ...posts,
                    ]);
                }

                // setPosts([
                //     {
                //         text: post,
                //         user: localUser,
                //     },
                //     ...posts,
                // ]);
            } else {
                setIsUploading(false);
            }
        } catch (e) {
            console.log(e);
            setIsUploading(false);
        }
    };

    const deletePost = async (id) => {
        setDeletingPost(id);
        try {
            const response = await fetch(
                "https://striveschool-api.herokuapp.com/api/posts/" + id,
                { ...opts, method: "delete" }
            );

            if (response.ok) {
                setPosts(posts.filter((post) => post._id !== id));
                setDeletingPost("");
            } else {
                setDeletingPost("");
            }
        } catch (e) {
            setDeletingPost("");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (!postImage) return;

        setPostImageUrl(URL.createObjectURL(postImage));
    }, [postImage]);

    return (
        <Container>
            <Row>
                <Col md={3}>
                    <LeftSidebar />
                </Col>
                <Col md={6}>
                    <div className="profile-section start-a-post">
                        <select
                            className="form-control"
                            onChange={(e) => {
                                setPostType(e.target.value);
                            }}
                            disabled={isUploading ? true : false}
                            value={postType}
                        >
                            <option value="text">Text post</option>
                            <option value="image">Image post</option>
                        </select>
                        <br />
                        <div>
                            <img src={localUser?.image} />
                            <input
                                disabled={isUploading ? true : false}
                                type="text"
                                placeholder="Start a post"
                                value={post}
                                onChange={(e) => {
                                    setPost(e.target.value);
                                }}
                            />
                            {post && (
                                <Button
                                    disabled={isUploading ? true : false}
                                    onClick={(e) => {
                                        clearForm();
                                        if (postImage) {
                                            sendPostWithImage(post);
                                        } else {
                                            sendPost(post);
                                        }
                                    }}
                                >
                                    Send
                                </Button>
                            )}
                        </div>

                        {postType === "image" && (
                            <>
                                <hr />
                                <input
                                    disabled={isUploading ? true : false}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setPostImage(e.target.files[0]);
                                    }}
                                />
                            </>
                        )}
                        {postImage && (
                            <>
                                <hr />
                                <img src={postImageUrl} className="upload" />
                                <br /> <br />
                                <Button
                                    className="uploadbtn"
                                    variant="danger"
                                    onClick={(e) => {
                                        setPostImage(null);
                                        setPostImageUrl("");
                                    }}
                                >
                                    Remove image
                                </Button>
                            </>
                        )}
                        {isUploading && (
                            <>
                                <hr />
                                <Spinner />
                            </>
                        )}
                    </div>
                    {isLoading && <Spinner />}
                    {!isLoading &&
                        !error &&
                        posts.slice(0, 25).map((post) => (
                            <>
                                <div
                                    className={`profile-section post activity ${
                                        deletingPost === post._id
                                            ? " deleting"
                                            : ""
                                    }`}
                                >
                                    {localUser._id === post.user._id ? (
                                        <BiPencil className="editPost" />
                                    ) : (
                                        <></>
                                    )}
                                    {localUser._id === post.user._id &&
                                    deletingPost !== post._id ? (
                                        <BiTrash
                                            className="deletePost"
                                            onClick={async (e) => {
                                                deletePost(post._id);
                                            }}
                                        />
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
                                    {post.image ? (
                                        <div className="post-image">
                                            <hr />
                                            <img src={post.image} />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
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
                    <FeedSidebar />
                </Col>
            </Row>
        </Container>
    );
}
