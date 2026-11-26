export default function Avt(props) {
    const styles = {
        border: "1px solid white",
        margin: "20px",
        padding: "20px"
    }
    return (
        <div style={styles}>
            <h1>Title: {props.title}</h1>
            <h3>Id: {props.id}</h3>
            <p>Description: {props.desc}</p>
            <img src={props.url} alt="" />
            <p>Hobby: {props.hobby[1]}</p>
            <p>Address: {props.address.pin}</p>
            <p>Status: {props.status ? "Active" : "UnActive"}</p>
            <span>{props.fn()}</span>
        </div>
    )
}