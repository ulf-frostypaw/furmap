import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

interface UserProps extends Record<string, string | undefined>{
    username: string;
}
const User = () => {
    const { username } = useParams<UserProps>()
    return(
        <Layout title="User profile">
            <h1>{username ? username : "User not found"}</h1>
        </Layout>
    )
}

export default User;