import { getExplorerLink } from '../utils/utils';

function TZLink(props: any) {
    return (
        <a title={props.title} href={getExplorerLink(props.id)}>{props.children}</a>
    );
}

export default TZLink;