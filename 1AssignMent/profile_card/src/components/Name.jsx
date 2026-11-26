export default function Name(props) {
    const name = {
        fontSize: "2.4rem",
        fontWeight: 800,
        fontFamily: "serif",
        color: "#000",
        margin: 0

    }
    const work = {
        color: "#918a8aff",
        fontFamily: "serif",
        fontSize: "1.3rem",
    }
    return (
        <>
            <p>
                <span style={name}>{props.name}</span><br />
                <span style={work}>{props.work}</span><br />
            </p>
        </>
    )
}