export default function Buttons(props) {
    const styles = {
        backgroundColor: "white",
        color: "black",
        border: "1px solid #888",
        borderRadius: '40px'
    }
    return (
        <>
            <button style={styles}>{props.skill}</button>
        </>
    )
}