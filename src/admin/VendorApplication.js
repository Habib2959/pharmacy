import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const VendorApplication = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_7l6vo5r', 'template_407cl5e', form.current, 'user_Taai06bivNjawxZ7qVL3v')
            .then((result) => {
                alert("Thank you for applying as a vendor. We will contact you soon.")
            }, (error) => {
                alert("Your application failed. Please try again.")
            });
    };

    return (
        <div style={{background: "rgb(246 251 216 / 8%)" }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1 className="my-5">Vendor Application Form</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <form ref={form} onSubmit={sendEmail}>
                            <label>Enter Your Name</label>
                            <br />
                            <input type="text" name="name" id="name" className="form-control" required />
                            <br />
                            <label className="mt-3">Enter Your Email</label>
                            <br />
                            <input type="email" name="email" id="email" className="form-control" required />
                            <br />
                            <label className="mt-3">Enter your contact number</label>
                            <br />
                            <input type="tel" name="contact" id="contact" className="form-control" required />
                            <br />
                            <label className="mt-3">Enter your address</label>
                            <br />
                            <textarea name="address" id="address" className="form-control" required />
                            <br />
                            <button type="submit" value="Send" className="btn submit-btn" >Apply</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorApplication;