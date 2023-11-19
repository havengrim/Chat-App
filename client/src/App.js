import Dashboard from './modules/Dashboard/Dashboard';
import Form from './modules/Form/index';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
   <div className='bg-[#edf3fc] h-screen flex justify-center items-center'>
    <Form/>
    {/* <Dashboard /> */}
   </div>
  );
}

export default App;
