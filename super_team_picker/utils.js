const utils = {
    // Randomizing members
    shuffle(memberArr) {
        for (let i = 0; i < memberArr.length; i++) {
            let random = Math.floor(Math.random() * memberArr.length);
            [memberArr[i], memberArr[random]] = [memberArr[random], memberArr[i]]
        }
        return memberArr;
    },
    // Number of Teams for perTeam
    numTeams(memberArr, quantity) {
        return Math.ceil(memberArr.length / quantity);
    },
    // Assign teams using Per Team Method
    perTeam(memberArr, quantity) {
        let shuffled = this.shuffle(memberArr);
        let numTeams = this.numTeams(memberArr, quantity);
        let team = [];

        for (let i = 1; i <= numTeams; i++) {
            if (i !== numTeams) {
                team.push(shuffled.slice(0, quantity));
                shuffled.splice(0, quantity);
            } else {
                team.push(shuffled);
            }
        };
        console.log(team)
        return team;
    },
    // Assign teams using Team Count Method
    teamCount(memberArr, quantity) {
        let shuffled = this.shuffle(memberArr);
        let numPer = Math.floor(shuffled.length / quantity);
        let extra = shuffled.length % quantity;
        let team = [];

        for (let j = 1; j <= extra; j++) {
            team.push(shuffled.slice(0, numPer + 1));
            shuffled.splice(0, numPer + 1);
        }
        for (let k = extra + 1; k <= quantity; k++) {
            team.push(shuffled.slice(0, numPer));
            shuffled.splice(0, numPer);
        } 
        return team;
    }
};

module.exports = utils;