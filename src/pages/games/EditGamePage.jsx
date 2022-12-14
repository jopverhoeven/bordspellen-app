import { React, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import { Game } from "../../domain/Game";
import { ZodError } from "zod";
import NavigationComponent from "../../components/NavigationComponent";

function EditGamePage() {
    const { gameId } = useParams();
    const navigator = useNavigate();

    const { game } = useOutletContext();

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

    useEffect(() => {
        setName(game.name);
        setShortName(game.shortName);
        setScoreType(game.scoreType);
    }, [])

    async function handleUpdateGame() {
        try {
            const newGame = Game.parse({
                name: name,
                shortName: shortName,
                scoreType: scoreType
            });
            await updateDoc(doc(db, "games", gameId), newGame);
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

    return (
        <>
            <NavigationComponent back="./../" hideAll={true} />
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
        </>

    )
}

export default EditGamePage;