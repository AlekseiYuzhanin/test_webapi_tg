import React, {useCallback, useEffect, useState} from 'react';
import './ProductsList.css'
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";

const ProductsList = () => {
    const {tg, queryId} = useTelegram();

    const products = [
        {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
        {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
        {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
        {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
        {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
        {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
        {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
        {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
    ]

    const getTotalPrice = (items) => {
        return items.reduce((acc, item) => {
            return acc += item.price;
        }, 0);
    }

    const [addItem, setAddItem] = useState([]);
    const onAdd = (product) => {
        const alreadyAdded = addItem.find(item => item.id === product.id);

        let newItems = [];

        if(alreadyAdded) {
            newItems = addItem.filter(item => item.id !== product.id);
        }else{
            newItems = [...addItem, product];
        }

        setAddItem(newItems);

        if(newItems.length === 0){
            tg.MainButton.hide();
        }else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`,
            })
        }
    }
    const onSendData = useCallback(() => {
        const data = {
            products: addItem,
            totalPrice: getTotalPrice(addItem),
            queryId,
        }
        fetch('https://testwebapitgback-loj2jp3l.b4a.run/web-data', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        })
        tg.sendData(JSON.stringify(data));
    },[tg, addItem,  queryId])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData);
        return () => {
            tg.offEvent('mainButtonClicked', onSendData);
        }
    }, [tg, onSendData]);

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                product={item}
                onAdd={onAdd}
                className={'item'}/>
            ))}
        </div>
    );
};

export default ProductsList;