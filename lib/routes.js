const path = require("path")
const dirname = require("../util/path")
const {checkEmoji} = require("../util/checkDB")

exports.home =(req, res, next) => {

    res.sendFile(path.join(dirname, "views", "index.html"));


}

exports.searchEmoji = async (req, res) => {
    const emoji = req.params.emoji;

    const retrieveSite = await checkEmoji(emoji);
  
    if (!retrieveSite.exist) {
      
        res.redirect("/");
        return;
    }

    res.redirect(retrieveSite.site)


}