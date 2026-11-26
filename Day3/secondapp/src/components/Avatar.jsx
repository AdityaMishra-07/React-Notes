function Avatar() {
    const styles = {
        border: "1px solid white",
        margin: "20px",
        padding: "20px"
    }
    return (
        <div style={styles}>
            <h1>Title: Iron Man</h1>
            <p>Description: Marval</p>
            <img src="https://i.imgflip.com/4/ggur0.jpg" alt="" />
        </div>
    )
}
export default Avatar;