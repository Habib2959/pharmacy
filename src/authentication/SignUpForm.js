import React from "react";
import { Formik } from "formik";
import "./form.css"
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { authLoading, authFailed, vendorCheck } from "../redux/actionCreators";
import Spinner from "../spinner/Spinner";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";
import "../firebase";


const mapStateToProps = state => {
    return {
        isLoading: state.authReducer.isLoading,
        errorMessage: state.authReducer.errorMessage,
        currentUser: state.authReducer.currentUser,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authLoading: (isLoading) => dispatch(authLoading(isLoading)),
        authFailed: (errorMessage) => dispatch(authFailed(errorMessage)),
        vendorCheck : (isVendor) => dispatch(vendorCheck(isVendor))
    }
}

const auth = getAuth();


class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "Login",
            isLoading: false,
            errorMessage: ''
        }
    }

    toggleMode = () => {
        this.setState({
            mode: this.state.mode === "Login" ? "SignUp" : "Login"
        })
    }
    signIn = async (auth, email, password) => {
        try {
            this.props.authLoading(true);
            await signInWithEmailAndPassword(auth, email, password);
            this.props.authLoading(false);
        } catch (error) {
            this.props.authLoading(false);
            authFailed(error.message)
        }

    }
    signUp = async (auth, email, password, name) => {
        this.props.authLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);

            // update profile
            await updateProfile(auth.currentUser, {
                displayName: name
            })
            this.props.history.push("/user");
            this.props.authLoading(false);
        } catch (error) {
            this.props.authLoading(false);
            authFailed(error.message)
        }
    }

    componentDidMount(){
        this.props.vendorCheck(false)
    }


    render() {
        let form = null;
        if (this.props.isLoading) {
            form = <Spinner />
        } else {
            form =
                (<Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    onSubmit={async (values, action) => {
                        if (this.state.mode === "Login") {
                            this.signIn(auth, values.email, values.password);
                        } else {
                            this.signUp(auth, values.email, values.password, values.name)
                        }
                    }}
                    validate={values => {
                        const errors = {};

                        if (this.state.mode !== "Login") {
                            if (!values.name) {
                                errors.name = <div className="error-div">Requied</div>;
                            }
                        }
                        if (!values.email) {
                            errors.email = <div className="error-div">Requied</div>
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                            errors.email = <div className="error-div"> Invalid email address</div>;
                        }
                        if (!values.password) {
                            errors.password = <div className="error-div">Required</div>
                        } else if (values.password.length < 8) {
                            errors.password = <div className="error-div">Minimum 8 character</div>
                        }

                        if (this.state.mode !== "Login") {
                            if (!values.confirmPassword) {
                                errors.confirmPassword = <div className="error-div">Required</div>;
                            } else if (values.confirmPassword !== values.password) {
                                errors.confirmPassword = <div className="error-div">Password didn't match</div>;
                            }
                        }

                        return errors;
                    }}
                >
                    {({ values, handleChange, handleSubmit, errors }) => (
                        <div className="card-center">
                            <div className="card p-3" style={{ width: '50rem', boxShadow: "1px 1px 4px 0px #000" }}>
                                <div className="mt-4">
                                    <form onSubmit={handleSubmit}>
                                        {this.state.mode !== "Login" ? (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={values.name}
                                                    onChange={handleChange}
                                                    className='form-control'
                                                    placeholder="Enter your name"
                                                />
                                                {errors.name}
                                                <br />
                                            </div>
                                        ) : null}

                                        <input
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className='form-control'
                                            placeholder="Enter your email"
                                        />
                                        {errors.email}
                                        <br />
                                        <input
                                            type="password"
                                            name="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className='form-control'
                                            placeholder="Enter your password"
                                        />
                                        {errors.password}
                                        <br />
                                        {this.state.mode !== "Login" ? (
                                            <div>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    className='form-control'
                                                    placeholder="Confirm your password"
                                                />
                                                {errors.confirmPassword}
                                                <br />
                                            </div>
                                        ) : null}

                                        <button type="submit" disabled={this.state.isLoading} className="btn submit-btn" >{this.state.mode === "Login" ? "Login" : "Signup"}</button>
                                        <br />
                                        <div className="mt-2">
                                            <p>
                                                {this.state.mode === "Login" ? "Don't have an account? " : "I have an account. "}
                                                <span onClick={this.toggleMode} className="mode-change main-font-color">
                                                    {this.state.mode === "Login" ? "Signup" : "Login"} here</span>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    )}
                </Formik>)
        }
        return (
            <div>
                {form}
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));