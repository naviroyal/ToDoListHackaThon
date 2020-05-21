import * as React from 'react';
import './styles.css';


export const Button= (props) => {
    const { color, customClassName, ...btnProps } = props;
    return (
        <button className={`btn btn--${color} ${customClassName || ''}`} {...btnProps}>
            {props.children}
        </button>
    );
};
