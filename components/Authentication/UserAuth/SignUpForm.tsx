'use client';

import { useRef, useState, useEffect } from "react";

import { faCheck, faTimes, faInfoCircle, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import './styles.css';
import '../../BookingForm/BookingForm.css'
import PhoneNumberInput from "../../PhoneNumberInput";

interface PasswordValidationResult {
    valid: boolean;
    message: string[];
}

interface EmailValidationResult {
    invalid: boolean;
    messages: string[];
}

export interface SignUpFormData {
    name: string;
    email: string;
    contactNumber: string;
    gender: string;
    invalidEmailMsg: string[];
    validName: boolean;
    emailFocus: boolean;
    password: string;
    invalidPwdMsg: string[];
    validPwd: boolean;
    pwdFocus: boolean;
    matchPwd: string;
    validMatch: boolean;
    matchFocus: boolean;
    errMsg: string;
    success: boolean;
}

interface SignUpFormProps {
    onSignUp: (formData: SignUpFormData) => void;
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const validateEmail = (email: string): EmailValidationResult => {
    const messages: string[] = [];

    if (!EMAIL_REGEX.test(email)) {
        messages.push('Invalid email address. Please, enter a valid email address.');
    }

    return { invalid: messages.length > 0, messages };
};

const validatePassword = (password: string): PasswordValidationResult => {
    if (PWD_REGEX.test(password)) {
        return { valid: true, message: ['Password is valid'] };
    }

    const requirements: string[] = [];
    if (!/(?=.*[a-z])/.test(password)) {
        requirements.push('At least one lowercase letter');
    }
    if (!/(?=.*[A-Z])/.test(password)) {
        requirements.push('At least one uppercase letter');
    }
    if (!/(?=.*[0-9])/.test(password)) {
        requirements.push('At least one digit');
    }
    if (!/(?=.*[!@#$%])/.test(password)) {
        requirements.push('At least one special character (!@#$%)');
    }
    if (password.length < 8 || password.length > 24) {
        requirements.push('Between 8 and 24 characters');
    }

    return { valid: false, message: requirements };
};

const BasicSignUpForm: React.FC<SignUpFormProps> = ({ onSignUp }) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLDivElement>(null);

    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState<SignUpFormData>({
        name: '',
        email: '',
        contactNumber: '',
        gender: 'male',
        invalidEmailMsg: [],
        validName: false,
        emailFocus: false,
        password: '',
        invalidPwdMsg: [],
        validPwd: false,
        pwdFocus: false,
        matchPwd: '',
        validMatch: false,
        matchFocus: false,
        errMsg: '',
        success: false,
    });

    const handlePhoneNumberChange = (phoneNumber: string | undefined) => {
        setFormData(prevState => ({ ...prevState, contactNumber: phoneNumber ?? '' }));
    };

    useEffect(() => {
        if (emailRef.current) emailRef.current.focus();
    }, []);

    useEffect(() => {
        const { invalid, messages } = validateEmail(formData.email);
        setFormData(prevState => ({
            ...prevState,
            validName: !invalid,
            invalidEmailMsg: messages,
        }));
    }, [formData.email]);

    useEffect(() => {
        const { valid, message } = validatePassword(formData.password);
        setFormData(prevState => ({
            ...prevState,
            validPwd: valid,
            invalidPwdMsg: message,
            validMatch: formData.password === formData.matchPwd,
        }));
    }, [formData.password, formData.matchPwd]);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            errMsg: '',
        }));
    }, [formData.email, formData.password, formData.matchPwd]);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsLoading(true);

        e.preventDefault();

        const { invalid, messages } = validateEmail(formData.email);
        const v1 = !invalid;
        setFormData(prevState => ({
            ...prevState,
            invalidEmailMsg: messages,
        }));
        const { valid, message } = validatePassword(formData.password);
        const v2 = valid;
        setFormData(prevState => ({
            ...prevState,
            invalidPwdMsg: message,
        }));

        if (!v1 || !v2) {
            setIsLoading(false);
            setFormData(prevState => ({
                ...prevState,
                errMsg: 'Invalid Entry',
            }));
            return;
        }
        onSignUp(formData);
    };

    return (
        <>
            {formData.success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={formData.errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{formData.errMsg}</p>
                    <form className="authenticationForm target-div" onSubmit={handleSubmit}>
                        <div className="column">
                            <div className="row-container">
                                <div className="column">
                                    <label htmlFor="name">Full Name:</label>
                                    <input
                                        type="text"
                                        id="fullname"
                                        autoComplete="off"
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, name: e.target.value }))}
                                        value={formData.name}
                                        required
                                        aria-describedby="uidnote"
                                        onFocus={() => setFormData(prevState => ({ ...prevState, emailFocus: true }))}
                                        onBlur={() => setFormData(prevState => ({ ...prevState, emailFocus: false }))}
                                    />
                                    <label htmlFor="email">
                                        Email:
                                        <FontAwesomeIcon icon={faCheck} className={formData.validName ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={formData.validName || !formData.email ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        ref={emailRef}
                                        autoComplete="off"
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, email: e.target.value }))}
                                        value={formData.email}
                                        required
                                        aria-invalid={formData.validName ? "false" : "true"}
                                        aria-describedby="uidnote"
                                        onFocus={() => setFormData(prevState => ({ ...prevState, emailFocus: true }))}
                                        onBlur={() => setFormData(prevState => ({ ...prevState, emailFocus: false }))}
                                    />
                                    <p id="uidnote" className={formData.emailFocus && formData.email && !formData.validName ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        {/* {formData.invalidEmailMsg.map((msg) => (
                                            <span> {'msg'} </span>
                                        ))} */}
                                    </p>

                                    <label>Phone Number:</label>
                                    <div style={{ width: "95%" }}>
                                        <PhoneNumberInput onPhoneNumberChange={handlePhoneNumberChange} />

                                    </div>
                                </div>

                                <div className="column">
                                    <label htmlFor="gender">Gender:</label>
                                    <select
                                        id="gender"
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, gender: e.target.value }))}
                                        value={formData.gender}
                                        required
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="others">Others</option>
                                    </select>

                                    <label htmlFor="password">
                                        Password:
                                        <FontAwesomeIcon icon={faCheck} className={formData.validPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={formData.validPwd || !formData.password ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, password: e.target.value }))}
                                        value={formData.password}
                                        required
                                        aria-invalid={formData.validPwd ? "false" : "true"}
                                        aria-describedby="pwdnote"
                                        onFocus={() => setFormData(prevState => ({ ...prevState, pwdFocus: true }))}
                                        onBlur={() => setFormData(prevState => ({ ...prevState, pwdFocus: false }))}
                                    />
                                    <p id="pwdnote" className={formData.pwdFocus && !formData.validPwd ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} /> Password must contain:
                                        <ul>
                                            {formData.invalidPwdMsg.map((msg, index) => (
                                                <li key={index}>{msg}</li>
                                            ))}
                                        </ul>
                                    </p>

                                    <label htmlFor="confirm_pwd">
                                        Confirm Password:
                                        <FontAwesomeIcon icon={faCheck} className={formData.validMatch && formData.matchPwd ? "valid" : "hide"} />
                                        <FontAwesomeIcon icon={faTimes} className={formData.validMatch || !formData.matchPwd ? "hide" : "invalid"} />
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_pwd"
                                        onChange={(e) => setFormData(prevState => ({ ...prevState, matchPwd: e.target.value }))}
                                        value={formData.matchPwd}
                                        required
                                        aria-invalid={formData.validMatch ? "false" : "true"}
                                        aria-describedby="confirmnote"
                                        onFocus={() => setFormData(prevState => ({ ...prevState, matchFocus: true }))}
                                        onBlur={() => setFormData(prevState => ({ ...prevState, matchFocus: false }))}
                                    />
                                    <p id="confirmnote" className={formData.matchFocus && !formData.validMatch ? "instructions" : "offscreen"}>
                                        <FontAwesomeIcon icon={faInfoCircle} />
                                        Must match the first password input field.
                                    </p>

                                </div>
                            </div>
                            <button disabled={!formData.validName || !formData.validPwd || !formData.validMatch}>Sign Up</button>
                        </div>
                    </form>
                    <div className="loading-icon" style={{ visibility: isLoading ? "visible" : "hidden" }}>
                        <FontAwesomeIcon icon={faSpinner} spin size="6x" />
                    </div>
                </section>
            )}
        </>
    )
};

function SignUpForm({ onButtonClick }: { onButtonClick: (formData: SignUpFormData) => void }) {
    return (
        <BasicSignUpForm onSignUp={onButtonClick} />
    );
}

export default SignUpForm;
