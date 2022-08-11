import {Link, Outlet} from 'umi';
import styles from './index.less';
import {bind_style_2_window, get_default_theme} from "@/theme/default_theme";
import {store} from "@/store/store";
import {GlobalStyles} from "@mui/system";
import {Theme} from "@mui/joy/styles";
import React from "react";
import {Provider} from "react-redux";
import {Box, CssVarsProvider} from "@mui/joy";

export default function Layout() {
    bind_style_2_window();
    const theme = get_default_theme();

    return (
        <div className={styles.navs}>
            <Provider store={store}>
                <CssVarsProvider theme={theme}>
                    <GlobalStyles<Theme>
                        styles={(theme) => ({

                            body: {
                                margin: 0,
                                fontFamily: theme.vars.fontFamily.body,
                            },
                        })}
                    />
                    <Outlet/>
                </CssVarsProvider>
            </Provider>
        </div>
    );
}
