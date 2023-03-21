import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "./card";
import "./DrawCard.css";

const DrawCard = () => {
    let BASE_API = "https://deckofcardsapi.com/api/deck/";
    //initially no deck, then we get a deck
    const [deck, setDeck] = useState(null);
    const [draw, setDraw] = useState([]);
    const [shuffle, setShuffle] = useState(false);

    useEffect(function loadDeckAPI() {
            //we use axios and async here to get the first shuffle
            async function getData() {
                const shuffleData = await axios.get(
                    `${BASE_API}/new/shuffle`
                )
                setDeck(shuffleData.data);
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
                    image: card.image
                }
            ])

        } catch (e) {
            return alert(e)
        }
    }
    //leave blank to implement shuffle 
    async function getShuffle(){
        setShuffle(true);
        //we can use a try and catch to catch errors
        try{
            await axios.get(`${BASE_API}/${deck.deck_id}/shuffle`);
            setDraw([]);

        } catch (e){
            alert(e);
        } finally{
            setShuffle(false);
        }
    }

    //
    function getButtonToDraw() {
        if (!deck) return null;
        //then we render a button
        return(
            <>
                <button
                    className = "button-to-draw"
                    onClick = {drawCard}
                    disabled = {shuffle}
                >
                    DRAW A CARD!
                </button>
            </>
        )
    }

    //get shuffle button
    function getShuffleButton(){
        if(!deck) return null;
        return(
            <button
                className = "button-to-shuffle"
                onClick = {getShuffle}
                disabled = {shuffle}

            > Shuffle

            </button>
        )
    }


    return(
       <main className = "DrawCard">
           {getButtonToDraw()}
           {getShuffleButton()}

           <div className = "card-area">
               {draw.map(c =>(
                   //we need to map over the cards
                   <Card key = {c.id} name = {c.name} image = {c.image} />
                   )
               )}
           </div>
       </main>
    )
}

export default DrawCard;