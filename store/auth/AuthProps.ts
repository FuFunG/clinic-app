import { connect, ConnectedProps } from "react-redux";
import { RootState } from "..";
import { login, logout, updateAccessToken } from "./action";
import { AuthState } from "./types";

const mapState = (state: RootState) => ({
    auth: state.auth,
});

const mapDispatch = {
    logout: () => logout(),
    login: (loginPayload: AuthState) => login(loginPayload),
    updateAccessToken: (newToken: string) => updateAccessToken(newToken),
};

export const AuthConnector = connect(mapState, mapDispatch);

export type AuthProps = ConnectedProps<typeof AuthConnector>;