addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "W", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "Green",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "workers", // Name of prestige currency
    baseResource: "pizzas", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
            name: "Upgrade 1",
            title: "Oven",
            description: "Bake twice as many pizzas per second",
            cost: new Decimal(1),
        },
        12: {
            name: "Upgrade 2",
            title: "Extra cheese",
            description: "The most basic of toppings.  Workers boost pizza production",
            cost: new Decimal(5),
            effect() {
                return player[this.layer].points.add(1).pow(0.75)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, //add formatting to the effect
        },
        13: {
            name: "Upgrade 3",
            title: "Newspaper Ad",
            description: "Word is spreading fast! Pizza slightly boosts worker gain",
            cost: new Decimal(10),
            effect() {
                return player.points.add(1).pow(0.25)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, //add formatting to the effect
        },
        14: {
            name: "Upgrade 4",
            title: "Sausage",
            description: "Ovens are twice as effective",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, //add formatting to the effect
        },
        15: {
            name: "Upgrade 5",
            title: "Meat Lovers",
            description: "Double the output of ovens once more",
            cost: new Decimal(100),
            effect() {
                return player.points.add(1).pow(0.15)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, //add formatting to the effect
        },
    }

})
