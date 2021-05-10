const Discord = require('discord.js');
const client = new Discord.Client();
 
const prefix = '.';
 
const fs = require('fs');
const welcome = require('./welcome')
const bot = new Discord.Client();
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('tezz is online!');

    

    welcome(client);
    
});
bot.on('message', message => {
    if(message.content.startWith('!kick')) {
        if(message.channel.type === 'DM') {
            //Fist check if message channel is not direct message, because you cant kick out of guide 
            message.channel.send('This command can use only in guide');
            return;
        };

        //Then check if user have permissions to do that
        if(!message.member.hasPermission('KICK_MEMBERS')) {
            message.channel.send('You have no permissions to do that');
            return;
        };

        //const a member, wich you need yo kick (its fist mention message member)
        let mentionMember = message.mentions.members.first();
        //If user dont mention a member, that show him this error msg
        if(!mentionMember) {
            message.channel.send('pls mention member witch you need to kick');
            return;
        }

        //Get the highest role of user for compare
        let authorHighestRole = message.member.highestRole.position;
        let mentionHighestRole = mentionMember.highestRole.position;

        //If mention user have same or higher role, so show this error msg
        if(mentionHighestRole >= authorHighestRole) {
            message.channel.send('You can`t kick members with equal or higher position');
            return;
        };

        //Check if your bot can`t kick this user, so that show this error msg 
        if(!mentionMember.kickable) {
            message.channel.send('I have no permissions to kick this user');
            return
        };

        //If all steps are completed successfully try kick this user
        mentionMember.kick()
            .then(() => console.log(`Kicked ${member.displayName}`))
            .catch(console.error);
    };
})




    client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('!kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
});
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    } else if(command === 'youtube'){
        client.commands.get('youtube').execute(message, args);

     } else if(command === 'help'){
        client.commands.get('help').execute(message, args);
 
     } else if(command === 'insta@athul'){
        client.commands.get('instaathul').execute(message, args);
     
    } else if(command === 'insta@nubi'){
        client.commands.get('instanubi').execute(message, args);
     
    }  
  
});

client.login('bot token');
