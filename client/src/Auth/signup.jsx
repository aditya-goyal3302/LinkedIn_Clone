import React ,{ useState, useEffect }from 'react';
import StyleSheet from './login.module.css';
import axios from 'axios';

const Signupage = ( {setPage} ) => {
    const [email, setemail] = useState('');
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [Confirmpassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [sucess, setSucess] = useState('');
    
    const handleemailChange = (e) => {
        setemail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === Confirmpassword)
        axios.post('/admin/signup',{
                method:"POST",
                body:JSON.stringify({
                  name: Name,
                  email: email,
                  password: password
                }),
                headers:{ 
                  "Content-Type":"application/json"
                }
            }).then((res) => {
                if(res.data == 'User created'){
                    setSucess(res.data+" Successfully redirecting to login page in 5 seconds...")
                    setTimeout(() => {
                        
                        setPage(1)
                    }, 5000);
                }
                else{
                    setError(res.data)
                }
              })
        else{
            setError("Passwords do not match")
        }
    };

    return (
        <div className={StyleSheet.main}> 
            <h2>SignUp</h2>
            <form onSubmit={handleSubmit}>
            {sucess !=='' && <p style={{color: 'green',textAlign:"center"}}>{sucess}</p>} 
            {error !=='' && <p style={{color: 'red',textAlign:"center"}}>{error}</p>}
            <div>
                    <label>Name: </label>
                    <input type="text" value={Name} onChange={handleNameChange} />
                </div>
                <br />
                <div>
                    <label>Email: </label>
                    <input type="text" value={email} onChange={handleemailChange} />
                </div>
                <br />
                <div>
                    <label>Password: &nbsp;</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <br />
                <div>
                    <label>Confirm Password: &nbsp;</label>
                    <input type="password" value={Confirmpassword} onChange={handleConfirmPasswordChange} />
                </div>
                <br />
                <button type="submit">Login</button>
            </form>
            <button className={StyleSheet.cbtn} onClick={()=>{setPage(1)}}>Already a User? Login Here</button>
        </div>
    );
};

export default Signupage;