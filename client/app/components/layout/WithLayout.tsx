import {FunctionComponent} from 'react';
import Layout from './Layout';
import AuthProvider, {IUserContext} from "../../provider/AuthProvider";

export const withLayout = <T extends Record<string, unknown> & IUserContext>(
    Component: FunctionComponent<T>
) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AuthProvider user={props.user} setUser={props.setUser}>
                <Layout>
                    <Component {...props} />
                </Layout>ƒ
            </AuthProvider>
        );
    };
};
