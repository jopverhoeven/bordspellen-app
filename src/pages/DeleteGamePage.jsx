import { React } from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { IoMdArrowBack } from "react-icons/io";
import ErrorPage from "./ErrorPage";

function DeleteGamePage() {
    const navigator = useNavigate();
    const [game, setGame] = useState(useLocation().state);
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

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
        });
    }

    useEffect(() => {
        fetchGame();
    }, [])


    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText}/>
    }

    async function handleDeleteGame() {
        await deleteDoc(doc(db, "games", game.id));
        navigator('/');
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
            <div className="flex flex-col justify-center items-start space-y-4">
                <p>Weet je zeker dat je dit spel wilt verwijderen?</p>
                <div className="flex flex-row justify-center space-x-4 w-full">
                    <button className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center" onClick={handleDeleteGame}>Ja</button>
                    <Link to={"./../"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">Annuleren</Link>
                </div>
            </div>
        </div>
    )
}

export default DeleteGamePage;