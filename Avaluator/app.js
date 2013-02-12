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
        function Evaluation(colour, description) {
            this.colour = colour;
            this.description = description;
        }
        return Evaluation;
    })();
    Avaluator.Evaluation = Evaluation;    
    var NotRecommended = (function (_super) {
        __extends(NotRecommended, _super);
        function NotRecommended() {
                _super.call(this, "red", "Not Recommended");
        }
        return NotRecommended;
    })(Evaluation);
    Avaluator.NotRecommended = NotRecommended;    
    var ExtraCaution = (function (_super) {
        __extends(ExtraCaution, _super);
        function ExtraCaution() {
                _super.call(this, "yellow", "Extra Caution");
        }
        return ExtraCaution;
    })(Evaluation);
    Avaluator.ExtraCaution = ExtraCaution;    
    var Caution = (function (_super) {
        __extends(Caution, _super);
        function Caution() {
                _super.call(this, "green", "Caution");
        }
        return Caution;
    })(Evaluation);
    Avaluator.Caution = Caution;    
    var SlopeEvaluation = (function () {
        function SlopeEvaluation() {
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
            this.result = ko.computed(function () {
                return self.evaluate();
            });
            ko.utils.arrayForEach(this.avalancheConditions(), function (condition) {
                condition.checked.subscribe(function (checked) {
                });
            });
            ko.utils.arrayForEach(this.terrainCharacteristics(), function (condition) {
                condition.checked.subscribe(function (checked) {
                    if(condition.checked() && condition.details === self.terrainCharacteristics()[1].details && !self.terrainCharacteristics()[0].checked()) {
                        self.terrainCharacteristics()[0].checked(true);
                    }
                    ; ;
                    if(!condition.checked() && condition.details === self.terrainCharacteristics()[0].details && self.terrainCharacteristics()[1].checked()) {
                        self.terrainCharacteristics()[1].checked(false);
                    }
                    ; ;
                }, this);
            });
        }
        SlopeEvaluation.prototype.thing = function () {
        };
        SlopeEvaluation.prototype.evaluate = function () {
            var avalancheConditionsScore = 0;
            var terrainCharacteristicsScore = 0;
            ko.utils.arrayForEach(this.avalancheConditions(), function (condition) {
                if(condition.checked()) {
                    avalancheConditionsScore++;
                }
            });
            ko.utils.arrayForEach(this.terrainCharacteristics(), function (terrain) {
                if(terrain.checked()) {
                    terrainCharacteristicsScore++;
                }
            });
            return this.slopeEvaluation[avalancheConditionsScore][terrainCharacteristicsScore];
        };
        return SlopeEvaluation;
    })();
    Avaluator.SlopeEvaluation = SlopeEvaluation;    
})(Avaluator || (Avaluator = {}));
//@ sourceMappingURL=app.js.map
