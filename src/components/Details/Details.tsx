import React, {useEffect, useState} from "react";
import classes from "./Details.module.css";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../Store";
import {
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification
} from "../../util/Notifications/notifications";
import {useHistory} from "react-router-dom";
import {logoutRequest} from "../../Store/auth-slice";
import {AnyAction} from "@reduxjs/toolkit";

interface DetailsProps {
    id: string;
    buttonCaption: string;
    mode: string;
}

interface DetailsItem {
    id: string;
    title: string;
    price: string;
    imgUrl: string;
}


let detailItem: DetailsItem;

const Details: React.FC<DetailsProps> = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector<RootState, boolean>(state => state.auth.isAuth);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetails = () => {
            setIsLoading(true);
            fetch("http://localhost:8080/product/" + props.id)
                .then((response) => {
                    return response.json();
                })
                .then((item) => {
                    if(!item || item.error){
                        showWarningNotification("Товар не знайдено");
                        history.push('/products/0');
                        setIsLoading(false);
                    }
                    detailItem = item;
                    console.log(item);
                    setIsLoading(false);
                })
                .catch((err) => {
                    showWarningNotification("Помилка сервера");
                    console.log(err);
                });
        };

        fetchDetails();
    }, []);

    const detailsClickHandler = () => {
        if (props.mode === 'product') {
            fetch('http://localhost:8080/order', {
                credentials: 'include',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                        prodId: props.id,
                        price: detailItem.price
                    }
                )
            }).then(res => {
                return res.json();
            }).then(res => {
                if (res.isNotAuth) {
                    showWarningNotification('Час дії сесії вичерпано');
                    dispatch(logoutRequest() as unknown as AnyAction);
                    history.push('/login');
                    return;
                }

                console.log(res);
                showSuccessNotification('Додано до замовлень');
                return;
            }).catch(err => {
                console.log(err);
                return;
            });
        }

        if(props.mode === 'order') {
            history.push('/orders');
            return;
        }
    }

    return (
        <div className={classes.details_container}>
            {!isLoading && (<>
                <img
                    src={detailItem.imgUrl}
                    alt={detailItem.title}
                />
                <div className={classes.details_description}>{detailItem.title}</div>
                <div className={classes.details_description}>{detailItem.price} грн.</div>
                {isAuth && <button className={classes.details_btn} onClick={detailsClickHandler}>
                    {props.buttonCaption}
                </button>}
            </>)}
        </div>
    );
};

export default Details;