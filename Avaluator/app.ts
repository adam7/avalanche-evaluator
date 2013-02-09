/// <reference path="knockout.d.ts" />

module Avaluator {
    export class Question {
        constructor(public text: string, public details: string, public checked: KnockoutObservableBool) {
        }
    }

    export class Evaluation {
        constructor(public colour: string, public description: string) { }
    }

    export class NotRecommended extends Evaluation {
        constructor() { super("red", "Not Recommended"); }
    }

    export class ExtraCaution extends Evaluation {
        constructor() { super("yellow", "Extra Caution"); }
    }

    export class Caution extends Evaluation {
        constructor() { super("green", "Caution"); }
    }

    export class SlopeEvaluation {
        private slopeEvaluation: Avaluator.Evaluation[][];

        public avalancheConditions: KnockoutObservableArray;
        public terrainCharacteristics: KnockoutObservableArray;

        public result: KnockoutComputed;

        constructor() {
            var self = this;

            this.avalancheConditions = ko.observableArray([
                new Question("Regional Danger Rating", "Is the avalanche danger rating \"Considerable\" or higher?", ko.observable(false)),
                new Question("Persistent Avalanche Problem", "Is there a persistent or deep persistent slab problem in the snowpack?", ko.observable(false)),
                new Question("Slab Avalanches", "Are there signs of slab avalances in the area from today or yesterday?", ko.observable(false)),
                new Question("Signs of Instability", "Are there signs of snowpack instability including whumpfs, shooting cracks or drum-like sounds?", ko.observable(false)),
                new Question("Recent Loading", "Has there been loading within the past 48 hours including roughly 30 cm of new snow or more, significant wind transport or rain?", ko.observable(false)),
                new Question("Critical Warming", "Has there been a recent rapid rise in temperature to near 0 C, or is the upper snowpack wet due to strong sun, above-freezing air temperatures or rain?", ko.observable(false))
            ]);

            this.terrainCharacteristics = ko.observableArray([
                new Question("Slope Steepness", "Is the slope steeper than 30 degrees?", ko.observable(false)),
                new Question("Slope Steepness", "Is the slope steeper than 35 degrees?", ko.observable(false)),
                new Question("Terrain Traps", "Are there gullies, trees or cliffs that increase the consequences of being caught in an avalanche?", ko.observable(false)),
                new Question("Slope Shape", "Is the slope convex or unsupported?", ko.observable(false)),
                new Question("Forest Density", "Is the slope in the alpine, in a sparsely treed area or in open forest[cut-block, burn, wide-spaced glades]?", ko.observable(false))
            ]);

            this.slopeEvaluation = [
                [new Caution(), new Caution(), new Caution(), new Caution(), new Caution(), new ExtraCaution()],
                [new Caution(), new Caution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution()],
                [new Caution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new NotRecommended()],
                [new Caution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new NotRecommended(), new NotRecommended()],
                [new Caution(), new ExtraCaution(), new ExtraCaution(), new NotRecommended(), new NotRecommended(), new NotRecommended()],
                [new ExtraCaution(), new ExtraCaution(), new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended()],
                [new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended()]
            ];

            this.result = ko.computed(function () {
                return self.evaluate();
            });

            // Wire up the avalancheConditions checked properties
            ko.utils.arrayForEach(this.avalancheConditions(), function (condition : Question) {
                condition.checked.subscribe(function (checked) {});
            });

            // Wire up the terrainCharacteristics checked properties
            ko.utils.arrayForEach(this.terrainCharacteristics(), function (condition : Question) {
                condition.checked.subscribe(function (checked) 
                {
                    // TODO: Make sure that if "Is the slope steeper than 35 degrees?" is true then "Is the slope steeper than 30 degrees?" is also true                    
                    if (condition.text === self.terrainCharacteristics()[1].text && !self.terrainCharacteristics()[0].checked()) {
                        self.terrainCharacteristics()[0].checked(true);
                    };
                }, this);
            });
        }

        thing() {
        }

        evaluate() {
            var avalancheConditionsScore: number = 0;
            var terrainCharacteristicsScore: number = 0;

            ko.utils.arrayForEach(this.avalancheConditions(), function (condition) {
                if (condition.checked()) {
                    avalancheConditionsScore++;
                }
            });

            ko.utils.arrayForEach(this.terrainCharacteristics(), function (terrain) {
                if (terrain.checked()) {
                    terrainCharacteristicsScore++;
                }
            });

            return this.slopeEvaluation[avalancheConditionsScore][terrainCharacteristicsScore];
        }
    }
}
