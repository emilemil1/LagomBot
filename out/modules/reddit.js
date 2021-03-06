import { BotUtils } from "discord-dbm";
import Reddit from "snoowrap";
class RedditMod {
    constructor() {
        this.configuration = {
            name: "Dank Memes",
            description: "",
            commands: ["dankmeme", "cursed"]
        };
        this.reddit = new Reddit({
            userAgent: "A Discord bot using the Snoowrap npm package to display some dank memes.",
            clientId: BotUtils.getValue("redditClientId"),
            clientSecret: BotUtils.getSecret("redditClientSecret"),
            username: BotUtils.getValue("redditUsername"),
            password: BotUtils.getSecret("redditPassword")
        });
    }
    onCommand(command, message, attempt = 1) {
        let sub;
        switch (command[0]) {
            case "dankmeme":
                sub = "dankmemes";
                break;
            case "cursed":
                sub = "cursedimages";
                break;
            default:
                sub = "dankmemes";
        }
        if (attempt === 5) {
            message.channel.send("Oops. It seems we've run out of memes. (try again)");
        }
        this.reddit.getSubreddit(sub).getRandomSubmission().then(submission => {
            switch (submission.url.substring(submission.url.lastIndexOf(".") + 1)) {
                case "jpg":
                case "jpeg":
                case "png":
                case "gif":
                case "webp":
                case "webm":
                case "mkv":
                case "mov":
                case "mp4":
                case "m4v":
                case "flv":
                case "avi":
                case "ogg":
                case "mp3":
                case "aac":
                case "flac":
                case "m4a":
                case "opus":
                case "wav":
                    break;
                default:
                    return this.onCommand(command, message, ++attempt);
            }
            message.channel.send("", {
                file: submission.url
            }).then(message => {
                if (command.includes("-t")) {
                    setTimeout(() => message.delete(), 60000);
                }
            });
        });
    }
}
export default new RedditMod();
//# sourceMappingURL=reddit.js.map