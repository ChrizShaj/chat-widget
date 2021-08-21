import React, { useEffect, useState } from "react";
import searchIcon from '../assets/images/search.png';
import cancel from '../assets/images/cancel.png';
import './chatWindow.css'
import axios from "axios";
import { render } from "react-dom";
import { Bounce } from "react-activity";
import "react-activity/dist/Bounce.css";

const ChatWindow = ({ handleClick }) => {
    const [preDefinedQueries, setPreDefinedQueries] = useState(''); 
    const [partners, setPartners] = useState('');
    const [search, setSearch] = useState('');
    const [toggleSearch, setToggleSearch] = useState(false);
    const [result, setResult] = useState([]);
    const [called, setCalled] = useState(false);
    const [bounce, setBounce] = useState(false);


    //  useEffect 

    useEffect(() => {
       if(toggleSearch == false) {
        if (preDefinedQueries == 'Email Setup/Verification') {
            if (partners !== '') {
                getData();
            }
        } else {
            getData();
        }
       }
    }, [preDefinedQueries, partners])

    const handlePreDefinedQueries = (event) => {
       
        if(toggleSearch == false) {
            setSearch('')
        }
        setPreDefinedQueries(event.target.value)
        setCalled(true);
    }

    const handlePartners = (event) => {
        setPartners(event.target.value);
        if (preDefinedQueries !== 'Email Setup/Verification') {
            setPartners('');
            setCalled(true);
        }
      
    }

    const handleSearch = (event) => {
      
        setSearch(event.target.value);
        setCalled(true);

    }

    const handleKeyDown = (e) => {
        console.log(e.key)
          setPartners('');
            setPreDefinedQueries('');
       
        if (e.key === 'Enter') {
                getData();
        }
    }

    const getData = () => {
        setBounce(true);
        setResult([]);
        
        let queryString = preDefinedQueries + ' ' + partners + ' ' + search;
        let query = queryString.replace(/\s+/g, ' ').trim();
        let api_url = query + '&per_page=10'

        axios.get(api_url).then(res => {
            setTimeout(() => {
                setBounce(false);
                setResult(res.data.results);
            }, 500);

        }, err => {
            setBounce(false);
            console.log('Error', err['response'])
        })
    }

    return (
        <>

            <div className="chatWindow">
                <div className="chatHeader">
                    <div className="flx align-center justify-between">
                        <div className="helpHeader">
                            Help
                        </div>
                        <div className="close" onClick={handleClick}>
                            X
                        </div>
                    </div>


                    {
                        (toggleSearch == false) && (
                            <>
                                <div>
                                    <select value={preDefinedQueries} onChange={handlePreDefinedQueries}>
                                        <option value="" disabled selected>Pre Defined Queries</option>
                                        <option value="Email Setup/Verification">Email Setup/Verification</option>
                                        <option value="Create/Manage email address from Email Control Panel">Create/Manage email address from Email Control Panel</option>
                                        <option value="Compose Emails">Compose Emails</option>
                                        <option value="Email Signatures">Email Signatures</option>
                                        <option value="Email bounce back">Email bounce back</option>
                                        <option value="Import contacts">Import contacts</option>
                                        <option value="Backup emails">Backup emails</option>
                                        <option value="Forgot Password">Forgot Password</option>
                                        <option value="Keyboard Shortcuts">Keyboard Shortcuts</option>
                                        <option value="Why am I not receiving emails?">Why am I not receiving emails?</option>
                                        <option value="Configure Titan Mail on Outlook">Configure Titan Mail on Outlook</option>

                                    </select>
                                </div>

                                <div>
                                    {
                                        preDefinedQueries == 'Email Setup/Verification' && (
                                            <select value={partners} onChange={handlePartners}>
                                                <option value="" disabled selected>Partner</option>
                                                <option value="TSO Host">TSO Host</option>
                                                <option value="Hostinger">Hostinger</option>
                                                <option value="Namecheap">Namecheap</option>
                                                <option value="Namesilo">Namesilo</option>
                                                <option value="Guzel">Guzel</option>
                                                <option value="Miss Group">Miss Group</option>
                                                <option value="RumahWeb">RumahWeb</option>
                                                <option value="Web.com">Web.com</option>
                                                <option value="Heart Internet">Heart Internet</option>
                                                <option value="Papaki">Papaki</option>
                                                <option value="WordPress">WordPress</option>
                                                <option value="HostGator">HostGator</option>
                                                <option value="Zyro">Zyro</option>

                                            </select>
                                        )
                                    }
                                </div>
                            </>
                        )
                    }

                    {
                        toggleSearch == true && (
                            <div className="w-100 flx justify-center relative">
                                <img src={searchIcon} className="absolute search-icon" />
                                <input value={search} onChange={handleSearch} onKeyPress={handleKeyDown} />
                                <img src={cancel} className="absolute cancel-icon" onClick={() => { setSearch('') }} />
                            </div>
                        )
                    }

                    <div className="search-text" onClick={() => setToggleSearch(!toggleSearch)}>
                        {
                            toggleSearch == true ? 'Search from Predefined Queries' : 'Any other queries ?'
                        }
                    </div>


                </div>

                <div className="chatBody" style={(called == false) ? { height: 0 } : { height: 374 }}>
                    {
                        bounce && (
                         <div className="no-data">
                                <div className="bounce-pos">
                                <Bounce color="#1F73B7" size={18} speed={0.8} animating={true} />
                            </div>
                             </div>
                        )
                    }
                    <ol>
                        {
                            result.map((item, index) => {
                                return (

                                    <li key={index}>
                                        <a href={item?.html_url} target="_blank">{item?.title}</a>
                                    </li>

                                )
                            })
                        }
                    </ol>

                    {
                        (result.length == 0 && bounce == false)&& (
                            <div className="no-data">
                                There are no results
                            </div>
                        )
                    }
                </div>

            </div>
        </>
    )
}

export default ChatWindow;