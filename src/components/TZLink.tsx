function TZLink(props:any) {
    return (
        <a title={props.title} href={"https://hangzhou.tzstats.com/" + props.id}>{props.children}</a>
    );
}

export default TZLink;