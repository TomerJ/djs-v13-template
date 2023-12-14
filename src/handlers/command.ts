require('dotenv').config();
import { client } from '@';
import {
    CommandInteraction,
    CommandInteractionOptionResolver,
    Formatters,
    Interaction,
    MessageEmbed,
} from 'discord.js';
import { ExtendedInteraction } from '@typings/command';

import { LogLevel } from '@enums/logLevel';
import Log from '@utilities/log';

export async function command(interaction: CommandInteraction) {
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    if (command?.disabled) {
        Log.emit(
            `${interaction.user.username} has attempted to run a disabled command`,
            LogLevel.Debug
        );
        const commandDisabled = new MessageEmbed()
            .setColor('#ff7a38')
            .setTitle('✘ | This command is disabled');
        return interaction.reply({
            embeds: [commandDisabled],
            ephemeral: true,
        });
    }
    if (command?.ephemeral) {
        await interaction.deferReply({ ephemeral: true });
    } else {
        await interaction.deferReply();
    }

    command
        .run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as ExtendedInteraction,
        })
        .then(() =>
            Log.emit(
                `Command ${command.name} has been ran successfully with no errors!`,
                LogLevel.Debug
            )
        )
        .catch((error: any) => {
            if (!(error instanceof Error)) {
                const runError = new MessageEmbed()
                    .setColor('#ff7a38')
                    .setTitle(`✘ | An error has occured`);
                interaction.editReply({ embeds: [runError] });
                return Log.emit(
                    `Command ${command.name} has thrown an unknown error`,
                    LogLevel.Error
                );
            }

            Log.emit(
                `Command ${command.name} has thrown an error: ${error.message}`,
                LogLevel.Error
            );
            const runError = new MessageEmbed()
                .setColor('#ff7a38')
                .setTitle(`✘ | An error has occured`)
                .addFields([
                    {
                        name: 'Error Details',
                        value: error.message,
                    },
                ]);
            interaction.editReply({ embeds: [runError] });
        });
}
