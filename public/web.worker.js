importScripts("./WarlockSim.js");

onmessage = (event) => {
  fetch('./WarlockSim.wasm')
  .then(response => response.arrayBuffer())
  .then(binary => WarlockSim({ wasmBinary: binary }))
  .then(w => w.ready)
  .then(module => {
    const player = event.data.playerSettings;
    const simulation = event.data.simulationSettings;
    console.log(0);
    const randomSeedsPtr = 0; //module.allocRandomSeeds(simulation.iterations);
    console.log(1);
    const itemsPtr = module.allocItems(player.items.head || 0, player.items.neck || 0, player.items.shoulders || 0, player.items.back || 0, player.items.chest || 0, player.items.bracer || 0, player.items.gloves || 0, player.items.belt || 0, player.items.legs || 0, player.items.boots || 0, player.items.ring1 || 0, player.items.ring2 || 0, player.items.trinket1 || 0, player.items.trinket2 || 0, player.items.mainhand || 0, player.items.offhand || 0, player.items.twohand || 0, player.items.wand || 0);
    console.log(2);
    const aurasPtr = module.allocAuras(player.auras.felArmor, player.auras.blessingOfKings, player.auras.blessingOfWisdom, player.auras.judgementOfWisdom, player.auras.manaSpringTotem, player.auras.wrathOfAirTotem, player.auras.totemOfWrath, player.auras.markOfTheWild, player.auras.arcaneIntellect, player.auras.prayerOfFortitude, player.auras.prayerOfSpirit, player.auras.bloodPact, player.auras.inspiringPresence, player.auras.moonkinAura, player.auras.powerInfusion, player.auras.powerOfTheGuardianWarlock, player.auras.powerOfTheGuardianMage, player.auras.eyeOfTheNight, player.auras.chainOfTheTwilightOwl, player.auras.jadePendantOfBlasting, player.auras.idolOfTheRavenGoddess, player.auras.drumsOfBattle, player.auras.drumsOfWar, player.auras.drumsOfRestoration, player.auras.bloodlust, player.auras.ferociousInspiration, player.auras.innervate, player.auras.curseOfTheElements, player.auras.shadowWeaving, player.auras.improvedScorch, player.auras.misery, player.auras.judgementOfTheCrusader, player.auras.vampiricTouch, player.auras.faerieFire, player.auras.sunderArmor, player.auras.exposeArmor, player.auras.curseOfRecklessness, player.auras.bloodFrenzy, player.auras.exposeWeakness, player.auras.annihilator, player.auras.improvedHuntersMark, player.auras.flaskOfPureDeath, player.auras.elixirOfMajorShadowPower, player.auras.elixirOfMajorFirepower, player.auras.greaterArcaneElixir, player.auras.adeptsElixir, player.auras.elixirOfDraenicWisdom, player.auras.elixirOfMajorMageblood, player.auras.superManaPotion, player.auras.destructionPotion, player.auras.brilliantWizardOil, player.auras.superiorWizardOil, player.auras.blessedWizardOil, player.auras.demonicRune, player.auras.flameCap, player.auras.rumseyRumBlackLabel, player.auras.kreegsStoutBeatdown, player.auras.blackenedBasilisk, player.auras.skullfishSoup, player.auras.veryBerryCream, player.auras.midsummerSausage, player.auras.bloodthistle, player.auras.blessingOfKingsPet, player.auras.blessingOfWisdomPet, player.auras.blessingOfMight, player.auras.arcaneIntellectPet, player.auras.markOfTheWildPet, player.auras.prayerOfFortitudePet, player.auras.prayerOfSpiritPet, player.auras.kiblersBits, player.auras.heroicPresence, player.auras.strengthOfEarthTotem, player.auras.graceOfAirTotem, player.auras.battleShout, player.auras.trueshotAura, player.auras.leaderOfThePack, player.auras.unleashedRage, player.auras.scrollOfStaminaV, player.auras.scrollOfIntellectV, player.auras.scrollOfStrengthV, player.auras.scrollOfAgilityV, player.auras.scrollOfSpiritV);
    console.log(3);
    const talentsPtr = module.allocTalents(player.talents.suppression, player.talents.improvedCorruption, player.talents.improvedLifeTap, player.talents.improvedCurseOfAgony, player.talents.amplifyCurse, player.talents.nightfall, player.talents.empoweredCorruption, player.talents.siphonLife, player.talents.shadowMastery, player.talents.contagion, player.talents.darkPact, player.talents.unstableAffliction, player.talents.improvedImp, player.talents.demonicEmbrace, player.talents.felIntellect, player.talents.felStamina, player.talents.improvedSuccubus, player.talents.demonicAegis, player.talents.unholyPower, player.talents.demonicSacrifice, player.talents.manaFeed, player.talents.masterDemonologist, player.talents.soulLink, player.talents.demonicKnowledge, player.talents.demonicTactics, player.talents.summonFelguard, player.talents.improvedShadowBolt, player.talents.cataclysm, player.talents.bane, player.talents.improvedFirebolt, player.talents.improvedLashOfPain, player.talents.devastation, player.talents.shadowburn, player.talents.improvedSearingPain, player.talents.improvedImmolate, player.talents.ruin, player.talents.emberstorm, player.talents.backlash, player.talents.conflagrate, player.talents.shadowAndFlame, player.talents.shadowfury);
    console.log(4);
    const setsPtr = module.allocSets(player.sets['529'], player.sets['552'], player.sets['553'], player.sets['559'], player.sets['644'], player.sets['658'], player.sets['667'], player.sets['645'], player.sets['646'], player.sets['670']);
    console.log(5);
    const statsPtr = module.allocStats(player.stats.health, player.stats.mana, player.stats.stamina, player.stats.intellect, player.stats.spirit, player.stats.spellPower, player.stats.shadowPower, player.stats.firePower, player.stats.hasteRating, player.stats.hitRating, player.stats.critRating, player.stats.mp5, player.stats.spellPenetration, player.stats.fireModifier, player.stats.frostModifier, player.stats.shadowModifier, player.stats.staminaModifier, player.stats.intellectModifier, player.stats.spiritModifier, player.stats.arcaneModifier, player.stats.natureModifier, player.stats.natureResist, player.stats.arcaneResist, player.stats.fireResist, player.stats.frostResist, player.stats.shadowResist);
    console.log(6);
    const playerSettingsPtr = module.allocPlayerSettings(aurasPtr, talentsPtr, setsPtr, statsPtr, itemsPtr, event.data.itemId, event.data.playerSettings.metaGemId, event.data.equippedItemSimulation === true, player.simSettings["automatically-open-sim-details"] === "yes", event.data.customStat === "stamina", event.data.customStat === "intellect", event.data.customStat === "spirit", event.data.customStat === "spellPower", event.data.customStat === "shadowPower", event.data.customStat === "firePower", event.data.customStat === "hitRating", event.data.customStat === "critRating", event.data.customStat === "hasteRating", event.data.customStat === "mp5", player.simSettings.shattrathFaction === "Aldor", parseInt(player.simSettings['target-level']), parseInt(player.simSettings['target-shadow-resistance']), parseInt(player.simSettings['target-fire-resistance']), parseInt(player.simSettings.mageAtieshAmount), parseInt(player.simSettings.totemOfWrathAmount), player.simSettings.sacrificePet === "yes", player.simSettings.petChoice === "0", player.simSettings.petChoice === "2", player.simSettings.petChoice === "4", parseInt(player.simSettings.ferociousInspirationAmount), parseInt(player.simSettings.improvedCurseOfTheElements), player.simSettings.customIsbUptime === "yes", parseInt(player.simSettings.customIsbUptimeValue), parseInt(player.simSettings.improvedDivineSpirit), parseInt(player.simSettings.improvedImpSetting), parseInt(player.simSettings.shadowPriestDps), parseInt(player.simSettings.warlockAtieshAmount), parseInt(player.simSettings.improvedExposeArmor), !player.simSettings.fightType || player.simSettings.fightType === "singleTarget", parseInt(player.simSettings.enemyAmount), player.simSettings.race === "orc", parseInt(player.simSettings.powerInfusionAmount), parseInt(player.simSettings.bloodlustAmount), parseInt(player.simSettings.innervateAmount), parseInt(player.simSettings.enemyArmor), parseInt(player.simSettings.exposeWeaknessUptime), player.simSettings.improvedFaerieFire === "yes", player.simSettings.infinitePlayerMana === "yes", player.simSettings.infinitePetMana === "yes", player.simSettings.lashOfPainUsage === "onCooldown", player.simSettings.petMode === "1", player.simSettings.prepopBlackBook === "yes", player.simSettings.randomizeValues === "yes", player.simSettings.rotationOption === "simChooses", player.simSettings.shattrathFactionReputation === "yes", parseInt(player.simSettings.survivalHunterAgility), player.rotation.dot && player.rotation.dot.immolate, player.rotation.dot && player.rotation.dot.corruption, player.rotation.dot && player.rotation.dot.siphonLife, player.rotation.dot && player.rotation.dot.unstableAffliction, player.rotation.filler && player.rotation.filler.searingPain, player.rotation.filler && player.rotation.filler.shadowBolt, player.rotation.filler && player.rotation.filler.incinerate, player.rotation.curse && player.rotation.curse.curseOfRecklessness, player.rotation.curse && player.rotation.curse.curseOfTheElements, player.rotation.curse && player.rotation.curse.curseOfAgony, player.rotation.curse && player.rotation.curse.curseOfDoom, player.rotation.finisher && player.rotation.finisher.deathCoil, player.rotation.finisher && player.rotation.finisher.shadowburn, player.rotation.finisher && player.rotation.finisher.conflagrate, player.rotation.other && player.rotation.other.shadowfury, player.rotation.other && player.rotation.other.amplifyCurse, player.rotation.other && player.rotation.other.darkPact, player.simSettings.improvedWrathOfAirTotem === "yes");
    console.log(7);
    const playerPtr = module.allocPlayer(playerSettingsPtr);
    console.log(8);
    const simSettingsPtr = module.allocSimSettings(simulation.iterations, simulation.minTime, simulation.maxTime, randomSeedsPtr, event.data.simulationType);
    console.log(9);
    const simPtr = module.allocSim(playerPtr, simSettingsPtr);
    console.log(10);
    simPtr.start();
  })
  .catch(e => console.error(`${e.error}: ${e.message}`));
};