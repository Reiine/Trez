import React from 'react';

function Footer() {
    return (  
        <div className="footer">
            <div className="newsletter">
                        <div className="ntext">
                            <p className="ntext1">Want To Stay Updated?</p>
                            <p className="ntext2">Sign up for our newsletter!</p>
                        </div>
                        
                        <div className="nletterbox input-group">
                            <input type="email" id="nlettersignup" className="input-group-text  shadow-lg"/>
                            <button className="input-group-append btn btn-dark " id="nbtn">Sign Up!</button>
                        </div>
                        
            </div>
            <div className="end">
                
                <div class="service">
                <p style={{"font-weight" : "bold"}}>Services</p>
                    <ul>
                        <li class="footerlist">Trez Services</li>
                        <li class="footerlist">Collect In-Store</li>
                        <li class="footerlist">Fashion Consultation</li>
                        <li class="footerlist">Collab</li>
                    </ul>

                </div>
            <div class="contact">
                <p style={{"font-weight" : "bold"}}>Contact Us</p>
                <p>Address: Nerul, Navi Mumbai, Maharashtra - 400706</p>
                <p>Phone: +91-9102837465</p>
                <p class="social"> 
                    <a href="#"><img src="instagram.png" alt="" class="sociallogo"/></a>
                    <a href="#"><img src="facebook.png" alt="" class="sociallogo"/></a>
                    <a href="#"><img src="twitter.png" alt="" class="sociallogo"/></a>
                    <a href="#"><img src="snapchat.png" alt="" class="sociallogo"/></a>
                    <a href="#" ><i class="bi bi-facebook sociallogo"></i></a>
                    <a href="#"><i class="bi bi-instagram sociallogo"></i></a>
                    <a href="#"><i class="bi bi-twitter sociallogo"></i></a>
                    <a href="#"><i class="bi bi-youtube sociallogo"></i></a>
                    <a href="#"><i class="bi bi-pinterest sociallogo"></i></a>
                </p>
            </div>
            <div class="shipping">
                <p style={{"font-weight" : "bold"}}>Shipping Locations</p>
                <ul>
                    <li class="footerlist">Maharashtra</li>
                    <li class="footerlist">Delhi</li>
                    <li class="footerlist"> Assam</li>
                    <li class="footerlist">Gujrat</li>
                </ul>
                <ul>
                    <li class="footerlist">Goa</li>
                    <li class="footerlist">Uttarakhand</li>
                    <li class="footerlist">Kerela</li>
                    <li class="footerlist">Karnataka</li>
                </ul>
                <ul>
                    <li class="footerlist">Tamil Nadu</li>
                    <li class="footerlist">Tripura</li>
                    <li class="footerlist">Andra Pradesh</li>
                    <li class="footerlist">Bihar</li>
                </ul>
            
            </div>
            <p class="copyright">  &copy; Copyright - Reiine Iangar 2022</p>

            </div>
        </div>
        
            
    );
}

export default Footer;