import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";

function ScorePage() {

    const {score, game} = useLocation().state;

    const participantsHtml = [];
    score.participants.forEach((participant, i) => {
        participantsHtml.push(
            <Link to={`./scores/${score.id}`} state={{score: score, game: game}} className="flex flex-row w-full py-2 space-x-2" key={i}>
                <div className="flex flex-col text-center text-xl bg-gray-600 bg-opacity-40 rounded-3xl p-4 w-20">
                    { i === 0 ? <p>🏆</p> : <p>{i + 1}</p>}
                </div>
                <div className="flex flex-col justify-center">
                    <p className="text-lg">{participant.name}</p>
                    <p className="">{game.scoreType + ": " + participant.score}</p>
                </div>
            </Link>
        )
    })

    return(
        <div>
            <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full mb-4 space-x-4">
                <div className="flex flex-row items-center">
                    <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                </div>
                <div className="flex flex-col justify-start">
                    <p className="text-xl">{game.name}</p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center w-full mb-4 space-x-4">
                <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">
                    Terug
                </Link>
                <Link to={"/edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">
                    Bewerken
                </Link>
            </div>
            <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <p>Gespeeld op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', {hour: "numeric", minute: "numeric", second:undefined})}</p>
                <p className="">Spelers:</p>
                <div className="flex flex-col items-center justify-start">
                    {participantsHtml}
                </div>
            </div>
        </div>
        </div>
    );
}

export default ScorePage;