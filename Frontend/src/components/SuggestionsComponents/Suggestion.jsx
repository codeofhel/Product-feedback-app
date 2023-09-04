import React, { useContext, useEffect, useRef, useState } from "react";
import comment from '../../assets/icon-comments.svg'
import "./CSS/Suggestion.css";
import { useLocation } from "react-router-dom";
import '../../pages/cssPages/Roadmap.css'
import FeedbackDetail from "../FeedbackDetail";
import { DataContext } from "../../context/Datacontext";

export default ({ dataItem, select }) => {
    const { data, setData, userId } = useContext(DataContext);
    const location = useLocation();
    const voted = useRef();
    const { _id, title, category, content, updateState, upvotes, replies } = dataItem || {}; // nao podemos utilizar optional chaining em desconstrucao por isso podemos validar com um objecto vazio
    // const { data } = useContext(DataContext);


    function ShowFeed() {

        select({ _id, title, category, content, updateState, upvotes, replies })

        //setComments(replies);
        //const containerDetail = document.querySelector('.feedDetailContainer');
        // containerDetail.querySelector('.titleDetail').textContent = title;
        // containerDetail.querySelector('.contentDetail').textContent = content;
        // containerDetail.querySelector('.feedCategory').textContent = category;
        // containerDetail.querySelector('.upvotes').textContent = upvotes;
        // containerDetail.setAttribute('idSuggestion', _id);

        // containerDetail.style.display = 'flex';

        const containerEdit = document.querySelector('.editFeedback');
        containerEdit.querySelector('#feedTtitle').value = title;
        const options = Array.from(containerEdit.querySelector('#category').options);



        for (const [index, option] of options.entries()) {
            if (option.value == category)
                containerEdit.querySelector('#category').selectedIndex = index;
        }

        const optionsStatus = Array.from(containerEdit.querySelector('#status').options)

        for (const [index, optionStatus] of optionsStatus.entries()) {
            if (optionStatus.value == updateState)
                containerEdit.querySelector('#status').selectedIndex = index;
        }

        containerEdit.querySelector('#feedDetail').value = content;
        containerEdit.setAttribute('idSuggestion', _id);


    }

    // useEffect(() => {
    //     const itemFeed = document.querySelector('.itemFeed')
    //     if (location.pathname.includes('roadmap'))
    //         itemFeed.setAttribute('data-status', updateState);//props.status

    // }, [])

    function HandleVote(e) {
        if (voted.current.dataset('voted')) {
            upvotes.splice(upvotes.indexOf(userId), 1);
            voted.current.dataset('voted', false);
        } else {
            upvotes.push(userId);
            voted.current.dataset('voted', true);
        }
        data.data.find((val) => {
            if (val._id == _id) {
                val.upvotes = upvotes;
                return data;
            }
        })

        const newData = { ...data };
        const updatedPost = data.data.find((elem) => elem._id == _id);
        fetch(`http://localhost:5000/updatesuggestion/${_id}`, { method: "PUT", body: JSON.stringify(updatedPost), headers: { "Content-Type": "application/json" } })
            .then(response => response.json())
            .then(dataInfo => {
                console.log(dataInfo);
            })

        setData(() => newData);
    }


    return (
        <>

            <div className="boxFeedback itemFeed" data-roadmap={location.pathname.includes('roadmap') ? true : false} onClick={ShowFeed} data-status={location.pathname.includes('roadmap') ? updateState : null}>
                {location.pathname.includes('roadmap') ?
                    <>
                        <p>{updateState}</p>
                    </>
                    : null}

                <h3 className="titleDetail">{title}</h3>
                <p className="contentDetail">{content}</p>
                <div className="boxtag feedCategory">{category}</div>
                <div className="extradata">
                    <div className="boxtag upvotes" data-voted={upvotes?.includes('asd') ? true : false} onClick={HandleVote} ref={voted}><span></span>{upvotes?.length}</div>
                    <div className="commentsAmount">
                        <img src={comment} alt="comments" width='18' />
                        <p>2</p>
                    </div>
                </div>
            </div>
        </>
    )
}