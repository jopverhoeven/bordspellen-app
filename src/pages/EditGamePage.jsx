import { React, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import { IoMdArrowBack } from "react-icons/io";
import { Game } from "../domain/Game";
import { ZodError } from "zod";
import ErrorPage from "./ErrorPage";

function EditGamePage() {
    const state = useLocation().state;
    const { gameId } = useParams();
    const navigator = useNavigate();

    const [error, setError] = useState()
    const [game, setGame] = useState(state != null ? state.game : null);
    const [loading, setLoading] = useState(game ? false : true);

    const [name, setName] = useState("");
    const [shortName, setShortName] = useState("");
    const [scoreType, setScoreType] = useState("");
    const [formError, setFormError] = useState([]);

    function handleGameName(name) {
        setName(name);
        setFormError([]);
    }

    function handleGameShortName(shortName) {
        setShortName(shortName);
        setFormError([]);
    }

    function handleGameScoreType(scoreType) {
        setScoreType(scoreType);
        setFormError([]);
    }

    const fetchGame = async () => {
        onSnapshot(doc(db, "games", gameId), (doc) => {
            if (!doc.exists()) {
                setError({ status: "404", statusText: `Spel met id '${gameId}' niet gevonden` });
                return;
            }

            try {
                const game = Game.parse({ ...doc.data(), id: doc.id });
                setGame(game);
                setName(game.name);
                setShortName(game.shortName);
                setScoreType(game.scoreType);

                if (loading) setLoading(false);
            } catch (e) {
                if (e instanceof ZodError) {
                    setError({ status: "500", statusText: e.message })
                }
            }

        });
    }

    useEffect(() => {
        fetchGame();
    }, [])

    async function handleUpdateGame() {
        try {
            const game = Game.parse({
                name: name,
                shortName: shortName,
                scoreType: scoreType
            });

            await updateDoc(doc(db, "games/" + gameId), game);
            navigator("./../")
        } catch (e) {
            if (e instanceof ZodError) {
                const newFormError = [];
                e.errors.map(error => {
                    newFormError.push({
                        name: error.path[0],
                        message: error.message
                    })
                });
                setFormError(newFormError);
            }
        }
    }

    if (error) {
        return <ErrorPage status={error.status} statusText={error.statusText} />
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row items-center mb-4 space-x-4">
                <Link to={"./../"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20} />
                </Link>
            </div>
            <div className="flex flex-col space-y-4 p-4 bg-gray-600 bg-opacity-50 rounded-3xl">
                <p>{game.name} bewerken</p>
                <div className="flex flex-col w-full space-y-4">
                    <div className="flex flex-col w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
                            <p>Naam</p>
                            <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Naam" value={name} onChange={(e) => handleGameName(e.target.value)} />
                        </div>
                        {formError.find(error => error.name === "name") ? <p>⚡{formError.find(error => error.name === "name").message}⚡</p> : null}
                    </div>
                    <div className="flex flex-col w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
                            <p>Icoontje</p>
                            <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Icoontje" value={shortName} onChange={(e) => handleGameShortName(e.target.value)} />
                        </div>
                        {formError.find(error => error.name === "shortName") ? <p>⚡{formError.find(error => error.name === "shortName").message}⚡</p> : null}
                    </div>
                    <div className="flex flex-col w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
                            <p>Type score</p>
                            <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Type score" value={scoreType} onChange={(e) => handleGameScoreType(e.target.value)} />
                        </div>
                    </div>
                    <button className="p-4 rounded-3xl bg-gray-600 bg-opacity-30" onClick={handleUpdateGame}>Bewerken</button>
                </div>
            </div>
        </div>
    )
}

export default EditGamePage;