import linkedinImg from "../../assets/images/linkedin.png";
import githubImg from "../../assets/images/github.png";
import "./Footer.css";


const Footer = () => {
    return (
        <div className="footer">
            <div className="personal-links"> 
                <div className="contributor-name">David Pollack</div>
                <div className="contributor-links">
                    <a href="https://www.linkedin.com/in/david-pollack-22b324292/" target="_blank"><img src={linkedinImg} /></a>
                    <a href="https://github.com/DavidPollack43" target="_blank"><img src={githubImg} /></a>
                </div>
            </div>

            <div className="personal-links"> 
                <div className="contributor-name">Eric Mai</div>
                <div className="contributor-links">
                    <a href="https://www.linkedin.com/in/eric-061992/" target="_blank"><img src={linkedinImg} /></a>
                    <a href="https://github.com/Eric-Mai-25" target="_blank"><img src={githubImg} /></a>
                </div>
            </div>

            <div className="personal-links"> 
                <div className="contributor-name">Swathi Balasubramanyam</div>
                <div className="contributor-links">
                    <a href="https://www.linkedin.com/in/swathi-balasubramanyam-4a4280124/" target="_blank"><img src={linkedinImg} /></a>
                    <a href="https://github.com/SwathiBalasubramanyam" target="_blank"><img src={githubImg} /></a>
                </div>
            </div>
        </div>
    )
}

export default Footer;