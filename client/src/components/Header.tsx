
import reactLogo from '../assets/react.svg'
import viteLogo  from '../assets/vite.png'
// Importez le CSS global depuis la racine du src
import '../App.css'

export default function Header() {
  return (
    <header className="w-full bg-blue-600 text-white p-4 text-center">
      <h1 className="text-4xl font-extrabold mb-4">Bienvenue sur mon TP1 TIW8</h1>
      <p className="text-lg text-gray-200 mb-6">
        Cette application illustre la stack <strong>Vite + React + TypeScript</strong>,  
        servie via un serveur Node/Express.
      </p>
      <div className="logo-container flex items-center justify-center my-8">
        <img src={viteLogo}  className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
    </header>
  )
}
