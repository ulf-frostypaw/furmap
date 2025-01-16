import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";

interface UserProps extends Record<string, string | undefined>{
    username: string;
}
const User = () => {
    const { username } = useParams<UserProps>();
    const [userInfo, setUserInfo] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${username}`, {
                    method: "GET"
                });

                if (!response.ok) {
                    throw new Error('Network error, try later.');
                }

                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                setError("Error: " + error);
            } finally {
                setLoading(false);
            }
        };

        getUserInfo();
    }, [username]);

    if (loading) {
        // TODO: LOADING PROFILE SKELETON
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return(
        <Layout title="User profile">
            <Container className="my-4">
                <Row>
                    <Col>
                        <div className="text-center">
                            <img src={userInfo[0]?.user_picture 
                            ? `${import.meta.env.VITE_API_URL}/storage/${userInfo[0].user_picture}` 
                            : `${import.meta.env.VITE_APP_URL}/d-user.png`} alt={userInfo[0].name + "'s picture"} style={{aspectRatio: "1/1", maxWidth: "250px", borderRadius: "50%"}} />
                        </div>
                    </Col>
                    <Col xs={9}>
                        <section>
                            <h1>{userInfo[0]?.name}</h1>
                            <div className="d-flex align-items-center">
                                {userInfo[0]?.username && (
                                    <>
                                        <p className="text-muted mb-0" style={{ marginTop: "-1rem" }}>
                                            @<i>{userInfo[0].username}</i>
                                        </p>
                                    </>
                                )}
                                {
                                    userInfo[0]?.type_user === "admin" ? <span className="badge bg-primary ms-2" style={{ marginTop: "-1rem" }}>Admin</span> : ""
                                }
                            </div>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, eius itaque, in rerum, incidunt saepe porro nemo voluptas unde error ullam vero consequatur tempore velit dicta ipsa id quasi. Quod!</p>
                            <span><strong>Member since:</strong> <code>{moment(userInfo[0]?.created_at).format('YYYY-MM-DD')}</code></span>
                        </section>
                    </Col>
                </Row>
                
            </Container>
        </Layout>
    )
}

export default User;