class Simulation {
	static getSettings() {
		return {
			"iterations": parseInt($("input[name='iterations']").val()),
			"minTime": parseInt($("input[name='min-fight-length']").val()),
			"maxTime": parseInt($("input[name='max-fight-length']").val())
		}
	}

	constructor(player, settings = Simulation.getSettings(), simulationEnd, simulationUpdate) {
		this.player = player;
		this.iterations = settings.iterations;
		this.minTime = settings.minTime;
		this.maxTime = settings.maxTime;
		this.simulationEnd = simulationEnd;
		this.simulationUpdate = simulationUpdate;
	}

	// IMPORTANT: The reason this function contains a lot of hardcoded auras and spells instead of using loops is because using loops takes ~4-5 times longer than this method.
	passTime() {
		let time = this.player.castTimeRemaining;
		if (time == 0 || (this.player.gcdRemaining > 0 && this.player.gcdRemaining < time)) time = this.player.gcdRemaining

		// Look for the shortest time until an action needs to be done
		if (this.player.pet) {
			if (this.player.pet.spiritTickTimerRemaining < time) time = this.player.pet.spiritTickTimerRemaining;

			// Pet's attacks/abilities and such
			if (this.player.pet.mode == PetMode.AGGRESSIVE) {
				if (this.player.pet.spells.melee && this.player.pet.spells.melee.cooldownRemaining < time) time = this.player.pet.spells.melee.cooldownRemaining;
				//else if (this.player.pet.type == PetType.RANGED && this.player.pet.castTimeRemaining > 0 && this.player.pet.castTimeRemaining < time) time = this.player.pet.castTimeRemaining;

				if (this.player.pet.pet == PetName.IMP) {

				} else if (this.player.pet.pet == PetName.VOIDWALKER) {

				} else if (this.player.pet.pet == PetName.SUCCUBUS) {
					if (this.player.pet.spells.lashOfPain.cooldownRemaining > 0 && this.player.pet.spells.lashOfPain.cooldownRemaining < time) time = this.player.pet.spells.lashOfPain.cooldownRemaining;
				} else if (this.player.pet.pet == PetName.FELHUNTER) {
					
				} else if (this.player.pet.pet == PetName.FELGUARD) {
					if (this.player.pet.spells.cleave.cooldownRemaining > 0 && this.player.pet.spells.cleave.cooldownRemaining < time) time = this.player.pet.spells.cleave.cooldownRemaining;
				}
			}
		}

		if (this.player.auras.improvedShadowBolt && this.player.auras.improvedShadowBolt.active && this.player.auras.improvedShadowBolt.durationRemaining < time) time = this.player.auras.improvedShadowBolt.durationRemaining;
		if (this.player.auras.corruption && this.player.auras.corruption.active && this.player.auras.corruption.tickTimerRemaining < time) time = this.player.auras.corruption.tickTimerRemaining; 
		if (this.player.auras.unstableAffliction && this.player.auras.unstableAffliction.active && this.player.auras.unstableAffliction.tickTimerRemaining < time) time = this.player.auras.unstableAffliction.tickTimerRemaining;
		if (this.player.auras.siphonLife && this.player.auras.siphonLife.active && this.player.auras.siphonLife.tickTimerRemaining < time) time = this.player.auras.siphonLife.tickTimerRemaining;
		if (this.player.auras.immolate && this.player.auras.immolate.active && this.player.auras.immolate.tickTimerRemaining < time) time = this.player.auras.immolate.tickTimerRemaining;
		if (this.player.auras.curseOfAgony && this.player.auras.curseOfAgony.active && this.player.auras.curseOfAgony.tickTimerRemaining < time) time = this.player.auras.curseOfAgony.tickTimerRemaining;
		if (this.player.auras.curseOfTheElements && this.player.auras.curseOfTheElements.active && this.player.auras.curseOfTheElements.durationRemaining < time) time = this.player.auras.curseOfTheElements.durationRemaining;
		if (this.player.auras.curseOfRecklessness && this.player.auras.curseOfRecklessness.active && this.player.auras.curseOfRecklessness.durationRemaining < time) time = this.player.auras.curseOfRecklessness.durationRemaining;
		if (this.player.auras.curseOfDoom) {
			if (this.player.auras.curseOfDoom.active && this.player.auras.curseOfDoom.durationRemaining < time) time = this.player.auras.curseOfDoom.durationRemaining; 
			if (this.player.spells.curseOfDoom.cooldownRemaining > 0 && this.player.spells.curseOfDoom.cooldownRemaining < time) time = this.player.spells.curseOfDoom.cooldownRemaining;
		}
		if (this.player.auras.shadowTrance && this.player.auras.shadowTrance.active && this.player.auras.shadowTrance.durationRemaining < time) time = this.player.auras.shadowTrance.durationRemaining;
		if (this.player.auras.shadowFlameshadow && this.player.auras.shadowFlameshadow.active && this.player.auras.shadowFlameshadow.durationRemaining < time) time = this.player.auras.shadowFlameshadow.durationRemaining;
		if (this.player.auras.shadowFlamefire && this.player.auras.shadowFlamefire.active && this.player.auras.shadowFlamefire.durationRemaining < time) time = this.player.auras.shadowFlamefire.durationRemaining;
		if (this.player.auras.spellstrikeProc && this.player.auras.spellstrikeProc.active && this.player.auras.spellstrikeProc.durationRemaining < time) time = this.player.auras.spellstrikeProc.durationRemaining;
		if (this.player.auras.powerInfusion && this.player.auras.powerInfusion.cooldownRemaining > 0 && this.player.auras.powerInfusion.cooldownRemaining < time) time = this.player.auras.powerInfusion.cooldownRemaining;
		if (this.player.auras.powerInfusion && this.player.auras.powerInfusion.active && this.player.auras.powerInfusion.durationRemaining < time) time = this.player.auras.powerInfusion.durationRemaining;
		if (this.player.auras.eyeOfMagtheridon && this.player.auras.eyeOfMagtheridon.active && this.player.auras.eyeOfMagtheridon.durationRemaining < time) time = this.player.auras.eyeOfMagtheridon.durationRemaining;
		if (this.player.auras.sextantOfUnstableCurrents) {
			if (this.player.auras.sextantOfUnstableCurrents.active && this.player.auras.sextantOfUnstableCurrents.durationRemaining < time) time = this.player.auras.sextantOfUnstableCurrents.durationRemaining;	
			if (this.player.auras.sextantOfUnstableCurrents.hiddenCooldownRemaining > 0 && this.player.auras.sextantOfUnstableCurrents.hiddenCooldownRemaining < time) time = this.player.auras.sextantOfUnstableCurrents.hiddenCooldownRemaining;
		}
		if (this.player.auras.quagmirransEye) {
			if (this.player.auras.quagmirransEye.active && this.player.auras.quagmirransEye.durationRemaining < time) time = this.player.auras.quagmirransEye.durationRemaining;
			if (this.player.auras.quagmirransEye.hiddenCooldownRemaining > 0 && this.player.auras.quagmirransEye.hiddenCooldownRemaining < time) time = this.player.auras.quagmirransEye.hiddenCooldownRemaining;
		}
		if (this.player.auras.shiffarsNexusHorn) {
			if (this.player.auras.shiffarsNexusHorn.active && this.player.auras.shiffarsNexusHorn.durationRemaining < time) time = this.player.auras.shiffarsNexusHorn.durationRemaining;
			if (this.player.auras.shiffarsNexusHorn.hiddenCooldownRemaining > 0 && this.player.auras.shiffarsNexusHorn.hiddenCooldownRemaining < time) time = this.player.auras.shiffarsNexusHorn.hiddenCooldownRemaining;
		}
		if (this.player.auras.manaEtched4Set && this.player.auras.manaEtched4Set.active && this.player.auras.manaEtched4Set.durationRemaining < time) time = this.player.auras.manaEtched4Set.durationRemaining;
	
		if (this.player.mp5Timer < time) time = this.player.mp5Timer;
		for (let i = 0; i < 2; i++) {
			if (this.player.trinkets[i]) {
				if (this.player.trinkets[i].active && this.player.trinkets[i].durationRemaining < time) time = this.player.trinkets[i].durationRemaining;
				if (this.player.trinkets[i].cooldownRemaining > 0 && this.player.trinkets[i].cooldownRemaining < time) time = this.player.trinkets[i].cooldownRemaining;
			}
		}

		// Pass time
		// This needs to be the first modified value since the time in combat needs to be updated before spells start dealing damage/auras expiring etc. for the combat logging.
		this.player.fightTime += time;
		this.player.castTimeRemaining = Math.max(0,this.player.castTimeRemaining - time);

		// Pet
		if (this.player.pet) this.player.pet.tick(time);

		// Spells
		if (this.player.spells.shadowBolt && this.player.spells.shadowBolt.casting) this.player.spells.shadowBolt.tick(time);
		if (this.player.spells.incinerate && this.player.spells.incinerate.casting) this.player.spells.incinerate.tick(time);
		if (this.player.spells.searingPain && this.player.spells.searingPain.casting) this.player.spells.searingPain.tick(time);
		if (this.player.spells.immolate && this.player.spells.immolate.casting) this.player.spells.immolate.tick(time);
		if (this.player.spells.corruption && this.player.spells.corruption.casting) this.player.spells.corruption.tick(time);
		if (this.player.spells.unstableAffliction && this.player.spells.unstableAffliction.casting) this.player.spells.unstableAffliction.tick(time);
		if (this.player.spells.curseOfDoom && this.player.spells.curseOfDoom.cooldownRemaining > 0) this.player.spells.curseOfDoom.tick(time);
		if (this.player.spells.deathCoil && this.player.spells.deathCoil.cooldownRemaining > 0) this.player.spells.deathCoil.tick(time);
		if (this.player.spells.shadowburn && this.player.spells.shadowburn.cooldownRemaining > 0) this.player.spells.shadowburn.tick(time);

		// Auras
		if (this.player.auras.powerInfusion) this.player.auras.powerInfusion.tick(time);
		if (this.player.auras.improvedShadowBolt && this.player.auras.improvedShadowBolt.active) this.player.auras.improvedShadowBolt.tick(time);
		if (this.player.auras.corruption && this.player.auras.corruption.active) this.player.auras.corruption.tick(time);
		if (this.player.auras.unstableAffliction && this.player.auras.unstableAffliction.active) this.player.auras.unstableAffliction.tick(time);
		if (this.player.auras.siphonLife && this.player.auras.siphonLife.active) this.player.auras.siphonLife.tick(time);
		if (this.player.auras.immolate && this.player.auras.immolate.active) this.player.auras.immolate.tick(time);
		if (this.player.auras.curseOfAgony && this.player.auras.curseOfAgony.active) this.player.auras.curseOfAgony.tick(time);
		if (this.player.auras.curseOfTheElements && this.player.auras.curseOfTheElements.active) this.player.auras.curseOfTheElements.tick(time);
		if (this.player.auras.curseOfRecklessness && this.player.auras.curseOfRecklessness.active) this.player.auras.curseOfRecklessness.tick(time);
		if (this.player.auras.curseOfDoom && (this.player.auras.curseOfDoom.active || this.player.auras.curseOfDoom.cooldownRemaining > 0)) this.player.auras.curseOfDoom.tick(time);
		if (this.player.auras.shadowFlameshadow && this.player.auras.shadowFlameshadow.active) this.player.auras.shadowFlameshadow.tick(time);
		if (this.player.auras.shadowFlamefire && this.player.auras.shadowFlamefire.active) this.player.auras.shadowFlamefire.tick(time);
		if (this.player.auras.spellstrikeProc && this.player.auras.spellstrikeProc.active) this.player.auras.spellstrikeProc.tick(time);
		if (this.player.auras.eyeOfMagtheridon && this.player.auras.eyeOfMagtheridon.active) this.player.auras.eyeOfMagtheridon.tick(time);
		if (this.player.auras.sextantOfUnstableCurrents && (this.player.auras.sextantOfUnstableCurrents.active || this.player.auras.sextantOfUnstableCurrents.hiddenCooldownRemaining > 0)) this.player.auras.sextantOfUnstableCurrents.tick(time);
		if (this.player.auras.quagmirransEye && (this.player.auras.quagmirransEye.active || this.player.auras.quagmirransEye.hiddenCooldownRemaining > 0)) this.player.auras.quagmirransEye.tick(time);
		if (this.player.auras.shiffarsNexusHorn && (this.player.auras.shiffarsNexusHorn.active || this.player.auras.shiffarsNexusHorn.hiddenCooldownRemaining > 0)) this.player.auras.shiffarsNexusHorn.tick(time);
		if (this.player.auras.manaEtched4Set && this.player.auras.manaEtched4Set.active) this.player.auras.manaEtched4Set.tick(time);

		// Trinkets
		if (this.player.trinkets[0]) this.player.trinkets[0].tick(time);
		if (this.player.trinkets[1]) this.player.trinkets[1].tick(time);
		
		this.player.gcdRemaining = Math.max(0,this.player.gcdRemaining - time);
		this.player.mp5Timer = Math.max(0,this.player.mp5Timer - time);
		if (this.player.mp5Timer == 0) {
			this.player.mp5Timer = 5;
			if (this.player.stats.mp5 > 0) {
				this.player.mana = Math.min(this.player.stats.maxMana, this.player.mana + this.player.stats.mp5);
				this.player.combatLog("Player gains " + Math.round(this.player.stats.mp5) + " mana from MP5. Player mana: " + Math.round(this.player.mana) + "/" + Math.round(this.player.stats.maxMana));
			}
			if (this.player.pet && this.player.pet.stats.mp5 > 0) {
				this.player.pet.stats.mana = Math.min(this.player.pet.stats.maxMana, this.player.pet.stats.mana + this.player.pet.stats.mp5);
				this.player.combatLog(this.player.pet.name + " gains " + this.player.pet.stats.mp5 + " mana from MP5. Pet mana: " + Math.round(this.player.pet.stats.mana) + "/" + Math.round(this.player.pet.stats.maxMana));
			}
		}

		return time;
	}

