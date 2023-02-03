////////////// this code for mongodb database that shown in youtube tutorial . 

const {model , Schema} = require ("mongoose")

const seso = new Schema(
    {
        id : String , 
        wallet : {type : Number , default : 0} , 
        bank : {type : Number , default : 0} , 
        cooldowns : {
            work : {type : Date}
        }
    }
)

module.exports = model("seso", seso)







//////// This code below for work.js command that shown in the tutorial in youtube just copy it and paste it in your work.js file


const {Discord , ApplicationCommandOptionType  , EmbedBuilder } = require ("discord.js")
const seso = require ("../schemas.js/work")
const ms = require ('ms')




module.exports = {

    name: "work",
    description: "show your userinfo 🔥"  ,

    run: async (client, interaction) => {

        const jobs = ["Leader" , "Discord staff" , "Presedent", "cheif" , "Director"]

        const user = interaction.member.user ;
        const bb = await seso.findOne({id : user.id}) || new seso ({id : user.id})

        if (bb.cooldowns.work > Date.now ()) return interaction.reply ({content : `${interaction.user.username}` , embeds : [new EmbedBuilder () .setDescription (`**you can use a commmand in time** \`\ ${ms(bb.cooldowns.work - Date.now () , {long : true} ) } \`\ `).setTimestamp()]})

        const amount = Math.floor(Math.random() * (100 -10 + 1)) + 10
        const job = jobs [Math.floor(Math.random () * jobs.length )]

        bb.wallet += amount
        bb.cooldowns.work = Date.now () + (1000 * 60 * 60 )
        bb.save ()
        return interaction.reply ({embeds : [new EmbedBuilder () .setDescription(`** You won with \`\ ${job} \`\  and you earned \`\ ${amount} \`\ 🪙 **`)]})


    }
}




//////////////////////////// And this for balance.js command just go ahead to balance.js file and paste the code below 


const {Discord , ApplicationCommandOptionType  , EmbedBuilder } = require ("discord.js")
const seso = require ("../schemas.js/work")

module.exports = {

    name: "balance",
    description: "show your userinfo 🔥"  ,

    run: async (client, interaction) => {

        const user = interaction.member.user
     
         const jj = await seso.findOne({id : user.id}) || new seso ({id : user.id})
  

                return interaction.reply ({embeds : [new EmbedBuilder () .setTitle(interaction.user.username) .addFields ({ name : `Your Wallet is` , value : ` \`\  ${jj.wallet} \`\ `} , {name : `**Your bank is**` , value : `** \`\ ${jj.bank} \`\ **`}).setThumbnail(interaction.user.displayAvatarURL())]}) 


    }
}
