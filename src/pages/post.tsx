import React, {Component} from 'react';
import {Box} from "@mui/joy";
import index_styles from "@/pages/index.less";
import {curstyle} from "@/theme/curtheme";
import Headline from "@/layouts/headline/headline";
import PostsPanel from "@/layouts/posts_panel/posts_panel";
import PostView from "@/layouts/post_view/post_view";

class Post extends Component {
    state = {}

    render() {
        const content_height = "calc(100vh - 1px - " + curstyle().headlineheight + ")"
        return (
            <React.Fragment>
                <Box className={index_styles.headline}
                     sx={{
                         height: curstyle().headlineheight
                     }}
                >
                    <Headline/>
                </Box>
                <Box sx={{
                    display: "flex",
                    direction: "row"
                }}>
                    <Box sx={{
                        width: "38vw",
                        height: content_height,
                        borderWidth: "0px 1px",
                        borderStyle: "solid",
                        borderColor: curstyle().colors.gray_d
                    }}>
                        <PostsPanel>
                        </PostsPanel>
                    </Box>
                    <Box sx={{
                        width: "72vw",
                        height: content_height
                    }}>
                        <PostView>
                        </PostView>
                        <PostView>
                        </PostView>
                    </Box>
                </Box>

            </React.Fragment>
        );
    }
}

export default Post;