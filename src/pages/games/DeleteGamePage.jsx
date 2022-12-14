import { React } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase";
import NavigationComponent from "../../components/NavigationComponent";

function DeleteGamePage() {
    const { game } = useOutletContext();

    async function handleDeleteGame() {
        await deleteDoc(doc(db, "games", game.id));
        navigator('/');
    }

    return (
        <>
        <NavigationComponent back="./../" hideAll/>
            <div className="flex flex-col bg-gray-600 bg-opacity-50 text-white rounded-3xl p-4">
                <div className="flex flex-col justify-center items-start space-y-4">
                    <p>Weet je zeker dat je dit spel wilt verwijderen?</p>
                    <div className="flex flex-row justify-center space-x-4 w-full">
                        <button className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center" onClick={handleDeleteGame}>Ja</button>
                        <Link to={"./../"} state={game} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 w-full text-center">Annuleren</Link>
                    </div>
                </div>
            </div>
        </>

    )
}

export default DeleteGamePage;