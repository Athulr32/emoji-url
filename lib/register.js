const { addEmoji, checkEmoji } = require("../util/checkDB");
const GraphemeSplitter = require("grapheme-splitter");
const emojiRegex = require('emoji-regex');

module.exports = async (req, res, next) => {

    const regex = emojiRegex(); 
    var splitter = new GraphemeSplitter();

    let { site, emoji } = req.body

    //Validate Emoji and Site
    //Site
    if (!site.substring(0, 5).includes("http") && !site.substring(0, 5).includes("https")) {
        site = "https://" + site;
    }

   
    //Emoji
    let arr = splitter.splitGraphemes(emoji);
    arr = arr.filter((data) => {

        return data !== ' '
    })
    

    for (const i of arr) {
        let check = regex.test(arr);
        if (check === false) {
            res.json({
                msg: "Use Emoji's Only"
            })
            return;
        }
    }

    // //Check if the emoji is already in use
    const emojiExist = await checkEmoji(emoji);

    if (emojiExist.exist) {
        res.status(200).json({ msg: "This Emoji is Already chosen!! " });
        return;
    }


    //If emoji doesn't exist in database add that to database
    const emojiAdded = await addEmoji(site, emoji)

    if (!emojiAdded) {
        res.status(200).json({ msg: "Sorry Some Error Happened Try again!!" });
        return;
    }

    //Send The shorted URL to user
    res.status(201).json(
        {
            url: site,
            shortURL: "urlshorteremoji.herokuapp.com/" + emoji
        }
    )


}