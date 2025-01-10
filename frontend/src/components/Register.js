import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../styles/Register.css'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
        const match = pwd && matchPwd && pwd === matchPwd; // Only check if both fields are filled and match
        setValidMatch(match);
    }, [pwd, matchPwd]);
    

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user, pwd);
        setSuccess(true);
        //handle storing the username and password in database using api
    }
    return (
        <>
        {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href="#">Sign In</a>
                </p>
            </section>
        ) : ( 
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 class="register">Register</h1>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !user ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input type="text" id="username" ref={userRef}
                       autoComplete="off" onChange={(e) => setUser(e.target.value)}
                       required aria-invalid={validName ? "false" : "true"}
                       aria-describedby="uidnote" onFocus={() => setUserFocus(true)}
                       onBlur={() => setUserFocus(false)}
                />
                <p id="uidnote" className={`instructions ${userFocus && user && !validName ? 'show' : ''}`}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must begin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !pwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input type="password" id="password"
                       autoComplete="off" onChange={(e) => setPwd(e.target.value)}
                       required aria-invalid={validPwd ? "false" : "true"}
                       aria-describedby="pwdnote" onFocus={() => setPwdFocus(true)}
                       onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={`instructions ${pwdFocus && pwd && !validPwd ? 'show' : ''}`}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number, a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span>
                            <span aria-label="at symbol">@</span><span aria-label="hashtag">#</span>
                            <span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                        </p>

                <label htmlFor="confirm-pwd">
                    Confirm Password:
                    <span className={validMatch ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input type="password" id="confirm-pwd"
                       autoComplete="off" onChange={(e) => setMatchPwd(e.target.value)}
                       required aria-invalid={validMatch ? "false" : "true"}
                       aria-describedby="confirmnote" onFocus={() => setMatchFocus(true)}
                       onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmdnote" className={`instructions ${matchFocus && !validMatch ? 'show' : ''}`}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Must match the first password input field.
                        </p> 

                <button disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Sign Up
                </button>
            </form>
            <p class="note">
                Already registered?<br />
                <span className="line">
                    <a class="note" href="#">Sign In</a>
                </span>
            </p>
        </section>
        )} </>
    )
}

export default Register