const utils = {
    // Randomizing members
    shuffle(memberArr) {
        for (let i = 0; i < memberArr.length; i++) {
            let random = Math.floor(Math.random() * memberArr.length);
            [memberArr[i], memberArr[random]] = [memberArr[random], memberArr[i]]
        }
        return memberArr;
    },
    // Getting number of teams
    teamNums(shuffled, quantity) {
        return Math.ceil(shuffled.length / quantity);
    },
    // Getting number of members per team
    numPer(shuffled, quantity) {
        return Math.floor(shuffled.length / quantity);
    },
    // Finding the number of teams that have extra member
    extra(shuffled, quantity) {
        return shuffled.length % quantity;
    }
};

module.exports = utils;