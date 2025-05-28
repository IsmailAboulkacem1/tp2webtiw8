import './App.css'
import Header from './components/Header'
import Content from './components/Content'
import Footer from './components/Footer'
function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        
        <div className="flex flex-col min-h-screen">
      <Header />
      <Content />
      <Footer />
    </div>
        
      </div>

      
    </>
  )
}

export default App