import React from "react";
import "./userChoosing.css"
import { Nav, NavItem } from 'reactstrap';
import { Link } from "react-router-dom";

class UserChoosing extends React.Component {
    render() {
        return (
            <>
                <div className="userChoose">
                    <h1>I am a</h1>
                    <Nav>
                        <NavItem>
                            <Link to="/admin" className="me-5" style={{color:"#fff"}}>Vendor</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/user" style={{color:"#fff"}}>Customer</Link>
                        </NavItem>
                    </Nav>
                </div>
            </>
        )
    }
}

export default UserChoosing;