	start() {
		let totalDamage = 0;
		let totalDuration = 0;
		let minDps = 9999;
		let maxDps = 0;
		let startTime = performance.now();
		this.player.initialize();
		this.timeTotal = 0; // Used for benchmarking

		for(this.player.iteration = 1; this.player.iteration <= this.iterations; this.player.iteration++) {
			// Reset/initialize values for spells that have a cooldown or a cast time
			if (this.player.spells.shadowBolt) this.player.spells.shadowBolt.reset();
			if (this.player.spells.incinerate) this.player.spells.incinerate.reset();
			if (this.player.spells.searingPain) this.player.spells.searingPain.reset();
			if (this.player.spells.corruption) this.player.spells.corruption.reset();
			if (this.player.spells.unstableAffliction) this.player.spells.unstableAffliction.reset();
			if (this.player.spells.immolate) this.player.spells.immolate.reset();
			if (this.player.spells.curseOfDoom) this.player.spells.curseOfDoom.reset();
			if (this.player.spells.shadowburn) this.player.spells.shadowburn.reset();
			if (this.player.spells.deathCoil) this.player.spells.deathCoil.reset();
			if (this.player.auras.powerInfusion) this.player.auras.powerInfusion.reset();
			this.player.reset(); // Resets mana, global cooldown etc.
			if (this.player.pet) this.player.pet.reset();

			this.player.iterationDamage = 0;
			this.player.fightTime = 0;
			let fightLength = random(this.minTime, this.maxTime);
			this.player.combatLog("Fight length: " + fightLength + " seconds");

			while(this.player.fightTime < fightLength) {
				// Pet
				if (this.player.pet && this.player.pet.mode == PetMode.AGGRESSIVE) {
					if (this.player.pet.type == PetType.MELEE) {
						if (this.player.pet.spells.melee.ready()) {
							this.player.pet.cast("melee");
						}
						if (this.player.pet.spells.cleave && this.player.pet.spells.cleave.ready()) {
							this.player.pet.cast("cleave");
						}
						if (this.player.pet.spells.lashOfPain && this.player.pet.spells.lashOfPain.ready() && (!this.player.auras.improvedShadowBolt || this.player.simSettings.lashOfPainUsage === 'onCooldown' || (this.player.simSettings.lashOfPainUsage == 'noISB' && !this.player.auras.improvedShadowBolt.active))) {
							this.player.pet.cast("lashOfPain");
						}
					} else if (this.player.pet.type == PetType.RANGED) {

					}
				}

				// Player
				if (this.player.castTimeRemaining <= 0) {
					// Spells on the global cooldown
					if (this.player.gcdRemaining <= 0) {
						let timeRemaining = fightLength - this.player.fightTime;
						// Not enough time left to cast another filler spell.
						if ((this.player.rotation.finisher.deathCoil || this.player.rotation.finisher.shadowburn) && timeRemaining <= (this.player.spells[this.player.filler].castTime + this.player.spells[this.player.filler].travelTime)) {
							this.player.useCooldownsIfAvailable();
							// Cast Death Coil if there's time to cast both Death Coil and Shadowburn (need to cast Death Coil first because of the travel time). Otherwise only cast Shadowburn
							if (this.player.rotation.finisher.deathCoil && this.player.spells.deathCoil.ready() && (timeRemaining - this.player.gcdValue > this.player.spells.deathCoil.travelTime)) {
								this.player.cast("deathCoil");
							} else if (this.player.rotation.finisher.shadowburn && this.player.spells.shadowburn.ready()) {
								this.player.cast("shadowburn");
							} else {
								this.player.cast('lifeTap');
							}
						} else {
							// Checks if a curse if assigned and if the curse is not up.
							// If the curse is not up, it checks if the curse is Curse of Doom. If the curse if Curse of Doom then it checks if Curse of Agony is not up as well (used when there's <60sec left of the fight).
							// If the curse is not Curse of Doom or the curse is Curse of Doom *and* both CoD and CoA are down (and if there's enough time left for them to do enough damage to warrant casting them) then it casts the curse.
							if (this.player.curse && !this.player.auras[this.player.curse].active && (this.player.curse !== "curseOfDoom" || (this.player.curse == "curseOfDoom" && !this.player.auras.curseOfAgony.active && (timeRemaining > 60 || timeRemaining >= this.player.auras.curseOfAgony.minimumDuration)))) {
								if (this.player.curse !== "curseOfDoom" || (this.player.curse == "curseOfDoom" && timeRemaining > 60 && this.player.spells.curseOfDoom.ready())) {
									this.player.cast(this.player.curse);
								} else if (timeRemaining >= this.player.auras.curseOfAgony.minimumDuration) {
									this.player.cast("curseOfAgony");
								}
							} else {
								if (this.player.rotation.curse.curseOfAgony && !this.player.auras.curseOfAgony.active && this.player.spells.curseOfAgony.ready() && timeRemaining >= this.player.auras.curseOfAgony.minimumDuration) {
									this.player.cast("curseOfAgony");
								} else if (this.player.rotation.dot.unstableAffliction && !this.player.auras.unstableAffliction.active && this.player.spells.unstableAffliction.ready() && (timeRemaining - this.player.spells.unstableAffliction.castTime) >= this.player.auras.unstableAffliction.minimumDuration) {
									this.player.cast("unstableAffliction");
								} else if (this.player.rotation.dot.siphonLife && !this.player.auras.siphonLife.active && this.player.spells.siphonLife.ready()  && timeRemaining >= this.player.auras.siphonLife.minimumDuration) {
									this.player.cast("siphonLife");
								} else if (this.player.rotation.dot.corruption && !this.player.auras.corruption.active && this.player.spells.corruption.ready() && (timeRemaining - this.player.spells.corruption.castTime) >= this.player.auras.corruption.minimumDuration) {
									this.player.cast("corruption");
								} else if (this.player.rotation.dot.immolate && !this.player.auras.immolate.active && this.player.spells.immolate.ready()  && (timeRemaining - this.player.spells.immolate.castTime) >= this.player.auras.immolate.minimumDuration) {
									this.player.cast("immolate");
								} else if (this.player.spells[this.player.filler].ready()) {
									this.player.useCooldownsIfAvailable();
									this.player.cast(this.player.filler);
								} else {
									this.player.cast("lifeTap");
								}
							}
						}
					}
				}

				// If passTime() returns 0 then the simulation somehow got stuck in an endless loop. This should never happen, so the best solution is to fix the reason it returned 0 rather than setting a minimum value for it to return.
				if (this.passTime() == 0) {
					throw "Simulation got stuck in an endless loop. If you'd like to help with fixing this bug then mention which spells you had selected and which trinkets you had selected";
				}
			}

			totalDuration += fightLength;
			totalDamage += this.player.iterationDamage;

			let iterationDps = this.player.iterationDamage / fightLength;
			if (iterationDps > maxDps) maxDps = iterationDps;
			else if (iterationDps < minDps) minDps = iterationDps;

			// Send an update to the sim worker for every 1% of progress
			if (this.player.iteration % ~~(this.iterations / 100) == 0) {
				this.simulationUpdate({
					"averageDamage": Math.round((totalDamage / totalDuration) * 100) / 100,
					"percent": Math.round((this.player.iteration / this.iterations) * 100),
					"itemID": this.player.itemID
				});
			}

			// Reset/end all active auras and spell cooldowns
			if (this.player.auras.powerInfusion) this.player.auras.powerInfusion.fade(true);
			if (this.player.auras.improvedShadowBolt && this.player.auras.improvedShadowBolt.active) this.player.auras.improvedShadowBolt.fade(true);
			if (this.player.auras.corruption && this.player.auras.corruption.active) this.player.auras.corruption.fade(true);
			if (this.player.auras.unstableAffliction && this.player.auras.unstableAffliction.active) this.player.auras.unstableAffliction.fade(true);
			if (this.player.auras.siphonLife && this.player.auras.siphonLife.active) this.player.auras.siphonLife.fade(true);
			if (this.player.auras.immolate && this.player.auras.immolate.active) this.player.auras.immolate.fade(true);
			if (this.player.auras.curseOfAgony && this.player.auras.curseOfAgony.active) this.player.auras.curseOfAgony.fade(true);
			if (this.player.auras.curseOfTheElements && this.player.auras.curseOfTheElements.active) this.player.auras.curseOfTheElements.fade(true);
			if (this.player.auras.curseOfRecklessness && this.player.auras.curseOfRecklessness.active) this.player.auras.curseOfRecklessness.fade(true);
			if (this.player.auras.curseOfDoom && this.player.auras.curseOfDoom.active) this.player.auras.curseOfDoom.fade(true);
			if (this.player.auras.shadowFlameshadow && this.player.auras.shadowFlameshadow.active) this.player.auras.shadowFlameshadow.fade(true);
			if (this.player.auras.shadowFlamefire && this.player.auras.shadowFlamefire.active) this.player.auras.shadowFlamefire.fade(true);
			if (this.player.auras.spellstrikeProc && this.player.auras.spellstrikeProc.active) this.player.auras.spellstrikeProc.fade(true);
			if (this.player.auras.eyeOfMagtheridon && this.player.auras.eyeOfMagtheridon.active) this.player.auras.eyeOfMagtheridon.fade(true);
			if (this.player.auras.sextantOfUnstableCurrents && this.player.auras.sextantOfUnstableCurrents.active) this.player.auras.sextantOfUnstableCurrents.fade(true);
			if (this.player.auras.quagmirransEye && this.player.auras.quagmirransEye.active) this.player.auras.quagmirransEye.fade(true);
			if (this.player.auras.shiffarsNexusHorn && this.player.auras.shiffarsNexusHorn.active) this.player.auras.shiffarsNexusHorn.fade(true);
			if (this.player.auras.manaEtched4Set && this.player.auras.manaEtched4Set.active) this.player.auras.manaEtched4Set.fade(true);
			for (let i = 0; i < 2; i++) {
				if (this.player.trinkets[i]) {
					this.player.trinkets[i].fade(true);
					this.player.trinkets[i].reset();
				}
			}
		}
		if (this.timeTotal > 0) console.log(this.timeTotal);
		if (this.player.pet) console.log(JSON.stringify(this.player.pet.damageBreakdown));

		this.simulationEnd({
			"minDps": Math.round(minDps * 100) / 100,
			"maxDps": Math.round(maxDps * 100) / 100,
			"length": (performance.now() - startTime) / 1000,
			"damageBreakdown": this.player.damageBreakdown,
			"combatlog": this.player.combatlog,
			"iterations": this.iterations,
			"totalDamage": totalDamage,
			"totalDuration": totalDuration,
			"itemID": this.player.itemID
		});
	}
}