import { React } from "react";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../Firebase";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import NavigationComponent from "../../../components/NavigationComponent";

function AddScorePage() {
    const navigator = useNavigate();
    const { game } = useOutletContext();
    const [score, setScore] = useState({
        winner: "",
        participants: [{
            name: "",
            score: ""
        }],
        date: new Date()
    });

    function handleParticipantName(participantName, key) {
        const participants = score.participants;
        participants[key].name = participantName;

        setScore({ ...score, participants: participants });
    }

    function handleParticipantScore(participantScore, key) {
        const participants = score.participants;
        participants[key].score = participantScore;

        setScore({ ...score, participants: participants });
    }

    function handleAddParticipant() {
        setScore(prevState => ({
            ...score, participants: prevState.participants.concat({
                name: "",
                score: ""
            })
        }))
    }

    function handleRemoveParticipant() {
        const newArray = score.participants;
        newArray.pop();
        setScore({ ...score, participants: newArray });
    }

    async function handleNewScore() {
        const defScore = score;
        defScore.winner = score.participants[0].name;
        defScore.date = new Date();
        await addDoc(collection(db, "games/" + game.id + "/scores"), defScore);
        navigator("./../")
    }

    return (
        <>
            <NavigationComponent back="./../" hideAll={true} />
            <div className="flex flex-col space-y-4 w-full bg-gray-600 bg-opacity-50 text-white rounded-3xl p-4">
                <p className="text-lg text-center">Nieuwe uitslag toevoegen</p>
                <div className="flex flex-row items-center space-x-4 bg-gray-600 bg-opacity-30 rounded-3xl p-4">
                    <p>Deelnemers ({score.participants.length})</p>
                    <button className="p-2 bg-gray-600 bg-opacity-30 rounded-3xl" onClick={handleAddParticipant}><IoMdAdd /></button>
                    {score.participants.length > 1 ? <button className="p-2 bg-gray-600 bg-opacity-30 rounded-3xl" onClick={handleRemoveParticipant}><IoMdRemove /></button> : null}
                </div>
                <div className="space-y-4">
                    {score.participants.map((participant, i) => {
                        return (
                            <div key={i} className="flex flex-col md:items-center space-y-2 md:space-y-0 md:flex-row md:space-x-2 w-full p-4 rounded-3xl bg-gray-600 bg-opacity-30">
                                {i == 0 ? <p className="p-2 md:p-4 w-[56px] text-left md:text-center">🏆</p> : <p className="p-2 md:p-4 w-[56px] text-left md:text-center">{i + 1}</p>}
                                <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder="Naam" onChange={(e) => handleParticipantName(e.target.value, i)} />
                                {!game.scoreType || game.scoreType === "" ? null : <input className="rounded-3xl p-2 shadow-inner bg-gray-600 bg-opacity-0 border border-gray-600" placeholder={game.scoreType} onChange={(e) => handleParticipantScore(e.target.value, i)} />}
                            </div>
                        )
                    })}
                </div>
                <button className="p-4 rounded-3xl bg-gray-600 bg-opacity-30" onClick={handleNewScore}>Toevoegen</button>
            </div>
        </>

    )
}

export default AddScorePage;