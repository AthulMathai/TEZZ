module.exports = client => {
    const channelId = '730126397057531906' // welcome channel
    const targetChannelId = '762030430924832798' // rules and info
    client.on('guildMemberAdd', member => {
        console.log(member);

        const message = `hey <@${member.id}> wasup, i am tezz! welcome to PIED PIPPER. if you need my help use ".help" cammand! and please check out ${member.guild.channels.cache.get(targetChannelId).toString()}`
        const channel = member.guild.channels.cache.get(channelId);
        channel.send(message);
    })
}