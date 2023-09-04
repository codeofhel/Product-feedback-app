import React, { useContext } from "react";
import { styled } from "styled-components";
import Suggestion from "./SuggestionsComponents/Suggestion";
import Comment from "./Comment";
import Goback from "./Goback";
import './CSScomponents/detailFeed.css'
import { v4 as uuidv4 } from 'uuid'
import { DataContext } from "../context/Datacontext";


export default ({ dataSelected, hidepopup }) => {
    const { data, setData } = useContext(DataContext);
    
    let dataCurrent = dataSelected.current;
    const comments = data.data.find(val => val._id == dataCurrent._id).replies;
    
    const ContainerFeedComments = styled.div`
        position: fixed;
        height: 100%;
        width: 100vw;
        background-color: var(--clr-bg);
        z-index: 10;
        overflow: scroll;
        flex-direction: column;
        align-items: center;
        display: flex;
        top: 0;
        left: 0;
    `
    function ShowEdit() {
        document.querySelector('.editFeedback').style.display = 'flex';

    }

    function PostComment() {
        const newId = uuidv4();

    }

    function loopComments(comments, nameClass) {
        return comments?.map((val) => {
            return <div className={nameClass}>
                {<Comment dataItem={val} idBlock={val.id} comments={comments} postId={dataCurrent._id}></Comment>}
                {loopComments(val.replies, "childrenReply")}
            </div>
        })
    }

    function addComment(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const newObj = {
            id: uuidv4(),
            user: {},
            data: new Date(),
            content: formData.get('commentMain'),
            replies: []
        }

        //const updatedComment = [...comments, newObj];
        //setComments(updatedComment);
        console.log(dataCurrent._id)
        data.data.find((val) => {
            if (val._id == dataCurrent._id){
                val.replies.push(newObj)
                dataCurrent = val;
                return data;
            }
        })
        
        // currentObj.replies.push(newObj);
        const newData = { ...data };
        console.log(newData)

        
        
        const updatedPost = data.data.find((elem) => elem._id == dataCurrent._id);
        console.log(updatedPost);
        fetch(`http://localhost:5000/updatesuggestion/${dataCurrent._id}`, { method: "PUT", body: JSON.stringify(updatedPost), headers: {"Content-Type":"application/json"} })
            .then(response => response.json())
            .then(dataInfo => {
                console.log(dataInfo);
            })
        
        setData(() => newData);
    }

    return (
        <ContainerFeedComments className="feedDetailContainer">
            <div className="frameDetail">
                <div className="containerBtn">
                    <Goback popup='feedDetailContainer' hide={hidepopup}></Goback>
                    <button className="btn editFeed" onClick={ShowEdit}>Edit Feedback</button>
                </div>
                <Suggestion dataItem={dataCurrent}></Suggestion>
                <div className="boxFeedback comments">
                    {/* Loop aqui para apresentar os comments */}

                    {loopComments(comments, "mainComment")}
                </div>
                <div className="boxFeedback addComment">
                    <h3>Add Comment</h3>
                    <form id="formAdd" onSubmit={addComment}>
                        <textarea name="commentMain" id="" cols="30" rows="10" placeholder="Type your comment here" className="bgInput"></textarea>
                        <div className="containerSubmit">
                            <p className="charsLeft">250 Characters left</p>
                            <button className="btn postComment" type="submit">Post Comment</button>
                        </div>
                    </form>
                </div>
            </div>
        </ContainerFeedComments>
    )
}