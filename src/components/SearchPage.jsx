import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

export default function SearchPage() {
    const { search } = useParams();
    const users = useSelector((state) => state.users);
    const searchedUser = users.filter((user) => {
        return `${user.name} ${user.surname}`.toLowerCase().includes(search);
    });
    console.log(searchedUser);
    return (
        <>
            <Container className="searchcontainer">
                {searchedUser.map((user) => (
                    <>
                    <div ><div className="searchflex"><img className="userpfp" src={user.image} alt="user profile picture" />
                        <div className="searchflex2"><Link to={`/in/${user._id}`}>
                            <p>
                                {user.name} {user.surname}
                            </p>
                        </Link>
                        <p>{user.email}</p>
                        </div>
                        </div>
                        </div>
                    </>
                ))}
            </Container>
        </>
    );
}
