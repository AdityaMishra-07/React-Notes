import Buttons from './components/Buttons'
import Profile from './components/Profile'
import Name from './components/Name'
import './App.css'

function App() {

  return (
    <div className="card">
      <div className="innerCard">
        <div className="left-section">
          <Name
            name="Aditya Mishra"
            work="Full Stack Developer"
          />
          <button className="follow">Follow</button>

          <div className="skill-buttons">
            <Buttons skill="ReactJS" />
            <Buttons skill="NodeJS" />
            <Buttons skill="JavaScript" />
            <Buttons skill="SQL" />
            <Buttons skill="Java" />
            <Buttons skill="MongoDB" />
            <Buttons skill="React Hooks" />
            <Buttons skill="React Native" />
          </div>
        </div>
        <Profile className="profile"
          url="https://adityamishra-07.github.io/MY-Profile-Card/images/myprofileimg.jpg"
        />

      </div>
    </div>

  )
}

export default App
