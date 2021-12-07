import './index.css'

import React from 'react';
import ReactDOM from 'react-dom';
import { useAppState } from './state';
import classnames from 'classnames';

function FactionList({ active, factions, passed, strategic, handleAction }) {
    let sortedFactions = factions.concat().sort((a, b) => a.passed = b.passed)

    return (
        <div className="faction-list">
            {sortedFactions.map(faction => {
                return (
                    <FactionCard
                        key={faction.id}
                        faction={faction}
                        active={faction.id === active}
                        passed={passed.has(faction.id)}
                        strategicCompleted={strategic.has(faction.id)}
                        handleAction={handleAction} />
                )
            })}
        </div>
    );
}

function FactionCard({ active, passed, strategicCompleted, faction, handleAction }) {
    return (
        <div className={classnames('faction-card', { active, passed })}>
            <div className="faction-details">
                <div className="faction-header">
                    <div className="player-color" style={{ background: faction.color }}></div>
                    <p className="faction-name">{faction.name}</p>
                </div>
                <p className={classnames("strategy", { used: strategicCompleted })}>{faction.strategy}</p>
            </div>
            {active && <Actions id={faction.id} strategicCompleted={strategicCompleted} handleAction={handleAction} />}
        </div>
    );
}

function Actions({ strategicCompleted, handleAction }) {
    return (
        <div className="actions">
            {!strategicCompleted && <button onClick={() => handleAction('strategic')}>Strategic</button>}
            <button onClick={() => handleAction('tactical')}>Tactical</button>
            {strategicCompleted && <button onClick={() => handleAction('pass')}>Pass</button>}
        </div>
    );
}

function App() {
    let [state, handleAction] = useAppState()

    return (
        <div>
            <h1>Action Phase</h1>
            <h2>Round {state.round} — Turn {state.turn}</h2>
            <FactionList {...state} handleAction={handleAction} />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);