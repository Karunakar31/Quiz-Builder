import React, {useState, useContext, useEffect} from 'react'
import styles from './Home.module.css'
import Sidebar from '../../components/Sidebar/Sidebar'
import Dashboard from '../Dashboard/Dashboard'
import CreateQuiz from '../CreateQuiz/CreateQuiz'
import Analytics from '../Analytics/Analytics'
import GlobalContext from '../../context/GlobalContext'
import {useNavigate} from 'react-router-dom'

const pages = ['Dashboard', 'Analytics', 'Create Quiz']

const Home = () => {
    const [selected, setSelected] = useState(0);
    const {isAuthenticated} = useContext(GlobalContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAuthenticated){
            navigate('/login')
        }
    }, [])

    const changeSelected = (index)=>{
        setSelected(index)
    }


  return (
    <div className={styles.home}>
        <Sidebar changeSelected={changeSelected} selected={selected} />
        <div className={styles.homeright}>
            {selected === 0 && <Dashboard />}
            {selected === 1 && <Analytics />}
            {selected === 2 && <CreateQuiz />}
        </div>
    </div>
  )
}

export default Home