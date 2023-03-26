import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'


const Rating = (props) => {
    const stars = []
    if((props.rating % 1) == 0){
        for(let i=0; i<(5 - (props.rating - (props.rating % 1))); i++){
            stars.push(<BsStar />);
        }
    } else {
        for(let i=0; i<(4 - (props.rating - (props.rating % 1))); i++){
            stars.push(<BsStar />);
        }
        stars.push(<BsStarHalf />);
    }
    for(let i=0; i<(props.rating - (props.rating % 1)); i++){
        stars.push(<BsStarFill />);
    }

    return (
        <div className="flex gap-1">
            { 
                stars.map(star => star)
            }
        </div>
    )
}

export default Rating