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
import { opts } from "../Morgan";
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

const doFetch = (url, opts, returnJson = false) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch(url, opts);
            if (response.ok) {
                let data;
                if (returnJson) {
                    data = await response.json();
                } else {
                    data = "Valid";
                }
                resolve({
                    status: "ok",
                    data,
                });
            } else {
                resolve({
                    status: "error",
                    data: "Status code was not 200",
                });
            }
        } catch (e) {
            resolve({
                status: "error",
                data: e,
            });
        }
    });
};

export default function FeedPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");

    const [postType, setPostType] = useState("text");
    const [postImage, setPostImage] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState("");
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState("");
    const [deletingPost, setDeletingPost] = useState("");

    const localUser = useSelector((state) => state.activeUser);

    const clearForm = () => {
        setPost("");
        setPostType("text");
        setPostImage(null);
        setPostImageUrl("");
    };

    const fetchPosts = async () => {
        setIsLoading(true);
        const { status, data } = await doFetch(
            "https://striveschool-api.herokuapp.com/api/posts",
            opts,

            true
        );

        if (status === "ok") {
            setError("");
            setIsLoading(false);
            setPosts(data.reverse());
        } else {
            console.error(data);
            setError("Error fetching posts");
            setIsLoading(false);
        }
    };

    const sendPost = async () => {
        setIsUploading(true);

        const { status, data } = await doFetch(
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
            },
            true
        );

        setIsUploading(false);

        if (status === "ok") {
            setPosts([
                {
                    ...data,
                    user: localUser,
                },
                ...posts,
            ]);
        } else {
            console.error(data);
        }
    };

    const sendPostWithImage = async () => {
        console.log("post with image");
        if (!postImage) return sendPost();
        console.log("post with image 2");
        setIsUploading(true);

        const { status, data } = await doFetch(
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
            },

            true
        );

        if (status === "ok") {
            const { _id } = data;

            console.log(_id);

            const formData = new FormData();
            formData.append("post", postImage);

            const { status: status2, data: data2 } = await doFetch(
                "https://striveschool-api.herokuapp.com/api/posts/" + _id,
                {
                    headers: {
                        ...opts.headers,
                    },
                    method: "POST",
                    body: formData,
                },
                true
            );

            setIsUploading(false);

            console.log(status, data2);

            if (status2 === "ok") {
                setPosts([
                    {
                        ...data2,
                        user: localUser,
                    },
                    ...posts,
                ]);
            } else {
                console.error(data2);
            }
        } else {
            setIsUploading(false);
            console.error(data);
        }
    };

    const deletePost = async (id) => {
        setDeletingPost(id);

        const { status, data } = await doFetch(
            "https://striveschool-api.herokuapp.com/api/posts/" + id,
            { ...opts, method: "delete" },
            false
        );

        setDeletingPost("");

        if (status === "ok") {
            setPosts(posts.filter((post) => post._id !== id));
        } else {
            console.error(data);
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
                                        if (postImage) {
                                            sendPostWithImage(post);
                                        } else {
                                            sendPost(post);
                                        }
                                        clearForm();
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
