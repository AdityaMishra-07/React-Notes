import Sidebar from './components/sidebar'
import Allroutes from './components/Allroutes'

function App() {

  return (
    <div className="flex h-screen bg-gray-1100 text-whiteflex">
      <div className="flex-1 flex justify-center items-center p-6">
        <Allroutes className="flex-1 p-6" />
      </div>
      <Sidebar />
    </div>

  )
}
export default App
