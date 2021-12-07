const strategies = [
    'Leadership',
    'Diplomacy',
    'Politics',
    'Construction',
    'Trade',
    'Warfare',
    'Technology',
    'Imperial'
]

const colors = {
    'blue': '#2D9CDB',
    'purple': '#BB6BD9',
    'black': '#000000',
    'yellow': '#F2C94C',
    'red': '#EB5757',
    'green': '#27AE60'
}

export class Faction {
    constructor(id, name, color, strategy) {
        this.id = id;
        this.name = name;
        this.color = colors[id];
        this.strategy = strategy;
    }
}