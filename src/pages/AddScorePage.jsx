import { React } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { addDoc, collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdAdd, IoMdArrowBack, IoMdRemove } from "react-icons/io";
import ErrorPage from "./ErrorPage";

function AddScorePage() {
    const navigator = useNavigate();
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [game, setGame] = useState(useLocation().state);
    const [score, setScore] = useState({
        winner: "",
        participants: [{
            name: "",
            score: ""
        }],
        date: new Date()
    });

    const fetchGame = async () => {
        onSnapshot(doc(db, "games", gameId), (doc) => {
            if (!doc.exists()) {
                setError({ status: "404", statusText: `Spel met id '${gameId}' niet gevonden` });
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
        });
    }

    useEffect(() => {
        fetchGame();
    }, [])

    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText} />
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
                    <Link to={"./../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    </Link>
                </div>
            </div>
        )
    }

    function handleParticipantName(participantName, key) {
        const participants = score.participants;
        participants[key].name = participantName;

        setScore({ ...score, participants: participants });
    }

    function handleParticipantScore(participantScore, key) {
        const participants = score.participants;
        participants[key].score = participantScore;

        setScore({ ...score, participants: participants });
    }

    function handleAddParticipant() {
        setScore(prevState => ({
            ...score, participants: prevState.participants.concat({
                name: "",
                score: ""
            })
        }))
    }

    function handleRemoveParticipant() {
        const newArray = score.participants;
        newArray.pop();
        setScore({ ...score, participants: newArray });
    }

    async function handleNewScore() {
        const defScore = score;
        defScore.winner = score.participants[0].name;
        defScore.date = new Date();
        await addDoc(collection(db, "games/" + game.id + "/scores"), defScore);
        navigator("./../")
    }

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
                <Link to={"./../"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20} />
                </Link>
            </div>
            <div className="flex flex-col p-4 bg-gray-600 bg-opacity-50 rounded-3xl">
                <div className="flex flex-col w-full space-y-4">
                    <div className="flex flex-row items-center space-x-4">
                        <p>Deelnemers ({score.participants.length})</p>
                        <button className="p-2 bg-gray-600 bg-opacity-30 rounded-3xl" onClick={handleAddParticipant}><IoMdAdd /></button>
                        {score.participants.length > 1 ? <button className="p-2 bg-gray-600 bg-opacity-30 rounded-3xl" onClick={handleRemoveParticipant}><IoMdRemove /></button> : null}
                    </div>
                    <div className="space-y-4">
                        {score.participants.map((participant, i) => {
                            return (
                                <div key={i} className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                                    {i == 0 ? <p className="p-2 md:p-4 w-[56px] text-left md:text-center">🏆</p> : <p className="p-2 md:p-4 w-[56px] text-left md:text-center">{i + 1}</p>}
                                    <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Naam" onChange={(e) => handleParticipantName(e.target.value, i)} />
                                    {!game.scoreType || game.scoreType === "" ? null : <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder={game.scoreType} onChange={(e) => handleParticipantScore(e.target.value, i)} />}
                                </div>
                            )
                        })}
                    </div>
                    <button className="p-4 rounded-3xl bg-gray-600 bg-opacity-30" onClick={handleNewScore}>Toevoegen</button>
                </div>
            </div>
        </div>
    )
}

export default AddScorePage;