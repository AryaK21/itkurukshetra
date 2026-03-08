export type SportData = {
    id: string;
    name: string;
    category: "Team" | "Individual";
    iconName: string;
    description: string;
    accentClass: string;
    players?: string[];
};

export const SPORTS_DATA: SportData[] = [
    {
        id: "football",
        name: "Football",
        category: "Team",
        iconName: "Goal",
        description: "11v11 action on the main turf. Bring your best boots.",
        accentClass: "from-green-500 to-emerald-600",
    },
    {
        id: "cricket",
        name: "Cricket",
        category: "Team",
        iconName: "Target",
        description: "The classic bat and ball showdown.",
        accentClass: "from-blue-500 to-indigo-600",
    },
    {
        id: "volleyball",
        name: "Volleyball",
        category: "Team",
        iconName: "Activity",
        description: "Spikes, sets, and blocks on the hard court.",
        accentClass: "from-orange-500 to-red-500",
    },
    {
        id: "tug-of-war",
        name: "Tug of War",
        category: "Team",
        iconName: "Flame",
        description: "Pure strength and team coordination.",
        accentClass: "from-red-600 to-rose-700",
    },
    {
        id: "basketball",
        name: "Basketball",
        category: "Team",
        iconName: "CircleDashed",
        description: "Fast-paced hoops action.",
        accentClass: "from-orange-400 to-orange-600",
    },
    {
        id: "kabaddi",
        name: "Kabaddi",
        category: "Team",
        iconName: "Activity",
        description: "Raw strength, agility, and team raids.",
        accentClass: "from-yellow-500 to-amber-700",
    },
    {
        id: "chess",
        name: "Chess",
        category: "Individual",
        iconName: "Box",
        description: "A battle of wits and strategy.",
        accentClass: "from-slate-400 to-slate-600",
    },
    {
        id: "table-tennis",
        name: "Table Tennis",
        category: "Individual",
        iconName: "ActivitySquare",
        description: "Lightning fast reflexes required.",
        accentClass: "from-cyan-400 to-blue-500",
    },
    {
        id: "badminton",
        name: "Badminton",
        category: "Individual",
        iconName: "Wind",
        description: "Smash your way to victory.",
        accentClass: "from-pink-500 to-rose-500",
    },
    {
        id: "throwball",
        name: "Throwball",
        category: "Team",
        iconName: "Asterisk",
        description: "Catch, throw, and score.",
        accentClass: "from-violet-500 to-purple-600",
    },
    {
        id: "carrom",
        name: "Carrom",
        category: "Individual",
        iconName: "Crosshair",
        description: "Precision strikes on the board.",
        accentClass: "from-amber-600 to-orange-700",
    }
];
