function TZKTLink(props:any) {
    return (
        <a title={props.title} href={"https://tzkt.io/" + props.id}>{props.children}</a>
    );
}

export default TZKTLink;