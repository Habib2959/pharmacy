import React from "react";
import "../form.css";
import "../../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { connect } from "react-redux";
import { VendorAuthLoading } from "../../redux/vendorActionCreator";
import { Link} from "react-router-dom";
import { vendorCheck } from "../../redux/actionCreators";


const mapStateToProps = state => {
    return {
        isLoading: state.VendorAuthReducer.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        VendorAuthLoading: isLoading => dispatch(VendorAuthLoading(isLoading)),
        vendorCheck : (isVendor) => dispatch(vendorCheck(isVendor))
    }
}

const auth = getAuth();

class VendorSignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, this.state.email, this.state.password);
        } catch (error) {
            console.log(error.message);
        }
    }

    componentDidMount(){
        this.props.vendorCheck(true)
    }


    render() {
        return (
            <>
                <div className="card-center">
                    <div className="card p-3" style={{ width: '50rem', boxShadow: "1px 1px 4px 0px #000" }}>
                        <div className="my-4">
                            <form onSubmit={this.handleSubmit}>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email"
                                    className="form-control"
                                    onChange={this.handleChange} />
                                <br />
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    className="form-control"
                                    onChange={this.handleChange} />
                                <br />
                                <button type="submit" className="btn submit-btn">Sign in</button>
                            </form>
                            <Link to="/vendor-apply"><button className="btn submit-btn">Apply as a vendor</button></Link>
                        </div>
                    </div>
                </div>
                
            </>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorSignIn);