import { SetStateAction, Dispatch, SyntheticEvent, useRef, useEffect, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import SearchImg from '../img/search2.png';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

export default function Headersearch(props: {formShow: boolean, setFormShow:Dispatcher<boolean>}) {
    const navigate = useNavigate();
    const formInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if(props.formShow){
            formInput.current?.focus();
        }
    }, [props.formShow])

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        
        const target = e.target as typeof e.target & {
            name: {value: string};
        };

        let name: string = target.name.value;
    
        if (name.length > 0){
            while(true){
                if(name.length > 1){
                    if(name.slice(name.length - 2, name.length - 1) === ' '){
                        name = name.slice(0, name.length - 2);
                    }
                    else{
                        break;
                    }
                }
                else{
                    if(name === ' '){
                        name = ''
                    }
                    break;
                }
            }
          
            if(name.slice(0,name.length - 1) !== ''){
                props.setFormShow(false);
                navigate(`/search/${name.toLowerCase().replaceAll(' ', '-')}`);
            }
        }
    };

    const handleClickHideSearch = () => {
        props.setFormShow(false);
    };

    const handleKeyDownHideSearch = (e: KeyboardEvent<HTMLLabelElement>) => {
        if(e.code === 'Enter') {
            props.setFormShow(false);
        }
    };

  return (
    <>
        {props.formShow && 
            <div className='form-container'>
                <label className='form-exit-container' onClick={handleClickHideSearch} onKeyDown={handleKeyDownHideSearch} tabIndex={3}>
                    <div className='form-exit'></div>
                </label>
            
    
                <form action="/" method="Get" onSubmit={handleSubmit}>
                    <input type="text" name="name" id="name" 
                        className="name-search" 
                        ref={formInput} 
                        tabIndex={1}
                    />
                    <input type="image" 
                        src={SearchImg} 
                        name="Submit" 
                        className="submit" 
                        alt='Search' 
                        tabIndex={2}
                    />
                </form>
            </div>
        }
    </>
  )
}
