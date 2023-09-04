import React, { useContext, useRef, useState } from "react";
import HeaderSuggestion from "../components/SuggestionsComponents/HeaderSuggestion";
import Listitem from "../components/SuggestionsComponents/Listitem";
import Suggestion from "../components/SuggestionsComponents/Suggestion";
import { useLocation } from "react-router-dom";
import Categoriestabs from "../components/RoadmapComponents/Categoriestabs";
import { DataContext } from "../context/Datacontext";
import FeedbackDetail from "../components/FeedbackDetail";


export default () => {
    const location = useLocation();
    const { data, statusProps } = useContext(DataContext);
    const dt = data?.data;
    const dataSelected = useRef('');
    const [showdetail, setShowdetail] = useState(false);


    function selectedPost(value) {
        console.log(value);
        dataSelected.current = value;
        const containerDetail = document.querySelector('.feedDetailContainer');
        //containerDetail.style.display = 'flex';
        setShowdetail(true);
    }

    function hidePopup() {
        setShowdetail(false);
    }



    return (
        <>
            {showdetail ? <FeedbackDetail dataSelected={dataSelected} hidepopup={hidePopup}></FeedbackDetail> : null}
            <div className="containerFeedbacks">
                <HeaderSuggestion roadmap={location.pathname.includes('roadmap') ? true : false}></HeaderSuggestion>
                {location.pathname.includes('roadmap') ? <Categoriestabs></Categoriestabs> : null}
                {location.pathname.includes('roadmap') ?
                    <div className="containerRoadmap">
                        {statusProps.map((status) => {
                            return <div className="postCol">
                                {dt?.map(function (elem) {
                                    return status == elem.updateState ? <Suggestion dataItem={elem} key={elem._id} select={selectedPost}></Suggestion> : null;
                                })}
                            </div>
                        })}
                    </div>
                    :
                    dt?.map(function (val, i) {
                        return <Suggestion dataItem={val} key={val._id} select={selectedPost}></Suggestion>
                    })

                }
            </div>
        </>
    )
}