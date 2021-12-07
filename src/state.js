import update from 'immutability-helper';
import { useReducer } from 'react';
import { Faction } from './model';

const initialState = {
    active: 'blue',
    passed: new Set(),
    strategic: new Set(),
    round: 1,
    turn: 1,
    factions: [
        new Faction('blue', 'Federation of Sol', 'Leadership'),
        new Faction('purple', 'Universities of Jol-Nar', 'Politics'),
        new Faction('black', 'Barony of Letnev', 'Trade'),
        new Faction('yellow', 'Emirates of Hacan', 'Warfare'),
        new Faction('red', 'Sardakk N\'orr', 'Diplomacy'),
        new Faction('green', 'Xxcha Kingdom', 'Imperial')
    ]
}

function nextFaction(state) {
    const { factions, active, passed } = state

    let index = factions.findIndex(f => f.id === active)
    let before = factions.slice(0, index)
    let after = factions.slice(index + 1)

    let nextFaction = after.concat(before)
        .find(faction => passed.has(faction.id) === false)

    return nextFaction ? nextFaction.id : null
}

function advance(state) {
    let next = nextFaction(state)
    let endOfTurn = state.active == 'green'
    let endOfRound = next == null;

    if (next) {
        return update(state, {
            active: {
                $set: nextFaction(state)
            },
            turn: {
                $set: endOfTurn ? state.turn + 1 : state.turn
            }
        })
    } else {
        return { ...initialState, round: state.round + 1 }
    }
}

function reducer(state, action) {
    switch (action) {
        case 'strategic':
            state = update(state, { strategic: { $add: [state.active] } })
            state = advance(state)

            return state
        case 'tactical':
            return advance(state);
        case 'pass':
            state = update(state, { passed: { $add: [state.active] } })
            state = advance(state)

            return state;
        default:
            throw new Error(`Unexpected action: ${action}`)
    }
}

export function useAppState() {
    return useReducer(reducer, initialState)
}
