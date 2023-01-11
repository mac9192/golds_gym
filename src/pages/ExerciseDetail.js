import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import Detail from '../components/Detail'
import ExerciseVideos from '../components/ExerciseVideos'
import SimilarExercises from '../components/SimilarExercises'

import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData'

const ExerciseDetail = () => {
    //1
    const [exerciseDetail, setExerciseDetail] = useState({});
    //2
    const [exerciseVideos, setExerciseVideos] = useState([])
    //3
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    //4
    const [equipmentExercises, setEquipmentExercises] = useState([])

    const { id } = useParams(); //Passing in the diffrerent IDs in order to provide data/descriptions accordingly from URL. 
    

    useEffect(() => {
        const fetchExercisesData = async () => { /*Calling for exerciseetail*/
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com'
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com'

            //1. API call to exercises
            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
            setExerciseDetail(exerciseDetailData); //Setting Exercise Detail to state

            //2. API call to exercise videos on YouTube
            const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
            setExerciseVideos(exerciseVideosData.contents) //set exerciseVideo to useState setExerciseVideos

            //3. API call to target muscles
            const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
            setTargetMuscleExercises(targetMuscleExercisesData);

            //4. API call to Equipment
            const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
            setEquipmentExercises(equipmentExercises);
        }
        fetchExercisesData();
    }, [id]) //Recalls function whenever there is a new ID in the URL
    
    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail}/> {/*Sending exerciseDetail data to our detail component*/}
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} /> {/*Sending exerciseVideos to ExerciseVideos component*/}
            <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises}/>
        </Box>
    )
}

export default ExerciseDetail
