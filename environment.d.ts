import { ColorResolvable, HexColorString } from 'discord.js';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            TOKEN: string;
        }
    }
}

export {};
