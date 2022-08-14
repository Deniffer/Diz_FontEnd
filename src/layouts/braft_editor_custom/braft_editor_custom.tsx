import React, {Component} from 'react';
import BraftEditor from "braft-editor";

class BraftEditorCustom extends Component {
    state = {
        placeholder: "请输入正文..."
    }

    render() {
        const controls = [
            'text-color', 'code'
        ]

        return (
            <React.Fragment>
                <BraftEditor
                    onChange={() => {
                        this.setState({
                            placeholder: ""
                        })
                        this.props.handleEditorChange.bind(this)
                    }}
                    controls={controls}
                    placeholder={this.state.placeholder}
                    contentStyle={{height: 110}}
                />
            </React.Fragment>
        );
    }
}

export default BraftEditorCustom;