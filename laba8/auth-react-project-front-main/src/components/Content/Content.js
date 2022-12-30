import React from "react"
import "./content.css"
import photo from "./photo.png"


class Content extends React.Component {
    constructor(props){
        super(props)
        this.state={eigthCl:false, ninthCl:false}
    }
    eighthElementClick(e){
        if (!this.state.eigthCl){
           e.target.style.color = 'white';
           e.target.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }else{
           e.target.style.color = 'black';
           e.target.style.backgroundColor = null;   
        }
        this.setState(prevState=>({eigthCl:!prevState.eigthCl, ninthCl:prevState.ninthCl}))
    };
    ninthElementClick(e){
        if (!this.state.ninthCl){
           e.target.style.backgroundColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        }else{
           e.target.style.backgroundColor = null;   
        }
        this.setState(prevState=>({eigthCl:prevState.eigthCl, ninthCl:!prevState.ninthCl}))
    }

    render (){
        return (
            <div>
                <div className="blocks">
                    <div className="block">
                        <p>My birthday: <span>11.06.2002</span></p>
                    </div>
                    <div className="block">
                        <p>My city: <span>Slovyansk, Donetsk region</span></p>
                    </div>
                </div>

                <div id="education">
                    <h3>Education</h3>
                    <ul>
                        <li>2008-2015 Slovyansk School No. 13</li>
                        <li>2015-2019 Slovyansk Pedagogical Lyceum of Slovyansk City Council of Donetsk Region</li>
                        <li>2019-2023 National Technical University of Ukraine “Igor Sikorsky Kyiv Polytechnic Institute”</li>
                    </ul>
                </div>

                <div className="blocks gap-block">
                    <div className="square-block">
                        <h3>My hobbies</h3>
                        <ul>
                            <li id="eighth-element" onClick={(e)=>this.eighthElementClick(e)}>Yoga</li>
                            <li id="ninth-element" onClick={(e)=>this.ninthElementClick(e)}>Singing</li>
                            <li>Painting</li>
                            <li>Playing the piano</li>
                            <li>Playing computer games</li>
                        </ul>
                    </div>
                    <div className="square-block">
                        <h3>My fav movies</h3>
                        <div className="center-block">
                            <ol>
                                <li>The Intern (2015)</li>
                                <li>Pride and Prejudice (2005)</li>
                                <li>The Proposal (2009)</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div id="fav-city">
                    <a href="https://www.slavrada.gov.ua/">
                        <img src={photo} id="city" alt="city" width="400"/>
                    </a>
                    <p>
                        My favorite city where I was - Sloviansk. It is such a native, beloved, very beautiful town. They are forever in my heart. 
                        In my city there are incredible mountains, lakes and rivers. 
                        If you asked me where to go in Sloviansk, I would say visit Karachun and pond #14
                    </p>
                </div>
            </div>
        )
    }
}

export default Content
