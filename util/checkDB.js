const getDb = require("../util/database").getDb


async function checkEmoji(emoji) {

    let db = getDb();

    try {

        const check = await db.collection("emoji").find({ emoji: emoji }).next()

        if (check) {

            return {
                ...check,
                exist:true
            }
        }

        return {
            exit:false
        };

    } catch (error) {

        return {
            exist:error
        };

    }

}


async function addEmoji(site, emoji) {

    let db = getDb();

    try {
        const added = await db.collection("emoji").insertOne({ site: site, emoji: emoji })

        return true;
    }
    catch (e) {

        return false;
    }


}




exports.checkEmoji = checkEmoji;
exports.addEmoji = addEmoji