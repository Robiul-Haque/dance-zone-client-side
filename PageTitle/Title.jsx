/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet";

const Title = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="utf-8" />
            <title>{title} | Dance Zone</title>
            <link rel="canonical" href="http://localhost:5173/" />
        </Helmet>
    );
};

export default Title;