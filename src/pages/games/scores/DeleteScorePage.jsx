import { React } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase";
import NavigationComponent from "../../../components/NavigationComponent";

function DeleteScorePage() {
    const navigator = useNavigate();
    const { game, score } = useOutletContext();

    async function handleDeleteScore() {
        await deleteDoc(doc(db, "games/" + game.id + "/scores", score.id));
        navigator('./../../../', { state: game });
    }

    return (
        <>
            <NavigationComponent back="./../" hideAll/>
            <div className="flex flex-col bg-gray-600 bg-opacity-50 text-white rounded-3xl p-4">
                <div className="flex flex-col justify-center items-start space-y-4">
                    <p>Weet je zeker dat de score van {score.winner}, gezet op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', { hour: "numeric", minute: "numeric", second: undefined })} wilt verwijderen?</p>
                    <div className="flex flex-row justify-center space-x-4 w-full">
                        <button className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center" onClick={handleDeleteScore}>Ja</button>
                        <Link to={"./../"} state={{ game: game, score: score }} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">Annuleren</Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default DeleteScorePage;