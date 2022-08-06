import reuse from '@/assets/reuseable.less'
import headline from './headline.less'
export default function Headline() {
    return (
        <div className={reuse.row_flex2side_container}>
            <div className={headline.square}>logo</div>
            <div className={headline.title}>localpiazza</div>
            <div className={headline.square}>user</div>
        </div>
    );
}