const utils = {
    shuffle(memberArr) {
        for (let i = 0; i < memberArr.length; i++) {
            let random = Math.floor(Math.random() * memberArr.length);
            [memberArr[i], memberArr[random]] = [memberArr[random], memberArr[i]]
        }
        return memberArr;
    },
    teamNums(shuffled, quantity) {
        return Math.ceil(shuffled.length / quantity);
    },
    numPer(shuffled, quantity) {
        return Math.floor(shuffled.length / quantity);
    },
    extra(shuffled, quantity) {
        return shuffled.length % quantity;
    }
};

module.exports = utils;