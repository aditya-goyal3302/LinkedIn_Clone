import React, { useState } from 'react';
import StyleSheet from './login.module.css';
import {useDispatch} from 'react-redux'
import {Login_user} from '../Store/userSlice'


const LoginPage = ( {setPage} ) => {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch()

    


    const handleemailChange = (e) => {
        setemail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('')
        if(email === '' || password === ''){
            setError('Please fill all the fields')
            return
        }
        dispatch(Login_user({email:email,password:password}));

        // axios.post('/admin/login',{
        //     method:"POST",
        //     body:JSON.stringify({
        //         email: email,
        //         password: password
        //     }),
        //     headers:{ 
        //         "Content-Type":"application/json"
        //     }
        // }).then((res) => {
        //     console.log(res.data)
        //     if(res.data.code===1){
        //         dispatch(Login(res.data.data))
        //     }
        //     else{   
        //         setError(res.data.e)
        //     }
        // })
        // Perform login logic here
    };

    return (
        <div className={StyleSheet.main}> 
            <h2>Login</h2>
            {error !=='' && <p style={{color: 'red',textAlign:"center"}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email: </label>
                    <input type="text" value={email} onChange={handleemailChange} />
                </div>
                <br />
                <div>
                    <label>Password: &nbsp;</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
            <button className={StyleSheet.cbtn} onClick={()=>{setPage(2)}}>Not a User? Signup Here</button>
        </div>
    );
};

export default LoginPage;