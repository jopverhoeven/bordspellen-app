import { React } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ErrorPage from "../pages/ErrorPage";
import NavigationComponent from "../components/NavigationComponent";


function ScoreLayout() {
    const { gameId, scoreId } = useParams();
    const [score, setScore] = useState();
    const [loading, setLoading] = useState(score ? false : true);
    const [error, setError] = useState();
    const { game } = useOutletContext();

    const fetchScore = async () => {
        onSnapshot(doc(db, "games/" + gameId + "/scores", scoreId), (doc) => {
            if (!doc.exists()) {
                setError({ status: "404", statusText: "Scores voor spel met id " + gameId + " niet gevonden." });
                return;
            }
            const data = doc.data();
            setScore({
                id: doc.id,
                winner: data["winner"],
                participants: data["participants"],
                date: new Date(data["date"].seconds * 1000),
            })
            if (loading) setLoading(false);
        });
    }

    useEffect(() => {
        fetchScore();
    }, [])

    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText} />
    }

    if (loading) {
        return (
            <>
                <NavigationComponent loading />
                <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 animate-pulse"></div>
            </>
        );
    }

    return (
        <>
            <Outlet context={{ game, score }} />
        </>
    );
}

export default ScoreLayout;