import { React } from "react";
import { useOutletContext } from "react-router-dom";
import NavigationComponent from "../../../components/NavigationComponent";
import { motion } from "framer-motion";

function ScorePage() {
    const { game, score } = useOutletContext();

    const participantsHtml = [];
    score.participants.forEach((participant, i) => {
        participantsHtml.push(
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 + ((i + 1) * 0.2), duration: 0.5 }}
                className="flex flex-row w-full space-x-4 bg-gray-600 bg-opacity-20 rounded-3xl"
                key={i}
            >
                <div className="flex flex-col items-center justify-center text-center text-xl shadow-inner border-r border-r-gray-600 border-opacity-30 rounded-3xl p-4 min-w-[5rem] w-20">
                    {i === 0 ? <p>🏆</p> : <p>{i + 1}</p>}
                </div>
                <div className="flex flex-col justify-center items-start py-4">
                    <p className="text-lg">{participant.name}</p>
                    {!game.scoreType || game.scoreType === "" ? null : <p className="text-sm break-words">{game.scoreType + ": " + participant.score}</p>}
                </div>
            </motion.div>
        )
    })

    return (
        <>
            <NavigationComponent back="./../../" hideAdd />
            <div className="flex flex-col space-y-4 bg-gray-600 bg-opacity-50 rounded-3xl p-4">
                <div>
                    <p className="text-lg">Uitslag</p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="text-sm text-gray-300"
                    >
                        Gespeeld op {score.date.toLocaleDateString('nl')} {score.date.toLocaleTimeString('nl', { hour: "numeric", minute: "numeric", second: undefined })}
                    </motion.p>
                </div>
                <p className="">Spelers:</p>
                <div className="flex flex-col items-center justify-start space-y-4 mt-2">
                    {participantsHtml}
                </div>
            </div>
        </>

    );
}

export default ScorePage;