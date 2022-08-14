import React, {Component} from 'react';
import BraftEditor from "braft-editor";

class BraftEditorCustom extends Component {
    render() {
        const controls = [
            'text-color', 'code'
        ]

        return (
            <React.Fragment>
                <BraftEditor
                    onChange={this.props.handleEditorChange}
                    controls={controls}
                    placeholder={this.props.placeholder}
                    contentStyle={{height: 110}}
                />
            </React.Fragment>
        );
    }
}

export default BraftEditorCustom;