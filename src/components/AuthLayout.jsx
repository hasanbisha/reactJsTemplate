import React, { Suspense } from "react";
import Loading from "./Loading";

const AuthLayout = (props) => {
    const children = props.children || null;

    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    );
}

export default AuthLayout;
