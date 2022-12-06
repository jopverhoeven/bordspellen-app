import { React } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdAdd, IoMdArrowBack, IoMdCreate, IoMdTrash } from "react-icons/io";
import ErrorPage from "./ErrorPage";


export default function GamePage() {
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [scores, setScores] = useState([]);
    const [game, setGame] = useState(useLocation().state);

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
            if (loading) setLoading(false);
            fetchScores();
        });
    }

    const fetchScores = async () => {
        onSnapshot(collection(db, `games/${gameId}/scores`), (collection) => {
            const scores = collection.docs.map(score => ({
                id: score.id,
                winner: score.data()["winner"],
                participants: score.data()["participants"],
                date: new Date(score.data()["date"].seconds * 1000),
            }));
            setScores(scores.sort(function (a, b) {
                return b.date - a.date;
            }));
            if (loading) setLoading(false);
        });
    }

    useEffect(() => {
        fetchGame();
    }, [])

    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText}/>
    }

    if (loading && game) {
        return (
            <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
                <div className="flex flex-row w-full space-x-4  mb-4">
                    <div className="flex flex-row items-center justify-center">
                        <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-xl">{game.name}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mb-4 space-x-4">
                    <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdArrowBack size={20} />
                    </Link>
                    <Link to={"./edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdCreate size={20} />
                    </Link>
                    <Link to={"./add"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdAdd size={20} />
                    </Link>
                    <Link to={"./delete"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdTrash size={20} />
                    </Link>
                </div>
                <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </p>
            </div>
        )
    }

    if (loading && game == null) {
        return (
            <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
                <div className="flex flex-row w-full space-x-4  mb-4">
                    <div className="flex flex-row items-center justify-center">
                        <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </div>
                </div>
                <div className="flex flex-row items-center mb-4 space-x-4">
                    <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdArrowBack size={20} />
                    </Link>
                    <Link to={"./edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdCreate size={20} />
                    </Link>
                    <Link to={"./add"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdAdd size={20} />
                    </Link>
                    <Link to={"./delete"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <IoMdTrash size={20} />
                    </Link>
                </div>
                <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </p>
            </div>
        )
    }


    const scoresHtml = [];
    scores.forEach((score, i) => {
        const date = new Date(score.date);
        scoresHtml.push(
            <Link to={`./scores/${score.id}`} state={{ score: score, game: game }} className="flex flex-row w-full my-2 space-x-4 bg-gray-600 bg-opacity-20 rounded-3xl hover:shadow-lg transition-shadow" key={i}>
                <div className="flex flex-col items-center justify-center text-center text-xl shadow-inner border-r border-r-gray-600 border-opacity-30 rounded-3xl py-4 w-20">
                    <p>🏆</p>
                    <p className="text-lg">{score.winner}</p>
                </div>
                <div className="flex flex-col justify-center items-start ">
                    <p className="">{score.participants.length} spelers</p>
                    <p className="text-sm text-gray-300">{date.toLocaleDateString('nl')} {date.toLocaleTimeString('nl', { hour: "numeric", minute: "numeric", second: undefined })}</p>
                    <p className="text-sm text-left"></p>
                </div>
            </Link>
        )
    })


    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full space-x-4  mb-4">
                <div className="flex flex-row items-center justify-center">
                    <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl">{game.name}</p>
                </div>
            </div>
            <div className="flex flex-row items-center mb-4 space-x-4">
                <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20} />
                </Link>
                <Link to={"./edit"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdCreate size={20} />
                </Link>
                <Link to={"./add"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdAdd size={20} />
                </Link>
                <Link to={"./delete"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdTrash size={20} />
                </Link>
            </div>
            {scores.length === 0 ?
                <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">Nog geen scores gevonden</p>
                :
                <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                    <p className="">Vorige uitslagen:</p>
                    <div className="flex flex-col items-center justify-start mt-2">
                        {scoresHtml}
                    </div>
                </div>
            }
        </div>
    )
}