/* eslint-disable react/prop-types */
import { Outlet, redirect, useLoaderData,useNavigate } from 'react-router-dom';

import Wrapper from '../assets/wrappers/Dashboard';
import { Navbar, BigSidebar, SmallSidebar } from '../component';

import { useState, createContext, useContext } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

export const loader = async () => {
  try {
    const{data} = await customFetch.get('/users/current-user')
    return data
  } catch (error) {
   return redirect ('/')
    
  }
};

const DashboardContext = createContext();




const Dashboard = ({isDarkThemeEnabled}) => {
  const {user} = useLoaderData();
  const navigate = useNavigate();
  // temp


  const [showSidebar, setShowSidebar] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);

    const toggleDarkTheme = () => {
        const newDarkTheme = !isDarkTheme;
        setIsDarkTheme(newDarkTheme);
        document.body.classList.toggle('dark-theme', newDarkTheme);
        localStorage.setItem('darkTheme', newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate('/')
    await customFetch.get('auth/logout')
    toast.success('logging out ')
    
  };
  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet context={{user}} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;