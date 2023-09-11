/* eslint-disable no-unused-vars */
// import { Link } from 'react-router-dom';
// import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
// import Logo from '../components/Logo';



// const Register = () => {
//   return (
//       <Wrapper>
//           <form className='form'>
//               <Logo />
//               <h4> Register </h4>
//               <div className="form-row">
//                   <label htmlFor="name" className='form-label'> name </label>
//                   <input type="text" name="name" id="name"
//                       className='form-input' defaultValue="Rahul "
//                        required 
//                   />
//               </div>
//               <button type='submit' className='btn btn-block'>
//                   submit
//               </button>
//               <p>
//                   Already a Member ??
//                 <Link to ='/login' className='member-btn'> Login  </Link>
//               </p>
//           </form>
//   </Wrapper>
//   )
// }

// export default Register
import { Form, redirect,  Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { FormRow, Logo , SubmitBtn} from '../component';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify'
export const action = async ({request}) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    
    await customFetch.post('/auth/register', data)
    toast.success('Registered Succesfully')
    return redirect('/login');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
 
};

const Register = () => {
   
  return (
    <Wrapper>
      <Form method='post' className='form'>
        <Logo />
        <h4>Register</h4>
        <FormRow type='text' name='name'      />
        <FormRow type='text' name='lastName' labelText='last name'  />
        <FormRow type='text' name='location'  />
        <FormRow type='email' name='email'     />

        <FormRow type='password' name='password' />

        <SubmitBtn formBtn />
        <p>
          Already a member?
          <Link to='/login' className='member-btn'>
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};
export default Register;