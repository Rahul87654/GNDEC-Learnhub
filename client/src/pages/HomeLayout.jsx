import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <>
      {/* { <h3> Navbar </h3>} */}
      {/* { <h1>home layout</h1> } */}
      <Outlet />
    </>
  );
};
export default HomeLayout;