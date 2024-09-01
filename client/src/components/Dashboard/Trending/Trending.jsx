import React, {useEffect, useContext} from 'react'
import QuizItem from '../QuizItem/QuizItem'
import GlobalContext from '../../../context/GlobalContext'
import styles from './Trending.module.css'



const Trending = () => {
    const {trending, getTrending} = useContext(GlobalContext);

    useEffect(() => {
        getTrending();
    }, []);
  return (
    <div className={styles.trending}>
        <h1 className={styles.trendingtitle}>Trending Quizs</h1>
        <div className={styles.trendingquizs}>
            {
                trending.map((quiz, index) => (
                    <QuizItem key={index} quiz={quiz} />
                ))
            }
        </div>
    </div>
  )
}

export default Trending