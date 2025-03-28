const fs = require('fs');
const { Sequelize } = require('sequelize');
const isVPS = !(__dirname.startsWith("/rgnk") || __dirname.startsWith("/skl"));
const isHeroku = __dirname.startsWith("/skl");
const isKoyeb = __dirname.startsWith("/rgnk");
const isRailway = __dirname.startsWith("/railway");
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true',fault2='on') {
    return ((text === fault) || (text === fault2));
}
const settingsMenu = [
    {title: "PM antispam block", env_var: "PM_ANTISPAM"},
    {title: "Auto read all messages", env_var: "READ_MESSAGES"},
    {title: "Auto read command messages", env_var: "READ_COMMAND"},
    {title: "Auto read status updates", env_var: "AUTO_READ_STATUS"},
    {title: "Admin sudo acces mode (group commands only)", env_var: "ADMIN_ACCESS"},
    {title: "With & without handler mode", env_var: "MULTI_HANDLERS"},
    {title: "Auto reject calls", env_var: "REJECT_CALLS"},
    {title: "Always online", env_var: "ALWAYS_ONLINE"},
    {title: "PM Auto blocker", env_var: "PMB_VAR"},
    {title: "Disable bot in PM", env_var: "DIS_PM"}
  ]
DATABASE_URL = process.env.DATABASE_URL === undefined ? './bot.db' : process.env.DATABASE_URL;
DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
if (!(process.env.SESSION || process.env.SESSION_ID)) throw new Error("No session found, add session before starting bot")
module.exports = {
    VERSION: 'v4.0.0',
    ALIVE: process.env.ALIVE || "https://i.imgur.com/KCnoMM2.jpg Hey {sender}, I'm alive \n Uptime: {uptime}",
    BLOCK_CHAT: process.env.BLOCK_CHAT || '',
    PM_ANTISPAM: convertToBool(process.env.PM_ANTISPAM) || '',
    ALWAYS_ONLINE: convertToBool(process.env.ALWAYS_ONLINE) || false,
    MANGLISH_CHATBOT: convertToBool(process.env.MANGLISH_CHATBOT) || false,
    ADMIN_ACCESS: convertToBool(process.env.ADMIN_ACCESS) || false,
    PLATFORM:isHeroku?"Heroku":isRailway?"Railway":isKoyeb?"Koyeb":"Other server",isHeroku,isKoyeb,isVPS,isRailway,
    AUTOMUTE_MSG: process.env.AUTOMUTE_MSG || '_Group automuted!_\n_(edit AUTOMUTE_MSG)_',
    ANTIWORD_WARN: process.env.ANTIWORD_WARN || '',
    ANTI_SPAM: process.env.ANTI_SPAM || '27710200228-120363364087528061@g.us',
    MULTI_HANDLERS: convertToBool(process.env.MULTI_HANDLERS) || false,
    DISABLE_START_MESSAGE: convertToBool(process.env.DISABLE_START_MESSAGE) || false,
    NOLOG: process.env.NOLOG || false,
    DISABLED_COMMANDS: (process.env.DISABLED_COMMANDS ? process.env.DISABLED_COMMANDS.split(",") : undefined) || [],
    ANTI_BOT: process.env.ANTI_BOT || '',
    ANTISPAM_COUNT: process.env.ANTISPAM_COUNT || '6/10', // msgs/sec
    AUTOUNMUTE_MSG: process.env.AUTOUNMUTE_MSG || '_Group auto unmuted!_\n_(edit AUTOUNMUTE_MSG)_',
    AUTO_READ_STATUS: convertToBool(process.env.AUTO_READ_STATUS) || false,
    READ_MESSAGES: convertToBool(process.env.READ_MESSAGES) || false,
    PMB_VAR: convertToBool(process.env.PMB_VAR) || false,
    DIS_PM: convertToBool(process.env.DIS_PM) || false,
    REJECT_CALLS: convertToBool(process.env.REJECT_CALLS) || false,
    PMB: process.env.PMB || '_Personal messages not allowed, BLOCKED!_',
    READ_COMMAND: convertToBool(process.env.READ_COMMAND) || true,
    SESSION: (process.env.SESSION || process.env.SESSION_ID || 'Raganork~38cbee1f4ab97f4bec7ee02db361e18a:6358656b7675336a2b416e646951706e70516f654750712b4a734168314c523544553046393236414d683445706a616c6f733054647574755741556a75586c334436773671743558596c346847303643447152726c334c782f482b41396f6d2f315a7552616f6351395153504c5057736d4b4e44496d414c4d5156494668724b47326a394272486752574f502b5968734a56303133366879626b432b356170694f335278527267734c45386c7671656a534f4577366570414e35775959484e715330345049487079443248573133646c7177636d464b442b466e325633594b6768483963677a4c6f7475386d6662626865386477676f51436c706c58495751334148714a4e494378694863617155782f547a6e306a663268644a45414a316673664777514734576c6e72504154354c4a6d4a766555454f614552724e6c574f62534568745130766a2f3445524d6431526f413050314d74594b6253504c342b52566d50656d4364774f324c5447495574546d676d795977454979354c7a53554748373357497733487a74614a354e45502f464c674d33523566442b434e416e7579744138617063654f73774f553065324d58713476564a3652416f696b4541417866417a434a6e4736306f43323533374b4b724358764464315267504a2f36786d4838322b685a687444666f5557446332326a7569693768656335392b444a356358784a5744385564556c70534557726e46487043464654624945724d6a68796861345472774e474e516262666a6e51554842685659714c4137583349547878792f7a5944344853565353364133483559766575707477725a5052705336356a6e6846544770736d386b326d30566a4c30674d5431684d59645837623645507350644d43496e76713541486771737249763935757658656d45456d424b694f477659717577515334484b372f3330535153716652324e4e5a2f6f6c39684a39784c3272624770554e4a4f31667061386b5467495970693144772b6e5a776f73717a6970497331304e34446164386c69503942374671647a4a4e446146596467356d37374d65307837493461616c5a6a4c7234674c736c313273704c716d4a567a4f4863753846343065685252487849336768577348592b6666474d613165556f6c75776144766e316c7532504976322f59766672454e37497671535069636672327747372b62426e774b4d317252492b62636b545242394a2b6b616d3236483058323631454c6c2b6d417346674f3757626a42706c513759464e51456f3464396d2b786e7033334355686d314d36545a494a614c42316742624a747575755639666b724e4164773d').trim() || 'Raganork~e373c49dc7a009f92e0525818c9c12bb:51557a5239417342682b593d',
    IMGBB_KEY: ["76a050f031972d9f27e329d767dd988f", "deb80cd12ababea1c9b9a8ad6ce3fab2", "78c84c62b32a88e86daf87dd509a657a"],
    RG: process.env.RG || '27710200228-120363364087528061@g.us,27710200228@s.whatsapp.net',
    BOT_INFO: process.env.BOT_INFO || '𝙄𝘾𝙃𝙄𝙂𝙊☾;𝐆𝐄𝐓𝐒𝐔𝐆𝐀 𝐓𝐄𝐍𝐒𝐇𝐎𝐔;0;https://files.catbox.moe/6zoqcg.jpeg;https://chat.whatsapp.com/CicqD04sNCJ37j13LiI51p',
    RBG_KEY: process.env.RBG_KEY || '',
    ALLOWED: process.env.ALLOWED || '91,94,2',
    NOT_ALLOWED: process.env.ALLOWED || '91,94,212',
    CHATBOT: process.env.CHATBOT || 'off',
    HANDLERS: process.env.HANDLERS || '.,',
    STICKER_DATA: process.env.STICKER_DATA || "𝙄𝘾𝙃𝙄𝙂𝙊☾",
    BOT_NAME: process.env.BOT_NAME || '𝙄𝘾𝙃𝙄𝙂𝙊☾',
    AUDIO_DATA: process.env.AUDIO_DATA === undefined || process.env.AUDIO_DATA === "private" ? '𝙄𝘾𝙃𝙄𝙂𝙊☾;𝐆𝐄𝐓𝐒𝐔𝐆𝐀 𝐓𝐄𝐍𝐒𝐇𝐎𝐔 bot;https://files.catbox.moe/6zoqcg.jpeg' : process.env.AUDIO_DATA,
    TAKE_KEY: process.env.TAKE_KEY || '',
    MODE: process.env.MODE || 'private',
    WARN: process.env.WARN || '4',
    ANTILINK_WARN: process.env.ANTILINK_WARN || '',
    HEROKU: {
        HEROKU: process.env.HEROKU === undefined ? false : convertToBool(process.env.HEROKU),
        API_KEY: process.env.HEROKU_API_KEY || '',
        APP_NAME: process.env.HEROKU_APP_NAME || ''
    },
    DATABASE_URL: DATABASE_URL,
    DATABASE: DATABASE_URL === './bot.db' ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: DEBUG }) : new Sequelize(DATABASE_URL, { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: DEBUG }),
    SUDO: process.env.SUDO || "",
    LANGUAGE: process.env.LANGUAGE || 'english',
    DEBUG: DEBUG,
    ACR_A: "ff489a0160188cf5f0750eaf486eee74",
    ACR_S: "ytu3AdkCu7fkRVuENhXxs9jsOW4YJtDXimAWMpJp",
    settingsMenu
};
