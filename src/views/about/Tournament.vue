<template>
    <div class="bracket">
        <template v-for="(round, index) in rounds" :key="index">
            <div class="round" :class="['round-' + index]">
                <div v-if="round === 32" class="match">
                    <template  v-for="(player, matchIndex) in players_32" :key="matchIndex">
                        <div class="match__container">
                            <div class="match__container__content">{{player.id}}. {{player.name}}</div>
                        </div>
                    </template>
                </div>

                <div v-if="round === 16" class="match">
                    <template  v-for="(player, matchIndex) in players_16" :key="matchIndex">
                        <div class="match__container">
                            <div class="match__container__content">{{player.name}}</div>
                        </div>
                    </template>
                </div>

                <div v-if="round === 8" class="match">
                    <template  v-for="(player, matchIndex) in players_8" :key="matchIndex">
                        <div class="match__container">
                            <div class="match__container__content">{{player.name}}</div>
                        </div>
                    </template>
                </div>

                <div v-if="round === 4" class="match">
                    <template  v-for="(player, matchIndex) in players_4" :key="matchIndex">
                        <div class="match__container">
                            <div class="match__container__content">{{player.name}}</div>
                        </div>
                    </template>
                </div>

                <div v-if="round === 2" class="match">
                    <template  v-for="(player, matchIndex) in players_2" :key="matchIndex">
                        <div class="match__container">
                            <div class="match__container__content">{{player.name}}</div>
                        </div>
                    </template>
                </div>

                <div v-if="round === 1" class="match">
                    <template  v-for="(player, matchIndex) in players_1" :key="matchIndex">
                        <div class="match__container">
                            <div class="match__container__content">{{player.name}}</div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { computed } from 'vue';
import * as playersJson from './../../assets/json/players.json';

export default {
    setup() {
        const defaultRounds = [256, 128, 64, 32, 16, 8, 4, 2, 1];
        const players = 32;
        const players_32 = playersJson['32'];
        const players_16 = playersJson['16'];
        const players_8 = playersJson['8'];
        const players_4 = playersJson['4'];
        const players_2 = playersJson['2'];
        const players_1 = playersJson['1'];

        let rounds = computed(() => {
            return defaultRounds.filter(rounds => rounds <= players);
        });

        return { rounds, players_32, players_16, players_8, players_4, players_2, players_1 }
    }
  }
</script>


