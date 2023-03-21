import React, {useEffect, useState} from "react";
import axios from "axios";

const DrawCard = () => {
    let BASE_API = "https://deckofcardsapi.com/api/deck/";
    //initially no deck, then we get a deck
    const [deck, setDeck] = useState(null);
    const [draw, setDraw] = useState([]);

    useEffect(function loadDeckAPI() {
            //we use axios and async here to get the first shuffle
            async function getData() {
                const shuffleData = await axios.get(
                    `${BASE_API}/new/shuffle`
                )
                setDeck(shuffleData);
            };
            getData()
            //we add a [] callback for useEffect
    }, []);

    async function drawCard() {
        try{
            const res = await axios.get(`${BASE_API}/${deck.deck_id}/draw`);
            //throw an error if no card left
            if(res.data.remaining === 0) throw new Error("No cards left in deck");
            //otherwise, draw a card
            const card = res.data.cards[0];
            setDraw(data => [
                ...data,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    img: card.image
                }
            ])

        } catch (e) {
            return alert(e)
        }
    }
    //leave blank to implement shuffle 
    

    //
    function getButtonToDraw() {
        if (!deck) return null;
        //then we render a button
        return(
            <>
                <button
                    className = "button-to-draw"
                    onClick = {drawCard}
                >
                    DRAW A CARD!
                </button>
            </>
        )
    }


    return(
        <div>
            {getButtonToDraw()}
        </div>
    )
}

export default DrawCard;