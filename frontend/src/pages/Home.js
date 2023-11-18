import Documents from '../components/Documents.js';
import Header from '../components/Header.js';
import TeamMembers from '../components/TeamMembers.js';
import logo from '../images/logo.png';
import market from '../images/market.png';


export default function Home(){
    return(
        <div>

            <div>
                <img
              src={market}
              
            />
            </div>

            <div>
                Documents
                <Documents/>
            </div>

            <div>
            Team Members

                <TeamMembers/>
            </div>

            <div>
                Footer
            </div>
        </div>
    )
}