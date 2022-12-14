import { React } from "react";
import { useOutletContext } from "react-router-dom";
import NavigationComponent from "../../../components/NavigationComponent";

function ScorePage() {
    const { game, score } = useOutletContext();

    const participantsHtml = [];
    score.participants.forEach((participant, i) => {
        participantsHtml.push(
            <div className="flex flex-row w-full space-x-4 bg-gray-600 bg-opacity-20 rounded-3xl" key={i}>
                <div className="flex flex-col items-center justify-center text-center text-xl shadow-inner border-r border-r-gray-600 border-opacity-30 rounded-3xl p-4 min-w-[5rem] w-20">
                    {i === 0 ? <p>🏆</p> : <p>{i + 1}</p>}
                </div>
                <div className="flex flex-col justify-center items-start py-4">
                    <p className="text-lg">{participant.name}</p>
                    {!game.scoreType || game.scoreType === "" ? null : <p className="text-sm break-words">{game.scoreType + ": " + participant.score}</p>}
                </div>
            </div>
        )
    })

    return (
        <>
            <NavigationComponent back="./../../" hideAdd />
            <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <p>Gespeeld op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', { hour: "numeric", minute: "numeric", second: undefined })}</p>
                <p className="">Spelers:</p>
                <div className="flex flex-col items-center justify-start space-y-4 mt-2">
                    {participantsHtml}
                </div>
            </div>
        </>

    );
}

export default ScorePage;