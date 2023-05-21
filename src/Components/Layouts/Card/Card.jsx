import React from 'react'
import { Img } from '../../UI/Img/Img'


export const Card = ({imgUrl, styleImg, content, }) => {
    return (
    <div>
        <h3>{content}</h3>
        <hr />
        <Img styleImg={styleImg} url={imgUrl} />
    </div>
    )
}