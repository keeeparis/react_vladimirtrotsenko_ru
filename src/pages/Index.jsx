import React, { useContext } from 'react'
import {useDictionary} from '../hooks/dictionary.hook'
import mainImage from '../media/images/main.jpg'
import {AuthContext} from '../context/index'
import { Link } from 'react-router-dom'
import personalIcon from '../media/images/personal-information.png'
import educationIcon from '../media/images/education.png'
import skillIcon from '../media/images/skill.png'

export default function Index() {
    const {lang} = useContext(AuthContext)
    const words = useDictionary(lang)

    return (
        <div className='content'>
            <h2 className='title'>{words.welcome}!</h2>
            <div className='main'>
                <img src={mainImage} alt="" />
                <div className='text'>
                    {words.maintext}
                    {' '}
                    <Link to='/weather' className='link'>{words.example}</Link>
                </div>
            </div>
            <div className='bio'>
                <div className='bio-section'>
                    <img src={personalIcon} alt='Personal info' />
                    <div className='info'>
                        <div className="box1"><span>{words.name}:</span></div>
                        <div className="box2"><span>{words.age}:</span></div>
                        <div className="box3"><span>{words.location}:</span></div>
                        <div className="box4"><span>{words.connect}:</span></div>
                        <p>{words.nameA}</p>
                        <p>{words.ageA}</p>
                        <p>{words.locationA}</p>
                        <p><a 
                            href='mailto:vladimir1trotsenko@gmail.com?subject=Mail to Vladimir' 
                            className='link small' 
                            target='_blank' 
                            rel='noreferrer'
                        >
                            vladimir1trotsenko@gmail.com
                        </a></p>
                    </div>
                </div>
                <div className='bio-section'>
                    <img src={educationIcon} alt='Education Info' />
                    <div className="info">
                        <div className="box1"><span>2018 - 2021:</span></div>
                        <div className="box2"><span>2014 - 2018:</span></div>
                        <p>{words.masterEdu}</p>
                        <p>{words.bachelorEdu}</p>
                    </div>
                </div>
                <div className='bio-section'>
                    <img src={skillIcon} alt="Skills Info" />
                    <div className="info">
                        <div className="box1"><span>{words.languages}:</span></div>
                        <div className="box2"><span>{words.character}:</span></div>
                        <div className='inside-grid'>
                            <div className="box1" style={{fontStyle: 'italic'}}>{words.russian}</div>
                            <div className="box2" style={{fontStyle: 'italic'}}>{words.english}</div>
                            <div className="box3" style={{fontStyle: 'italic'}}>{words.italian}</div>
                            <div className="box-">-</div><p>{words.native}</p>
                            <div className="box-">-</div><p>C1</p>
                            <div className="box-">-</div><p>A2</p>
                        </div>
                        <p>{words.characterA}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
