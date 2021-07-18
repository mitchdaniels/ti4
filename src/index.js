import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

let strategies = [
    'Leadership',
    'Diplomacy',
    'Politics',
    'Construction',
    'Trade',
    'Warfare',
    'Technology',
    'Imperial']

class Faction {
    constructor(id, name, color, strategy = '', active = false, strategicCompleted = false, passed = false, speaker = false) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.strategy = strategy;
        this.active = active;
        this.strategicCompleted = strategicCompleted;
        this.passed = passed;
        this.speaker = speaker;
    }
}

class FactionList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            factions: [
                new Faction(0, 'Federation of Sol', '#2D9CDB', 'Leadership', true),
                new Faction(1, 'Universities of Jol-Nar', '#BB6BD9', 'Politics'),
                new Faction(2, 'Barony of Letnev', '#000000', 'Trade', false, true, true),
                new Faction(3, 'Emirates of Hacan', '#F2C94C', 'Warfare'),
                new Faction(4, 'Sardakk N\'orr', '#EB5757', 'Diplomacy'),
                new Faction(5, 'Xxcha Kingdom', '#27AE60', 'Imperial')]
        }

        this.handleAction = this.handleAction.bind(this);
        this.strategicAction = this.strategicAction.bind(this);
        this.passAction = this.passAction.bind(this);
        this.nextPlayer = this.nextPlayer.bind(this);
    }

    handleAction(action) {

        let factions = [...this.state.factions];
        let faction = factions.find(faction => faction.active)

        factions.filter(faction => faction.passed == false)
            .find(function(faction, i, arr) {
                if (faction.active) {
                        faction.active = false;
                        console.log(faction.name);
                        // console.log(arr[i+1].active);
                        arr[(i+1)%arr.length].active = true;
                        return true;
                }
                return false;
            });

        switch (action) {
            case 'strategic':
                faction.strategicCompleted = true;
                break;
            case 'tactical':
                break;
            case 'pass':
                faction.passed = true;
                break;
        }

        this.setState({factions});
    }

    strategicAction(id) {
        this.setState(prevState => ({
            factions: prevState.factions.map(
                faction => faction.id === id ? Object.assign(faction, {strategicCompleted: true}) : faction
            )
        }));
    }

    passAction(id) {
        this.setState(prevState => ({
            factions: prevState.factions.map(
                faction => faction.id === id ? Object.assign(faction, {passed: true}) : faction
            )
        }));
    }

    nextPlayer() {
        let factions = [...this.state.factions];

        factions.filter(faction => faction.passed == false)
            .find(function(faction, i, arr) {

                if (faction.active) {
                        faction.active = false;
                        console.log(faction.name);
                        // console.log(arr[i+1].active);
                        arr[(i+1)%arr.length].active = true;
                        return true;
                }
                return false;
            });

        this.setState({factions});
    }

            /* prevState.faction.filter(passed).map(
                deactivate current faction
                if exists, activate next faction
                else, end round
            ) {
            }*/

    render() {
        return (
            <div className="faction-list">
                {this.state.factions
                    .sort((a, b) => a.passed - b.passed)
                    .map((faction) => <FactionCard {...faction} handleAction={this.handleAction}/>)
                }
            </div>
        );
    }
}

class FactionCard extends React.Component {

    render() {
        return (
            <div className={"faction-card " + (this.props.active ? 'active' : (this.props.passed && 'passed'))}>
                <div className="faction-details">
                    <div className="faction-header">
                        <div className="player-color" style={{background: this.props.color}}></div>
                        <p className="faction-name">{this.props.name}</p> 
                    </div>
                    <p className={"strategy " + (this.props.strategicCompleted && 'used')}>{this.props.strategy}</p>
                </div>
                {this.props.active && <Actions id={this.props.id} strategicCompleted={this.props.strategicCompleted} handleAction={this.props.handleAction}/>}
            </div>
        );
    }
}

function Actions({ id, strategicCompleted, handleAction }) {

    return (
        <div className="actions">
            {!strategicCompleted && <button onClick={() => handleAction('strategic')}>Strategic</button>}
            <button onClick={() => handleAction('tactical')}>Tactical</button>
            {strategicCompleted && <button onClick={() => handleAction('pass')}>Pass</button>}
        </div>
    );
}

function App() {
  return (
    <div>
        <h1>Action Phase</h1>
        <h2>Round 1 — Turn 1</h2>
        <FactionList />
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);