// PANEL NEON THE ISLE
const panelEmbed = new EmbedBuilder()
 .setTitle('🦖・THE ISLE - NIDO DE SOPORTE')
 .setDescription(
    '**Bienvenido superviviente al nido.**\n\n' +
    '> 🌿 **¿Te han matado? ¿Bug? ¿Reportar a alguien?**\n' +
    '> Pulsa el huevo de abajo y abre un nido privado.\n\n' +
    '```ansi\n' +
    '\u001b[2;32m\u001b[1;32m▸ Soporte rápido 24/7\u001b[0m\n' +
    '\u001b[2;35m\u001b[1;35m▸ Staff especializado en The Isle\u001b[0m\n' +
    '\u001b[2;36m\u001b[1;36m▸ No compartas tu nido con depredadores\u001b[0m\n' +
    '```\n' +
    '**¡Sobrevive y domina la isla!**'
  )
 .setColor('#00FF88')
 .setThumbnail('https://i.imgur.com/CzXT6dp.png') // puedes poner el icono de tu server
 .setImage('https://i.imgur.com/8Km9tLL.png') // banner neón dino - cámbialo si quieres
 .setFooter({ text: 'The Isle • Sistema de Nidos • No afk en el nido', iconURL: interaction.guild.iconURL({ dynamic: true }) })
 .setTimestamp();

const row = new ActionRowBuilder().addComponents(
  new ButtonBuilder()
   .setCustomId('crear_ticket')
   .setLabel('🥚 Abrir Nido')
   .setStyle(ButtonStyle.Success),
  new ButtonBuilder()
   .setCustomId('info_isle')
   .setLabel('🦕 Info')
   .setStyle(ButtonStyle.Secondary)
   .setDisabled(true) // quita esto si quieres que haga algo
);

await interaction.reply({ embeds: [panelEmbed], components: [row] });
