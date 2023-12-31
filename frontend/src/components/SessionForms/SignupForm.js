
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';
import { closeModal } from '../../store/modal';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session || {});
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user)).then((res) => {
      if(res && res._id){
        dispatch(closeModal());
      }
    }); 
  }

  return (
    <form className="session-form" onSubmit={handleSubmit}>
      <div className='form-div'>
        <div className="errors">{errors?.email}</div>
        <label className='input-signup'>
          <span>Email: </span>
          <br />
          <input type="text"
            value={email}
            onChange={update('email')}
            placeholder="Email"
            className='text-input-email'
          />
        </label>
        <div className="errors">{errors?.username}</div>
        <label className='input-signup'>
          <span>Username: </span>
          <br />
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
            className='text-input-email'
          />
        </label>
        <div className="errors">{errors?.password}</div>
        <label className='input-signup'>
          <span>Password: </span>
          <br />
          <input type="password"
            value={password}
            onChange={update('password')}
            placeholder="Password"
            className='text-input-password'
          />
        </label>
        <div className="errors">
          {password !== password2 && 'Confirm Password field must match'}
        </div>
        <label className='input-signup'>
          <span>Confirm Password: </span>
          <br />
          <input type="password"
            value={password2}
            onChange={update('password2')}
            placeholder="Confirm Password"
            className='text-input-password'
          />
        </label>
        <br />
        <input
          type="submit"
          value="Sign Up"
          disabled={!email || !username || !password || password !== password2}
          className='submit-button'
        />
      </div>
    </form>
  );
}

export default SignupForm;