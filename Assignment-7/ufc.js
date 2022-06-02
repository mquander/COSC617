var express = require('express');
const {graphqlHTTP} = require('express-graphql');
var {buildSchema} = require('graphql');

var schema = buildSchema(`
    type Query{
        fighter(name: String!): Fighter
        fighterWgtCls(currWeightClass: String): [Fighter]
    }
    type Fighter{
        name: String
        nickName: String
        numWins: Int
        numLosses: Int
        height: Float
        currWeightClass: String
        location: String
    }
`);
var fighterData = [
    {
        name: "Walter Harris",
        nickName: "The Big Ticket",
        numWins: 13,
        numLosses: 10,
        height: 1.96,
        currWeightClass: "heavyweight",
        location: "Birmingham, AL"
    },
    {
        name: "Jake Collier",
        nickName: "The Prototype",
        numWins: 13,
        numLosses: 6,
        height: 1.91,
        currWeightClass: "heavyweight",
        location: "Cuba, MO"
    },
    {
        name: "Jon Jones",
        nickName: "Bones",
        numWins: 26,
        numLosses: 1,
        height: 1.93,
        currWeightClass: "light heavyweight",
        location: "Albuquerque, NM"
    },
    {
        name: "Nikita Krylov",
        nickName: "The Miner",
        numWins: 27,
        numLosses: 9,
        height: 1.88,
        currWeightClass: "light heavyweight",
        location: "Donetsk, Ukraine"
    },
    {
        name: "Nick Diaz",
        nickName: "N/A",
        numWins: 26,
        numLosses: 10,
        height: 1.85,
        currWeightClass: "middleweight",
        location: "Stockton, CA"
    },
    {
        name: "Darren Till",
        nickName: "The Gorilla",
        numWins: 18,
        numLosses: 4,
        height: 1.83,
        currWeightClass: "middleweight",
        location: "Liverpool, England"
    },
    {
        name: "Court McGee",
        nickName: "The Crusher",
        numWins: 21,
        numLosses: 10,
        height: 1.80,
        currWeightClass: "welterweight",
        location: "Provo, UT"
    },
    {
        name: "Francisco Trinaldo",
        nickName: "Massaranduba",
        numWins: 27,
        numLosses: 8,
        height: 1.75,
        currWeightClass: "welterweight",
        location: "Brazilia, Brazil"
    },
    {
        name: "Ramiz Brahimaj",
        nickName: "N/A",
        numWins: 10,
        numLosses: 4,
        height: 1.78,
        currWeightClass: "welterweight",
        location: "Dallas, TX"
    },
    {
        name: "Joe Lauzon",
        nickName: "J-Lau",
        numWins: 28,
        numLosses: 15,
        height: 1.78,
        currWeightClass: "lightweight",
        location: "East Bridgewater, MA"
    },
    {
        name: "Tony Ferguson",
        nickName: "El Cucuy",
        numWins: 25,
        numLosses: 6,
        height: 1.80,
        currWeightClass: "lightweight",
        location: "Orange County, CA"
    }, 
    {
        name: "Leonardo Santos",
        nickName: "N/A",
        numWins: 18,
        numLosses: 5,
        height: 1.85,
        currWeightClass: "lightweight",
        location: "Campos dos Goytacazes, Brazil"
    },
    {
        name: "Max Holloway",
        nickName: "Blessed",
        numWins: 23,
        numLosses: 6,
        height: 1.80,
        currWeightClass: "featherweight",
        location: "Waianae, HI"
    },
    {
        name: "Dan Hooker",
        nickName: "The Hangman",
        numWins: 21,
        numLosses: 12,
        height: 1.83,
        currWeightClass: "featherweight",
        location: "Auckland, New Zealand"
    },
    {
        name: "Eddie Wineland",
        nickName: "N/A",
        numWins: 24,
        numLosses: 15,
        height: 1.73,
        currWeightClass: "bantamweight",
        location: "Chesterton, IN"
    },
    {
        name: "Kang Kyung-ho",
        nickName: "Mr. Perfect",
        numWins: 17,
        numLosses: 9,
        height: 1.75,
        currWeightClass: "bantamweight",
        location: "Busan, South Korean"
    },
    {
        name: "Marlon Vera",
        nickName: "Chito",
        numWins: 18,
        numLosses: 7,
        height: 1.73,
        currWeightClass: "bantamweight",
        location: "Irvine, CA"
    },
    {
        name: "Brandon Moreno",
        nickName: "The Assassin Baby",
        numWins: 19,
        numLosses: 6,
        height: 1.70,
        currWeightClass: "flyweight",
        location: "Tijuana, Mexico"
    },
    {
        name: "Su Mudaerji",
        nickName: "The Tibetan Eagle",
        numWins: 16,
        numLosses: 4,
        height: 1.73,
        currWeightClass: "flyweight",
        location: "Aba, China"
    },
    {
        name: "Askar Askarov",
        nickName: "Bullet",
        numWins: 14,
        numLosses: 1,
        height: 1.65,
        currWeightClass: "flyweight",
        location: "Khasavyurt, Russia"
    }
];

var getFighter = function(args){
    var name = args.name;
    return fighterData.filter(fighter => {
        return fighter.name == name;
    })[0];
}
var getFighters = function(args){
    if(args.currWeightClass){
        var weightClass = args.currWeightClass;
        return fighterData.filter(fighter => fighter.currWeightClass === weightClass);
    } else{
        return fighterData;
    }
}

var root = {
    fighter: getFighter,
    fighterWgtCls: getFighters
};

var app = express();
app.use('/fightergraphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => console.log('Server running..'))