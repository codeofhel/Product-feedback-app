import React, { useContext } from "react";
import '../components/CSScomponents/comment.css'
import georgepic from '../assets/user_images/image-george.jpg' //temporario, depois irá buscar dinamicamente a BD
import '../components/SuggestionsComponents/CSS/Comment.css';
import { v4 as uuidv4 } from 'uuid'
import { DataContext } from "../context/Datacontext";

export default ({ dataItem, idBlock, comments, postId }) => {
    const { data, setData } = useContext(DataContext);
    const newId = uuidv4();

    function HandleComment(e) {
        e.preventDefault()
        console.log(idBlock);
        const formData = new FormData(e.currentTarget);

        console.log(comments);
        findObj(comments, idBlock, formData)
        const commentsUpdated = [...comments];
        const containerDetail = document.querySelector('.feedDetailContainer');
        const idSuggestion = containerDetail.getAttribute('idSuggestion');
        
        // fetch(`http://localhost:5000/addcomment/${idSuggestion}`, { method: "POST", body: JSON.stringify(commentsUpdated) })
        //     .then(response => response.json())
        //     .then(data=>console.log(data))
        
        
        data.data.find((val) => {
            if (val._id == postId) {
                val.replies = commentsUpdated;
                return data;
            }
        })
        
        const newData = { ...data };
        
        const updatedPost = data.data.find((elem) => elem._id == postId);
        fetch(`http://localhost:5000/updatesuggestion/${postId}`, { method: "PUT", body: JSON.stringify(updatedPost), headers: {"Content-Type":"application/json"} })
            .then(response => response.json())
            .then(dataInfo => {
                console.log(dataInfo);
            })

        setData(() => newData);
    }

    function findObj(obj, idChecker, formData) {
        if (obj.length > 0)
            obj.forEach(element => {
                for (const prop in element) {
                    if (element['id'] == idChecker) {
                        return element['replies'].push({ id: newId, content: formData.get('comment'), date: '' });
                    } else if (prop == 'replies') {
                        findObj(element['replies'], idChecker, formData)
                    }
                }
            });
    }

    function ShowBodyComment(e) {
        e.currentTarget.closest('.commentBox').querySelector('.commentContainer').classList.toggle('hide');
        e.currentTarget.closest('.commentBox').querySelector('.commentContainer textarea').focus();
    }

    return (
        <div className="commentBox">
            <div className="commentHeader">
                <div className="boxUser">
                    <img src={georgepic} alt="" srcSet="" width='40' />
                    <div>
                        <p className="commentName">James Skinner</p>
                        <p className="text commentAlias">@hummingbird1</p>
                    </div>
                </div>
                <p className="reply" onClick={ShowBodyComment}>Reply</p>
            </div>
            <div className="text commentText">
                <p>{dataItem?.content}</p>
            </div>
            <div className="commentContainer hide">
                <form onSubmit={HandleComment} id="formComment">
                    <textarea name="comment" id="comment" cols="35" rows="4"></textarea>
                    <button type="submit">Post Reply</button>
                </form>
            </div>
        </div>
    )
}