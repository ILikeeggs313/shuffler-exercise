import React, {useState} from "react";
import "./Card.css";
const Card = ({name, image}) => {
    const [{ angle, xPos, yPos }] = useState({
    angle: Math.random() * 90 - 45,
    xPos: Math.random() * 40 - 20,
    yPos: Math.random() * 40 - 20,
  });
  //why are the elements not used?
  const transformTheCards = `
  translate(${xPos}px, ${yPos}px, rotate(${angle}deg)`;

    return(
        <div>
            <img
                 className = "card-img"
                 alt = {name}
                 src = {image}
                 style = {{transformTheCards}}
            />
        </div>
    )
}



export default Card;
