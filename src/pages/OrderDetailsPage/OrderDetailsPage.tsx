import React from "react";
import Details from "../../components/Details/Details";
import {useParams} from "react-router-dom";

const OrderDetailsPage = () => {
    let {prodId} = useParams<{prodId: string}>();
    return <main>
        <div style={{height: "86px"}}></div>
        <Details buttonCaption={'Назад до замовлень'} mode={'order'} id={prodId}/>
    </main>
}

export default OrderDetailsPage;