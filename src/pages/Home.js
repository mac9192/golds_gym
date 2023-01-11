import React, { useState } from 'react';
import { Box } from '@mui/material';

import Exercises from '../components/Excersises'
import SearchExercises from '../components/SearchExercises'
import HeroBanner from '../components/HeroBanner'



const Home = () => {

    
    //(Exercises) Add searched exercises to the state to display it later on UI.
    //The reason it was moved to Home instead of 'SearchExercises' is because this search and its changed will reflect the whole application. Sends it to 'SearchExercises' and 'Exercises'
    const [exercises, setExercises] = useState([])

    const [bodyPart, setBodyPart] = useState('all')

    console.log(bodyPart);


    return (
        <Box>
            <HeroBanner />
            <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart}/> {/*Passing over state into this component*/}
            <Exercises exercises={exercises} setExercises={setExercises} bodyPart={bodyPart} isBodyParts />  {/*Passing over state into this component*/}
        </Box>
    )
}

export default Home
