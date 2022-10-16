import { getSessionCookie } from "../services/sessionCookie";
import React from "react";

export const SessionContext = React.createContext(getSessionCookie());
