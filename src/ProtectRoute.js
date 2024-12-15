import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function ProtectRoute({isAuthenticated, childrem}) {
    if(!isAuthenticated) {
        return <Navigate to={'/login'} replace/>;
    }
    return Children;
}

export default ProtectRoute;