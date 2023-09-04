import React from "react";
import '../SuggestionsComponents/CSS/HeaderSuggestion.css';
import { useNavigate } from "react-router-dom";
import Goback from "../Goback";

export default ({ roadmap }) => {
    
    function ShowNewFeed() {
        document.querySelector('.newFeed').style.display = 'flex';
    }
    
    return (
        <div className="header-feed">
            
                {roadmap ?
                    <Goback page="/"></Goback>
                    :
                    <div className="header-first-col">
                        <div></div>
                        <div className="dt-suggestions">
                            <p>0 Suggestions</p>
                        </div>
                        <div>Sort by :
                            <select>
                                <option value="mostupvotes">Most upvotes</option>
                                <option value="leastupvotes">Least upvotes</option>
                                <option value="mostcomments">Most comments</option>
                                <option value="leastcomments">least comments</option>
                            </select>
                        </div>
                    </div>
                }
            
            <div className="header-second-col">
                <button className="addfeed" onClick={ShowNewFeed}>+ Add Feedback</button>
            </div>
        </div>
    )
}