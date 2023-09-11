/* eslint-disable no-unused-vars */
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
  HomeLayout,
  // eslint-disable-next-line no-unused-vars
  Landing,
  Register,
  Login,
  DashboardLayout,
  AddJob,
  Stats,
  AllJobs,
  Profile,
  Admin,
  // eslint-disable-next-line no-unused-vars
  Error,
  EditJob
} from './pages';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader, loader } from './pages/DashboardLayout';
import {action as addJobAction} from './pages/AddJob';
import { loader as AllJobsLoader } from './pages/AllJobs';
import {action as editJobAction} from './pages/EditJob';
import { loader as editJobLoader } from './pages/EditJob';
import {action as DeleteJobAction} from './pages/DeleteJob';
import { loader as adminLoader } from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import {loader as statsLoader} from './pages/Stats';

const checkDefaultTheme = () => {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    document.body.classList.toggle('dark-theme', isDarkTheme);
    return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([
   {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction, 
          },
          { path: 'stats',
           element: <Stats />,
           loader:statsLoader,
         },
          {
            path: 'all-jobs',
            element: <AllJobs />,
            loader: AllJobsLoader,
          },

          {
            path: 'profile',
            element: <Profile />,
            action: profileAction,
          },
          {
            path: 'admin',
            element: <Admin />,
            loader: adminLoader,
          },
          {
            path:'edit-job/:id', 
            element : <EditJob/>,
            loader: editJobLoader,
            action: editJobAction, 

          },
          {
            path:'delete-job/:id',
            action: DeleteJobAction,
          },
        ],
      },
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
    
     {
        index: true,
        element: <Landing />,
      },
      {
        path: 'register',
        element: <Register />,
        action: registerAction,
  
},
      {
        path: 'login',
        element: <Login />,
        action: loginAction,

      },
      {
        path: 'dashboard',
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        
      },
      
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;



