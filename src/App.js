
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import Main from './component/Main';
import UpdateUser from './component/UpdateUser';
import User from './component/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>,
    children: [
      {
        path: '/user', 
        element: <User></User>,
        loader: ()=> fetch('http://localhost:5000/users')
      },
      {
        path: '/update/:id', 
        element: <UpdateUser></UpdateUser>,
        loader: ({params})=>fetch(`http://localhost:5000/update/${params.id}`)
        
      }
    ]
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
