import React from 'react'
import classes from './input.module.css';

const input = props => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];
    
    if (props.invalid && props.shouldValidate && props.touched) {
        
        inputClasses.push(classes.Invalid);
    }

    switch ( props.elementType){
        case ('input'):
            inputElement = 
                <input 
                    className={inputClasses.join(' ')} 
                    onChange={props.changed}
                    {...props.elementConfig}  
                    value ={props.value}
                ></input>
            break;
        case ('testarea'):
            inputElement = 
                <textarea 
                    className={inputClasses.join(' ')} 
                    onChange={props.changed}
                    {...props.elementConfig}  
                    value ={props.value}
                ></textarea>
            break;
        case ('select'):
            inputElement = 
                <select 
                    className={inputClasses.join(' ')}  
                    onChange={props.changed}
                    value ={props.value}
                    >
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                
                </select>
            break;
        default:
            inputElement = 
                <input
                    className={inputClasses.join(' ')} 
                    onChange={props.changed}
                    {...props.elementConfig} 
                    value={props.value}
                ></input>
}


  return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
    </div>
  )
}


export default input
