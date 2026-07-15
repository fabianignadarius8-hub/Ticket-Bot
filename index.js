const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers] });

client.on('ready', async () => {
    console.log(`BOT ONLINE: ${client.user.tag}`);
    try {
        await client.application.commands.create({ name: 'panel', description: 'Crear el panel de tickets' });
        console.log('Comando /panel registrado');
    } catch (e) { console.log(e) }
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand && interaction.commandName === 'panel') {
        const embed = new EmbedBuilder().setTitle('🎫 Soporte').setDescription('Haz clic en el botón para abrir un ticket privado.').setColor(0x5865F2);
        const row = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('crear_ticket').setLabel('Crear Ticket').setStyle(ButtonStyle.Primary).setEmoji('🎫'));
        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: 'Panel creado!', ephemeral: true });
    }
    if (!interaction.isButton()) return;
    if (interaction.customId === 'crear_ticket') {
        const name = `ticket-${interaction.user.username}`.toLowerCase();
        if (interaction.guild.channels.cache.find(c => c.name === name)) return interaction.reply({ content: '¡Ya tienes un ticket abierto!', ephemeral: true });
        const ticketChannel = await interaction.guild.channels.create({
            name: name,
            type: ChannelType.GuildText,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: interaction.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages] }
            ]
        });
        const rowClose = new ActionRowBuilder().addComponents(new ButtonBuilder().setCustomId('cerrar_ticket').setLabel('Cerrar Ticket').setStyle(ButtonStyle.Danger).setEmoji('🔒'));
        await ticketChannel.send({ content: `${interaction.user} Bienvenido, el staff te atenderá pronto.`, components: [rowClose] });
        await interaction.reply({ content: `Ticket creado: ${ticketChannel}`, ephemeral: true });
    }
    if (interaction.customId === 'cerrar_ticket') {
        await interaction.reply({ content: 'Cerrando en 5 segundos...' });
        setTimeout(() => interaction.channel.delete().catch(()=>{}), 5000);
    }
});

client.login(process.env.TOKEN);
