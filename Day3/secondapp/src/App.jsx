import Avatar from './components/Avatar'
import Greet from './components/Greet'
import Avt from './components/Avt'
import './App.css'

function App() {

  return (
    <>
      <h1>Hello from Vite App</h1>
      <Greet />
      <Avatar />
      {/* dynamic */}
      <Avt
        id={2}
        title="Deadpool"
        desc="Sony + DC + Marval"
        url="https://i.imgflip.com/4/z55dp.jpg"

        hobby={[]}
        address={{}}
        status={{}}
        fn={() => ""}
      />

      <Avt
        id={3}
        title="Wolverine"
        desc="DC + Marval"
        url="https://i.imgflip.com/4/1laqjn.jpg"
        hobby={["Action", "Fighting"]}
        address={{ pin: "333" }}
        status={true}
        fn={() => "I am Wolverine"}
      />
    </>
  )
}

export default App
