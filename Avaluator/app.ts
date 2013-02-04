module Avaluator {
    export class Question {
        constructor(public text: string, public details: string, public checked: bool) {
        }
    }

    export class Evaluation {
        constructor(public name: string, public description: string) { }
    }

    export class NotRecommended extends Evaluation {
        constructor() { super("NotRecommended", "Not Recommended"); }
    }

    export class ExtraCaution extends Evaluation {
        constructor() { super("ExtraCaution", "Extra Caution"); }
    }

    export class Caution extends Evaluation {
        constructor() { super("Caution", "Caution"); }
    }

    export class SlopeEvaluation {
        private evaluation: Avaluator.Evaluation[][];
        private avalancheConditionsScore: number = 0;
        private terrainCharacteristicsScore: number = 0;

        public avalancheConditions: Avaluator.Question[];
        public terrainCharacteristics: Avaluator.Question[];

        constructor() {
            console.log("starting constructor");
            this.avalancheConditions = [
                new Question("Regional Danger Rating", "Is the avalanche danger rating \"Considerable\" or higher?", false),
                new Question("Persistent Avalanche Problem", "Is there a persistent or deep persistent slab problem in the snowpack?", false),
                new Question("Slab Avalanches", "Are there signs of slab avalances in the area from today or yesterday?", false),
                new Question("Signs of Instability", "Are there signs of snowpack instability including whumpfs, shooting cracks or drum-like sounds?", false),
                new Question("Recent Loading", "Has there been loading within the past 48 hours including roughly 30 cm of new snow or more, significant wind transport or rain?", false),
                new Question("Critical Warming", "Has there been a recent rapid rise in temperature to near 0 C, or is the upper snowpack wet due to strong sun, above-freezing air temperatures or rain?", false)
            ];

            this.terrainCharacteristics = [
                new Question("Slope Steepness", "Is the slope steeper than 30 degrees?", false),
                new Question("Slope Steepness", "Is the slope steeper than 35 degrees?", false),
                new Question("Terrain Traps", "Are there gullies, trees or cliffs that increase the consequences of being caught in an avalanche?", false),
                new Question("Slope Shape", "Is the slope convex or unsupported?", false),
                new Question("Forest Density", "Is the slope in the alpine, in a sparsely treed area or in open forest[cut-block, burn, wide-spaced glades]?", false)
            ];

            this.evaluation = [
                [new Caution(), new Caution(), new Caution(), new Caution(), new Caution(), new ExtraCaution()],
                [new Caution(), new Caution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution()],
                [new Caution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new NotRecommended()],
                [new Caution(), new ExtraCaution(), new ExtraCaution(), new ExtraCaution(), new NotRecommended(), new NotRecommended()],
                [new Caution(), new ExtraCaution(), new ExtraCaution(), new NotRecommended(), new NotRecommended(), new NotRecommended()],
                [new ExtraCaution(), new ExtraCaution(), new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended()],
                [new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended(), new NotRecommended()]
            ];
            console.log("finished constructor");
        }

        evaluate() {
            for (var count = 0; count < this.avalancheConditions.length; count++) {
                if (this.avalancheConditions[count].checked) {
                    this.avalancheConditionsScore++;
                }
            }

            for (var count = 0; count < this.terrainCharacteristics.length; count++) {
                if (this.terrainCharacteristics[count].checked) {
                    this.terrainCharacteristicsScore++;
                }
            }

            return this.evaluation[this.avalancheConditionsScore][this.terrainCharacteristicsScore];
        }
    }
}

window.onload = () => {
    console.log("start");
    var el = document.getElementById('content');
    var slopeEvaluation = new Avaluator.SlopeEvaluation();

    console.log(slopeEvaluation.evaluate().description);
};