import { React } from "react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import ErrorPage from "../pages/ErrorPage";
import NavigationComponent from "../components/NavigationComponent";


export default function GameLayout() {
    const { gameId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [game, setGame] = useState(useLocation().state);

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

    if (loading) {
        return (
            <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
                <div className="flex flex-row w-full space-x-4  mb-4">
                    <div className="flex flex-row items-center justify-center">
                        <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">
                            
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                    </div>
                </div>
                <NavigationComponent loading />

                <p className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                </p>
            </div>
        )
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
            <Outlet context={{ game }} />
        </div>
    )
}