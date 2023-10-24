import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); 
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className='form-div'>
        <div className="errors">{errors?.email}</div>
        <label className='email-input'>
          <span>Email: </span>
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label className='password-input'>
          <span>Password: </span>
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
          />
        </label>
        <input
          type="submit"
          value="Log In"
          disabled={!email || !password}
          className='submit-button'
        />
      </div>
    </form>
  );
}

export default LoginForm;