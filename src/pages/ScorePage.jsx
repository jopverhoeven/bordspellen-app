import { Link, useLocation } from "react-router-dom";
import { IoMdArrowBack, IoMdCreate } from "react-icons/io";

function ScorePage() {

    const {score, game} = useLocation().state;

    const participantsHtml = [];
    score.participants.forEach((participant, i) => {
        participantsHtml.push(
            <div className="flex flex-row w-full space-x-4 bg-gray-600 bg-opacity-20 rounded-3xl" key={i}>
                <div className="flex flex-col items-center justify-center text-center text-xl bg-gray-600 bg-opacity-40 rounded-3xl p-4 w-20">
                    { i === 0 ? <p>🏆</p> : <p>{i + 1}</p>}
                </div>
                <div className="flex flex-col justify-center items-start py-4">
                    <p className="text-lg">{participant.name}</p>
                    <p className="">{game.scoreType + ": " + participant.score}</p>
                </div>
            </div>
        )
    })

    return(
        <div className="flex flex-col bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl p-4">
            <div className="flex flex-row w-full space-x-4 mb-4">
                <div className="flex flex-row items-center justify-center">
                    <p className="text-3xl p-4 bg-gray-600 bg-opacity-50 rounded-3xl">{game.shortName}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl">{game.name}</p>
                </div>
            </div>
            <div className="flex flex-row items-center w-full mb-4 space-x-4">
                <Link to={"./../../"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdArrowBack size={20}/>
                </Link>
                <Link to={"/edit"} className="bg-gray-600 bg-opacity-50 rounded-3xl p-4 text-center hover:shadow-lg transition-shadow">
                    <IoMdCreate size={20}/>
                </Link>
            </div>
            <div className="bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <p>Gespeeld op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', {hour: "numeric", minute: "numeric", second:undefined})}</p>
                <p className="">Spelers:</p>
                <div className="flex flex-col items-center justify-start space-y-4 mt-2">
                    {participantsHtml}
                </div>
            </div>
        </div>
    );
}

export default ScorePage;