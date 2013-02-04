var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Avaluator;
(function (Avaluator) {
    var Question = (function () {
        function Question(text, details, checked) {
            this.text = text;
            this.details = details;
            this.checked = checked;
        }
        return Question;
    })();
    Avaluator.Question = Question;    
    var Evaluation = (function () {
        function Evaluation(name, description) {
            this.name = name;
            this.description = description;
        }
        return Evaluation;
    })();
    Avaluator.Evaluation = Evaluation;    
    var NotRecommended = (function (_super) {
        __extends(NotRecommended, _super);
        function NotRecommended() {
                _super.call(this, "NotRecommended", "Not Recommended");
        }
        return NotRecommended;
    })(Evaluation);
    Avaluator.NotRecommended = NotRecommended;    
    var ExtraCaution = (function (_super) {
        __extends(ExtraCaution, _super);
        function ExtraCaution() {
                _super.call(this, "ExtraCaution", "Extra Caution");
        }
        return ExtraCaution;
    })(Evaluation);
    Avaluator.ExtraCaution = ExtraCaution;    
    var Caution = (function (_super) {
        __extends(Caution, _super);
        function Caution() {
                _super.call(this, "Caution", "Caution");
        }
        return Caution;
    })(Evaluation);
    Avaluator.Caution = Caution;    
    var SlopeEvaluation = (function () {
        function SlopeEvaluation() {
            this.avalancheConditionsScore = 0;
            this.terrainCharacteristicsScore = 0;
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
                [
                    new Caution(), 
                    new Caution(), 
                    new Caution(), 
                    new Caution(), 
                    new Caution(), 
                    new ExtraCaution()
                ], 
                [
                    new Caution(), 
                    new Caution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new ExtraCaution()
                ], 
                [
                    new Caution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new NotRecommended()
                ], 
                [
                    new Caution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new NotRecommended(), 
                    new NotRecommended()
                ], 
                [
                    new Caution(), 
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended()
                ], 
                [
                    new ExtraCaution(), 
                    new ExtraCaution(), 
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended()
                ], 
                [
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended(), 
                    new NotRecommended()
                ]
            ];
            console.log("finished constructor");
        }
        SlopeEvaluation.prototype.evaluate = function () {
            for(var count = 0; count < this.avalancheConditions.length; count++) {
                if(this.avalancheConditions[count].checked) {
                    this.avalancheConditionsScore++;
                }
            }
            for(var count = 0; count < this.terrainCharacteristics.length; count++) {
                if(this.terrainCharacteristics[count].checked) {
                    this.terrainCharacteristicsScore++;
                }
            }
            return this.evaluation[this.avalancheConditionsScore][this.terrainCharacteristicsScore];
        };
        return SlopeEvaluation;
    })();
    Avaluator.SlopeEvaluation = SlopeEvaluation;    
})(Avaluator || (Avaluator = {}));
//@ sourceMappingURL=app.js.map
