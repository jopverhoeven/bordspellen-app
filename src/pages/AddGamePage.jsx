import { React } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Firebase";
import { IoMdArrowBack } from "react-icons/io";

function AddGamePage() {
    const navigator = useNavigate();
    const [game, setGame] = useState({
        shortName: "",
        name: "",
        scoreType: ""
    });

    function handleGameName(name) {
        setGame({ ...game, name: name });
    }

    function handleGameShortName(shortName) {
        setGame({ ...game, shortName: shortName });
    }

    function handleGameScoreType(scoreType) {
        setGame({ ...game, scoreType: scoreType });
    }

    async function handleNewGame() {
        await addDoc(collection(db, "games"), game);
        navigator("./../../")
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
                    <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <p>Naam</p>
                        <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Naam" onChange={(e) => handleGameName(e.target.value)} />
                    </div>
                    <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <p>Icoon</p>
                        <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Icoon" onChange={(e) => handleGameShortName(e.target.value)} />
                    </div>
                    <div className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                        <p>Type score</p>
                        <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Type score" onChange={(e) => handleGameScoreType(e.target.value)} />
                    </div>
                    <button className="p-4 rounded-3xl bg-gray-600 bg-opacity-30" onClick={handleNewGame}>Toevoegen</button>
                </div>
            </div>
        </div>
    )
}

export default AddGamePage;