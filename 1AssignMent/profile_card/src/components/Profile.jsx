export default function Profile(props) {
    const styles = {
        height: "170px",
        width: "170px",
        borderRadius: "100%",
        border: "3px solid #cfcccc",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"

    }
    return (
        <>
            <img src={props.url} style={styles} alt="" />
        </>
    )
}