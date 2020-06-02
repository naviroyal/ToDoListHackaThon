import React from 'react';
import './styles.css';
import {Header} from '../Header/header';
import { Link} from 'react-router-dom';
import user from '../../assets/user.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

export const Login=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [login,setLogin]=React.useState(true);

    const onEmailChange=(event)=>{
        setEmail(event.target.value);
    }

    const onPasswordChange=(event)=>{
        setPassword(event.target.value);
    }

    const notify = () => toast.success('Success', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success-container toast-success-container-after',
      progressClassName: css({
        background: '#2AC56C',
      }),
      });
    
      const notify1 = () => toast.success('Username Password not match', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'toast-success-container toast-success-container-after fail',
      progressClassName: css({
        background: '#2AC56C',
      }),
      });

    const checkWithDataBase=()=>{
        let url = 'https://todobackend-api.herokuapp.com/login';
        // const settings={
        //     method:"POST",
        //     body:JSON.stringify({
        //         password:password,
        //         email:email,
        //     }),
        //     headers:{
        //         "Content-type":"application/json; charset=UTF-8",
        //         'Accept': 'application/json'
        //     }
        // };
        // try{
        //     const response=await fetch(url,settings);
        //     const data=await response.json();
        //     if(data.success===true)
        //     {
        //         setLogin(false);
        //         console.log(login)
        //     } 
        //     if(data.success===false)
        //     {
        //         console.log('yead')
        //         setLogin(true);
        //         console.log(login)
        //     }
        // }
        // catch (e){
        //     return e;
        // }
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                password:password,
                email:email,
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>(res.json())).then(data=>{
           console.log(data);
           if(data.success===true)
           {
               setLogin(false);
               console.log(login)
               notify();
           } 
           if(data.success===false)
           {
               console.log('yead')
               setLogin(true);
               console.log(login)
               notify1();
           }
          
        }); 
        // if(login==1)
        //     notify();
        // else
        //     notify1();
        
    }

    return (
            <div>
                <ToastContainer
                className="toast-container"
                position="top-center"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                <Header buttonText="SIGN UP"/>
                <div class="wrapper">
                    <div id="formContent">
                        <div >
                        <img src={user} id="icon" alt="User Icon"/>

                        </div>

                        <form >
                            <input type="text" id="login" name="email" placeholder="email" onChange={onEmailChange}/>
                            <input type="password" id="password" name="password" placeholder="password" onChange={onPasswordChange}/>
                            {!login ? <Link to={{
                                            pathname:"/home",
                                            state:{
                                                email:email
                                            }
                                            }}><input type="submit" value="LogIn" onClick={checkWithDataBase}/></Link>:<Link to="/"><input type="submit" value="LogIn" onClick={checkWithDataBase}/></Link>}
                        </form>
                        <div id="formFooter">
                        <span style={{color:'grey'}}>Not Registered? </span>
                        <span class="underlineHover" ><Link to="/signup">Create New Account</Link></span>
                        </div>

                    </div>
                </div>
                
            </div>

                   
    );
}