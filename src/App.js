import logo from './logo.svg';
import './App.css';
import Form from './component/Form';

function App() {
  return (
    <div className="App bg-gray-200 h-screen">
     <div className="container font-poppins">
        <h1 className="font-bold text-2xl text-gray-700 pt-5">TODOAPP USING REACT HOOKS AND LOCALSTORAGE</h1>
        <div className="w-1/2  mx-auto mt-5">
        <Form />
        </div>
     </div>
    </div>
  );
}

export default App;
