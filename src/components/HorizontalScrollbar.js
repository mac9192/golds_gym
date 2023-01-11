import React, { useContext } from 'react'
import { Box, Typography } from '@mui/material';
import BodyPart from './BodyPart'  
import ExerciseCard from './ExerciseCard'

import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

import RightArrowIcon from '../assets /icons/right-arrow.png'
import LeftArrowIcon from '../assets /icons/left-arrow.png'


const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);
  
    return (
      <Typography onClick={() => scrollPrev()} className="right-arrow">
        <img src={LeftArrowIcon} alt="right-arrow" />
      </Typography>
    );
  };
  
  const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);
  
    return (
      <Typography onClick={() => scrollNext()} className="left-arrow">
        <img src={RightArrowIcon} alt="right-arrow" />
      </Typography>
    );
  };

const HorizontalScrollbar = ({ data, bodyPart, setBodyPart, isBodyParts }) => {     //Component recieves data (bodyParts) from SearchExercises.js
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
            {data.map((item) =>                 //For every element mapped, create a box. The key is needed if it is being looped over. Minute 1:01:00
            <Box 
                key={item.id || item}
                itemId={item.id || item}
                title={item.id || item} 
                m="0 40px"
            >
                {isBodyParts ? <BodyPart item ={item}          //Import individual card design from BodyPart.js and pass item
                          bodyPart = {bodyPart}
                          setBodyPart={setBodyPart} />
                      : <ExerciseCard exercise={item} /> }
            </Box>)}
        </ScrollMenu>
    )
}

export default HorizontalScrollbar
