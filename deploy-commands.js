require("dotenv").config();

const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

function createBlacklistCommand(name) {
  const command = new SlashCommandBuilder()
    .setName(name)
    .setDescription("Zarządza blacklistą n1tr0 market.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) => {
      subcommand
        .setName("dodaj")
        .setDescription("Dodaje użytkownika na blacklistę.")
        .addUserOption((option) =>
          option
            .setName("osoba")
            .setDescription("Osoba dodawana na blacklistę.")
            .setRequired(true),
        )
        .addStringOption((option) =>
          option
            .setName("powod")
            .setDescription("Powód blacklisty.")
            .setRequired(false),
        );

      for (let index = 1; index <= 5; index += 1) {
        subcommand.addAttachmentOption((option) =>
          option
            .setName(`plik${index}`)
            .setDescription(`Opcjonalny dowód ${index}.`)
            .setRequired(false),
        );
      }

      return subcommand;
    })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("usuń")
        .setDescription("Usuwa użytkownika z blacklisty.")
        .addUserOption((option) =>
          option
            .setName("osoba")
            .setDescription("Osoba usuwana z blacklisty.")
            .setRequired(true),
        ),
    );

  return command;
}

function createCennikCommand() {
  return new SlashCommandBuilder()
    .setName("cennik")
    .setDescription("Zarządza cennikiem n1tr0 market.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((subcommand) =>
      subcommand
        .setName("panel")
        .setDescription("Wysyła panel cennika."),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("dodaj")
        .setDescription("Dodaje nową kategorię do cennika.")
        .addStringOption((option) =>
          option.setName("klucz").setDescription("Identyfikator, np. cennik_robux.").setRequired(true),
        )
        .addStringOption((option) =>
          option.setName("nazwa").setDescription("Nazwa w menu, np. Robux.").setRequired(true),
        )
        .addStringOption((option) =>
          option.setName("tytul").setDescription("Tytuł cennika.").setRequired(true),
        )
        .addStringOption((option) =>
          option.setName("opis").setDescription("Opis w menu.").setRequired(false),
        )
        .addStringOption((option) =>
          option.setName("emoji").setDescription("Emoji w menu.").setRequired(false),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("edytuj")
        .setDescription("Edytuje kategorię cennika.")
        .addStringOption((option) =>
          option.setName("klucz").setDescription("Identyfikator kategorii.").setRequired(true),
        )
        .addStringOption((option) =>
          option.setName("tytul").setDescription("Nowy tytuł.").setRequired(false),
        )
        .addStringOption((option) =>
          option.setName("nazwa").setDescription("Nowa nazwa w menu.").setRequired(false),
        )
        .addStringOption((option) =>
          option.setName("opis").setDescription("Nowy opis w menu.").setRequired(false),
        )
        .addStringOption((option) =>
          option.setName("emoji").setDescription("Nowe emoji.").setRequired(false),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("podglad")
        .setDescription("Pokazuje podgląd kategorii cennika.")
        .addStringOption((option) =>
          option.setName("klucz").setDescription("Identyfikator kategorii.").setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("usun")
        .setDescription("Usuwa kategorię z cennika.")
        .addStringOption((option) =>
          option.setName("klucz").setDescription("Identyfikator kategorii.").setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("lista")
        .setDescription("Wyświetla listę kategorii cennika."),
    );
}

function createLegitCheckCommand() {
  return new SlashCommandBuilder()
    .setName("lc")
    .setDescription("Tworzy legit-check w aktualnym tickecie.");
}

function createRulesPanelCommand() {
  return new SlashCommandBuilder()
    .setName("regulamin-panel")
    .setDescription("Wysyła panel regulaminu n1tr0 market.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);
}

function createGiveawayCommand() {
  return new SlashCommandBuilder()
    .setName("konkurs")
    .setDescription("Zarządza konkursami n1tr0 market.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("stworz")
        .setDescription("Tworzy panel konkursu.")
        .addStringOption((option) =>
          option
            .setName("nagroda")
            .setDescription("Nagroda w konkursie.")
            .setRequired(true),
        )
        .addIntegerOption((option) =>
          option
            .setName("zwyciezcy")
            .setDescription("Liczba zwyciezcow.")
            .setMinValue(1)
            .setMaxValue(20)
            .setRequired(true),
        )
        .addStringOption((option) =>
          option
            .setName("czas")
            .setDescription("Czas trwania, np. 30m, 2h, 1d.")
            .setRequired(true),
        ),
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reroll")
        .setDescription("Losuje ponownie zwycięzców zakończonego konkursu.")
        .addStringOption((option) =>
          option
            .setName("id-wiadomosci")
            .setDescription("ID wiadomości konkursu.")
            .setRequired(true),
        ),
    );
}

const commands = [
  new SlashCommandBuilder()
    .setName("ticket-panel")
    .setDescription("Wysyla panel ticketow n1tr0 market.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  new SlashCommandBuilder()
    .setName("drop-panel")
    .setDescription("Wysyla panel dropow n1tr0 market.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  createGiveawayCommand(),
  new SlashCommandBuilder()
    .setName("zapro")
    .setDescription("Pokazuje statystyki zaproszeń.")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Osoba, której zaproszenia chcesz sprawdzić.")
        .setRequired(false),
    ),
  new SlashCommandBuilder()
    .setName("legit")
    .setDescription("Wysyła panel reakcji legit n1tr0 market.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  createBlacklistCommand("blacklista"),
  createBlacklistCommand("bl"),
  createCennikCommand(),
  createRulesPanelCommand(),
  createLegitCheckCommand(),
  new SlashCommandBuilder()
    .setName("close")
    .setDescription("Zamyka aktualny ticket i wysyla transkrypt na logi."),
  new SlashCommandBuilder()
    .setName("claim")
    .setDescription("Przejmuje aktualny ticket jako support."),
].map((command) => command.toJSON());

async function main() {
  const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

  if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
    throw new Error("Uzupelnij DISCORD_TOKEN, CLIENT_ID i GUILD_ID w pliku .env.");
  }

  const rest = new REST({ version: "10" }).setToken(DISCORD_TOKEN);
  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });

  console.log("Zarejestrowano komendy /ticket-panel, /drop-panel, /konkurs, /zapro, /legit, /blacklista, /bl, /cennik, /regulamin-panel, /lc, /close i /claim.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
