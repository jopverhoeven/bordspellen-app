import { React } from "react";
import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase";
import NavigationComponent from "../../components/NavigationComponent";


export default function GamePage() {
    const { game } = useOutletContext();
    const [scores, setScores] = useState([]);

    const fetchScores = async () => {
        onSnapshot(collection(db, `games/${game.id}/scores`), (collection) => {
            const scores = collection.docs.map(score => ({
                id: score.id,
                winner: score.data()["winner"],
                participants: score.data()["participants"],
                date: new Date(score.data()["date"].seconds * 1000),
            }));
            setScores(scores.sort(function (a, b) {
                return b.date - a.date;
            }));
        });
    }

    useEffect(() => {
        fetchScores();
    }, [])

    const scoresHtml = [];
    scores.forEach((score, i) => {
        const date = new Date(score.date);
        scoresHtml.push(
            <Link to={`./scores/${score.id}`} state={{ score: score }} className="flex flex-row w-full my-2 space-x-4 bg-gray-600 bg-opacity-20 rounded-3xl hover:shadow-lg transition-shadow" key={i}>
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
        <>
            <NavigationComponent back="./../../" />
            {scores.length === 0 ?
                <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">Nog geen scores gevonden</p>
                :
                <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                    <p className="">Vorige uitslagen:</p>
                    <div className="flex flex-col items-center justify-start mt-2">
                        {scoresHtml}
                    </div>
                </div>}
        </>

    )
}