import {SyntheticEvent} from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <main className='sign-container'>
      <div className='form-container'>
        <h2>Sign up</h2>
        <form action="/" method='Post' onSubmit={handleSubmit}>
          <label className='email-conatiner'>
            <input type="email" placeholder='Email' required tabIndex={1}/>
          </label>
          <label className='password-container'>
            <input type="password" placeholder='Password' required tabIndex={2}/>
          </label>
          <label className='password-container'>
            <input type="password" placeholder='Re-enter password' required tabIndex={3}/>
          </label>
          
          <label className='checkbox-container'>
            <input type="checkbox" required tabIndex={4}/>
            Privacy notice
            <abbr className="required" title="required">*</abbr>
          </label>
          <span className='checkbox-description'>
            By creating an account, you agree to <Link to='/terms' tabIndex={5}>privacy notice</Link>.
          </span>

          <label className='checkbox-container'>
            <input type="checkbox" tabIndex={6}/>
            Newsletter
          </label>
          <span className='checkbox-description'>
            Sign up for the newsletter.
          </span>
          <input type="submit" value='Sign up' className='submit' tabIndex={7}/>
        </form>
        <div className='signin-signun-forgotpassword'>
          Already have an account? <Link to='/signin' tabIndex={8}>Sign in. </Link>
        </div>

      </div>
    </main>
    
  )
}
