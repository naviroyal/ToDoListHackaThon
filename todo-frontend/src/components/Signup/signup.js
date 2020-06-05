import React from 'react';
import './styles.css';
import {Header} from '../Header/header';
import user from '../../assets/user.png';
import {Link} from 'react-router-dom';
export const SignUp=()=>{
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [username,setUsername]=React.useState('');
    const [phone,setPhone]=React.useState('');
    const [gender,setGender]=React.useState('');
   
    const onEmailChange=(event)=>{
        setEmail(event.target.value);
       
    }

    const onPasswordChange=(event)=>{
        setPassword(event.target.value);
        
    }

    const onPhoneChange=(event)=>{
        setPhone(event.target.value);
       
    }

    const onGenderChange=(event)=>{
        setGender(event.target.value);
        
    }

    const onUsernameChange=(event)=>{
        setUsername(event.target.value);
        
    }


    const checkWithDataBase=()=>{
        let url = 'https://todobackend-api.herokuapp.com/signup';
        fetch(url,{
            method:"POST",
            body:JSON.stringify({
                username:username,
                password:password,
                email:email,
                gender:gender,
                phone_number:phone
            }),
            headers:{
                "Content-type":"application/json; charset=UTF-8",
                'Accept': 'application/json'
            }
        }).then(res=>res.json()).then(data=>{
            console.log('success');
        });
    }

    return (
            <div>
                <Header buttonText="LOGIN"/>
                <div class="wrapper">
                    <div id="formContent">
                        <div >
                        <img src={user} id="icon" alt="User Icon"/>
                        </div>
                        <form method="post" action="/signup">
                            <input type="text" id="username" name="username" placeholder="username" onChange={onUsernameChange}/>
                            <input type="password" id="password" name="password" placeholder="password" onChange={onPasswordChange}/>
                            <input type="text" id="email" name="email" placeholder="email" onChange={onEmailChange}/>
                            <input type="text" id="phone_number" name="phone_number" placeholder="phone" onChange={onPhoneChange}/>
                            <section>
                                <input type="radio" name="gender" value="Male" onChange={onGenderChange}/> Male
                                <input type="radio" name="gender" value="Female" onChange={onGenderChange}/> Female<br/>
                            </section>
                            <Link to="/"><input type="submit" value="Sign Up" onClick={checkWithDataBase}/></Link>
                        </form>
                    </div>
                 </div>
                
            </div>

                   
    );
}