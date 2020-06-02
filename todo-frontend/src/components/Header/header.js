import React from 'react';
import './styles.css';
import {Link} from 'react-router-dom';
export const Header=(props)=>{

    return (
        <div>
            <section className="header">
            <h1  style={{color:'black'}}>
            <i className="fa fa-edit" aria-hidden="true"></i> To-do List
             </h1>
             {props.buttonText==='SIGN UP'?<Link to='/signup'><input style={{float:'right',margin:'0.5em 0.5em', padding:'15px 50px'}} type="submit" value={props.buttonText}/></Link>:<Link to='/'><input style={{float:'right',margin:'0.5em 0.5em', padding:'15px 50px'}} type="submit" value={props.buttonText}/></Link>}
            </section>
            <section className="progress-container" >
                <div></div>
             </section>
        </div>
        
    );
}