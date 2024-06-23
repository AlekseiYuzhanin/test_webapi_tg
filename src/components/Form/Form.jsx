import React, {useState, useEffect, useCallback} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";
import Button from "../Button/Button";

const Form = () => {
    const [country, setCountry] = useState('');
    const [street, setStreet] = useState('');

    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
        }
        tg.sendData(JSON.stringify(data));
    },[country,street,tg])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [tg, onSendData]);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные',

        })
    }, [tg.MainButton]);

    useEffect(() => {
        if(!street || !country){
            tg.MainButton.hide();
        }else{
            tg.MainButton.show();
        }
    }, [country,street,tg.MainButton]);


    const onChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const onChangeStreet = (e) => {
        setStreet(e.target.value);
    }

    return (
        <div className={"form"} >
            <h3>Откуда узнал о команде?</h3>
            <br></br>
            <input
                className={'input'}
                type="text"
                value={country}
                onChange={onChangeCountry}/>
            <br></br>
            <h3>Есть ли опыт работы в данной тематике?</h3>
            <br></br>
            <input
                className={'input'}
                type="text"
                value={street}
                onChange={onChangeStreet}/>
            <br></br>
            <Button onClick={onSendData}>knopka</Button>
        </div>
    );
};

export default Form;