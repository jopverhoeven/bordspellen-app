import { React } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { IoMdArrowBack } from "react-icons/io";
import { Game } from "../domain/Game";
import { ZodError } from "zod";

function AddGamePage() {
    const navigator = useNavigate();
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

    async function handleNewGame() {
        try {
            const game = Game.parse({
                name: name,
                shortName: shortName,
                scoreType: scoreType
            });

            await addDoc(collection(db, "games"), game);
            navigator("./../../")
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
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row items-center mb-4 space-x-4">
                <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20} />
                </Link>
            </div>
            <div className="flex flex-col space-y-4 p-4 bg-gray-600 bg-opacity-50 rounded-3xl">
                <p>Nieuw spel toevoegen</p>
                <div className="flex flex-col w-full space-y-4">
                    <div className="flex flex-col w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
                            <p>Naam</p>
                            <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Naam" onChange={(e) => handleGameName(e.target.value)} />
                        </div>
                        {formError.find(error => error.name === "name") ? <p>⚡{formError.find(error => error.name === "name").message}⚡</p> : null}
                    </div>
                    <div className="flex flex-col w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
                            <p>Icoontje</p>
                            <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Icoontje" onChange={(e) => handleGameShortName(e.target.value)} />
                        </div>
                        {formError.find(error => error.name === "shortName") ? <p>⚡{formError.find(error => error.name === "shortName").message}⚡</p> : null}
                    </div>
                    <div className="flex flex-col w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 ">
                            <p>Type score</p>
                            <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Type score" onChange={(e) => handleGameScoreType(e.target.value)} />
                        </div>
                    </div>
                    <button className="p-4 rounded-3xl bg-gray-600 bg-opacity-30" onClick={handleNewGame}>Toevoegen</button>
                </div>
            </div>
        </div>
    )
}

export default AddGamePage;