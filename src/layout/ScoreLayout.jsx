import { React } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import ErrorPage from "../pages/ErrorPage";

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
            <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
                <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            </div>
        );
    }

    const participantsHtml = [];
    score.participants.forEach((participant, i) => {
        participantsHtml.push(
            <div className="flex flex-row w-full space-x-4 bg-gray-600 bg-opacity-20 rounded-3xl" key={i}>
                <div className="flex flex-col items-center justify-center text-center text-xl shadow-inner border-r border-r-gray-600 border-opacity-30 rounded-3xl p-4 min-w-[5rem] w-20">
                    {i === 0 ? <p>🏆</p> : <p>{i + 1}</p>}
                </div>
                <div className="flex flex-col justify-center items-start py-4">
                    <p className="text-lg">{participant.name}</p>
                    {!game.scoreType || game.scoreType === "" ? null : <p className="text-sm break-words">{game.scoreType + ": " + participant.score}</p>}
                </div>
            </div>
        )
    })

    return (
        <>
            <Outlet context={{ game, score }} />
        </>

    );
}

export default ScoreLayout;