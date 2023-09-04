import React, { useContext } from "react";
import '../pages/cssPages/Home.css';
import Header from "../layout/Header";
import Container from "../layout/Container";
import Widgetcategories from "../components/Widgetcategories";
import Widgetroadmap from "../components/Widgetroadmap";
import FeedbackNew from "../components/FeedbackNew";
import FeedbackDetail from "../components/FeedbackDetail";
import FeedbackEdit from "../components/FeedbackEdit";
import { DataContext } from "../context/Datacontext";

export default () => {
    const { configs, setConfigs } = useContext(DataContext);


    return (
        <>
            
            <FeedbackNew></FeedbackNew>
            {/* <FeedbackDetail></FeedbackDetail> */}
            <FeedbackEdit></FeedbackEdit>
            <div className="mainContainer">

                <header>
                    <Header></Header>
                    <div className="dt_widgets">
                        <Widgetcategories configs={{ configs, setConfigs }}></Widgetcategories>
                        <Widgetroadmap></Widgetroadmap>
                    </div>
                </header>
                <Container></Container>
            </div>
        </>
    )
}