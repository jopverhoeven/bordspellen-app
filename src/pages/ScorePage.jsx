import { React } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { IoMdArrowBack, IoMdCreate, IoMdTrash } from "react-icons/io";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import ErrorPage from "./ErrorPage";

function ScorePage() {
    const state = useLocation().state;
    const {gameId, scoreId} = useParams();
    const [game, setGame] = useState(state != null ? state.game : null);
    const [score, setScore] = useState(state != null ? state.score : null);
    const [loading, setLoading] = useState(game && score ? false : true);
    const [error, setError] = useState();

    const fetchGame = async () => {
        onSnapshot(doc(db, "games", gameId), (doc) => {
            if (!doc.exists()) {
                setError({status: "404", statusText: `Spel met id '${gameId}' niet gevonden`});
                return;
            }
            const data = doc.data();
            setGame({
                id: doc.id,
                name: data["name"],
                shortName: data["shortName"],
                scoreType: data["scoreType"]
            })
            fetchScore(doc.id);
        });
    }

    const fetchScore = async (docId) => {
        onSnapshot(doc(db, "games/"+docId+"/scores", scoreId), (doc) => {
            if (!doc.exists()) {
                setError(true);
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
        fetchGame();
    }, [])

    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText}/>
    }

    if (loading) {
        return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full space-x-4 mb-4">
                <div className="flex flex-row items-center justify-center">
                    <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </p>
                </div>
            </div>
            <div className="flex flex-row items-center w-full mb-4 space-x-4">
                <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </Link>
                <Link to={"./edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </Link>
                <Link to={"./delete"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <AiOutlineLoading3Quarters size={20}/>
                </Link>
            </div>
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
                    { i === 0 ? <p>🏆</p> : <p>{i + 1}</p>}
                </div>
                <div className="flex flex-col justify-center items-start py-4">
                    <p className="text-lg">{participant.name}</p>
                    {!game.scoreType || game.scoreType === "" ? null :<p className="text-sm break-words">{game.scoreType + ": " + participant.score}</p>}
                </div>
            </div>
        )
    })

    return(
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full space-x-4 mb-4">
                <div className="flex flex-row items-center justify-center">
                    <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl">{game.name}</p>
                </div>
            </div>
            <div className="flex flex-row items-center w-full mb-4 space-x-4">
                <Link to={"./../../"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20}/>
                </Link>
                <Link to={"./edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdCreate size={20}/>
                </Link>
                <Link to={"./delete"} state={{game: game, score: score}} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdTrash size={20} />
                </Link>
            </div>
            <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <p>Gespeeld op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', {hour: "numeric", minute: "numeric", second:undefined})}</p>
                <p className="">Spelers:</p>
                <div className="flex flex-col items-center justify-start space-y-4 mt-2">
                    {participantsHtml}
                </div>
            </div>
        </div>
    );
}

export default ScorePage;