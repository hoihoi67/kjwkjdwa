# n1tr0 market - system ticketow

## Konfiguracja

1. Skopiuj `.env.example` do `.env` i uzupelnij wartosci dla swojego serwera.
2. Wklej dane do `.env`:
   - `DISCORD_TOKEN` - token bota (placeholder, np. `YOUR_DISCORD_TOKEN`)
   - `CLIENT_ID` - ID aplikacji bota, np. `YOUR_CLIENT_ID`
   - `GUILD_ID` - ID serwera, np. `YOUR_GUILD_ID`
3. W `config.json` ustaw:
   - `ticketCategoryId` - ID kategorii, w ktorej maja powstawac tickety
   - `supportRoleId` - ID roli administracji
   - `logChannelId` - ID kanalu logow albo zostaw puste

## Uruchomienie

```bash
npm install
npm start
```

## Panel

Na Discordzie napisz na kanale:

```text
!hxw1
```

Komenda dziala tylko dla administracji. Bot musi miec wlaczony `Message Content Intent` w Discord Developer Portal.

Komenda slash `/ticket-panel` nadal jest w kodzie jako zapasowa opcja. Jesli chcesz jej uzywac, uruchom `npm run deploy`.

## Kategorie formularzy

- Chce Zakupic Produkt
- Chce Nawiazac Partnerstwo
- Middleman
- Potrzebuje Pomocy
- Chce Zlozyc Reklamacje
- Zglos Oszusta
