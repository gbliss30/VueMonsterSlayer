function getRandomValue(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
	data() {
		return {
			playerHealth: 100,
			monsterHealth: 100,
			currentRound: 0,
			winner: null,
			battleLog: [],
		};
	},
	watch: {
		playerHealth(value) {
			if (value <= 0 && this.monsterHealth <= 0) {
				//draw
				this.winner = 'draw';
			} else if (value <= 0) {
				//player lost
				this.winner = 'monster';
			}
		},
		monsterHealth(value) {
			if (value <= 0 && this.playerrHealth <= 0) {
				//draw
				this.winner = 'draw';
			} else if (value <= 0) {
				//monster lost
				this.winner = 'player';
			}
		},
	},
	computed: {
		monsterHealthbar() {
			if (this.monsterHealth < 0) {
				return { width: '0%' };
			} else {
				return { width: this.monsterHealth + '%' };
			}
		},
		playerHealthbar() {
			if (this.playerHealth < 0) {
				return { width: '0%' };
			} else {
				return { width: this.playerHealth + '%' };
			}
		},
		disableSpecialAttack() {
			return this.currentRound % 3 !== 0;
		},
	},
	methods: {
		attackMonster() {
			this.currentRound++;
			const attackValue = getRandomValue(5, 12);
			this.monsterHealth -= attackValue;
			this.updateLog('player', 'attack', attackValue);
			this.attackPlayer();
		},
		attackPlayer() {
			const attackValue = getRandomValue(8, 15);
			this.playerHealth -= attackValue;
			this.updateLog('monster', 'attack', attackValue);
		},
		specialAttackMonster() {
			this.currentRound++;
			const attackValue = getRandomValue(10, 25);
			this.monsterHealth -= attackValue;
			this.updateLog('player', 'special attack', attackValue);
			this.attackPlayer();
		},
		healPlayer() {
			this.currentRound++;
			const healValue = getRandomValue(8, 20);
			if (this.playerHealth + healValue > 100) {
				this.playerHealth = 100;
			} else {
				this.playerHealth += healValue;
			}
			this.updateLog('player', 'heal', healValue);
			this.attackPlayer();
		},
		surrender() {
			this.winner = 'monster';
		},
		newGame() {
			this.currentRound = 0;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.winner = null;
			this.battleLog = [];
		},
		updateLog(who, what, value) {
			this.battleLog.unshift({
				actor: who,
				action: what,
				value: value,
			});
		},
	},
});

app.mount('#game');
