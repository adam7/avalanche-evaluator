var EvaluationTests;
(function (EvaluationTests) {
    function doEvaluation(conditionCount, terrainCount) {
        var evaluation = new Avaluator.SlopeEvaluation();
        for(var count = 0; count < conditionCount; count++) {
            evaluation.avalancheConditions()[count].checked(true);
        }
        for(var count = 0; count < terrainCount; count++) {
            evaluation.terrainCharacteristics()[count].checked(true);
        }
        return evaluation.evaluate();
    }
    EvaluationTests.doEvaluation = doEvaluation;
    var EvaluationExpectation = (function () {
        function EvaluationExpectation(conditionCount, terrainCount, evaluation) {
            this.conditionCount = conditionCount;
            this.terrainCount = terrainCount;
            this.evaluation = evaluation;
            console.info("When condition score is ", conditionCount, " and terrain score is ", terrainCount, " evaluation should be ", evaluation.description);
        }
        return EvaluationExpectation;
    })();    
    var SimpleEvaluationTests = (function () {
        function SimpleEvaluationTests() {
            this.evaluationExpectations = [
                new EvaluationExpectation(0, 0, new Avaluator.Caution()), 
                new EvaluationExpectation(0, 1, new Avaluator.Caution()), 
                new EvaluationExpectation(0, 2, new Avaluator.Caution()), 
                new EvaluationExpectation(0, 3, new Avaluator.Caution()), 
                new EvaluationExpectation(0, 4, new Avaluator.Caution()), 
                new EvaluationExpectation(0, 5, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(1, 0, new Avaluator.Caution()), 
                new EvaluationExpectation(1, 1, new Avaluator.Caution()), 
                new EvaluationExpectation(1, 2, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(1, 3, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(1, 4, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(1, 5, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(2, 0, new Avaluator.Caution()), 
                new EvaluationExpectation(2, 1, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(2, 2, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(2, 3, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(2, 4, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(2, 5, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(3, 0, new Avaluator.Caution()), 
                new EvaluationExpectation(3, 1, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(3, 2, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(3, 3, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(3, 4, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(3, 5, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(4, 0, new Avaluator.Caution()), 
                new EvaluationExpectation(4, 1, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(4, 2, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(4, 3, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(4, 4, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(4, 5, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(5, 0, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(5, 1, new Avaluator.ExtraCaution()), 
                new EvaluationExpectation(5, 2, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(5, 3, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(5, 4, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(5, 5, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(6, 0, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(6, 1, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(6, 2, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(6, 3, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(6, 4, new Avaluator.NotRecommended()), 
                new EvaluationExpectation(6, 5, new Avaluator.NotRecommended()), 
                
            ];
        }
        SimpleEvaluationTests.prototype.defaultShouldEvaluateToCaution = function (c) {
            var evaluation = new Avaluator.SlopeEvaluation();
            c.areIdentical(evaluation.evaluate().description, new Avaluator.Caution().description);
        };
        SimpleEvaluationTests.prototype.evaluationsShouldMatchExpectations = function (c) {
            this.evaluationExpectations.forEach(function (expectation) {
                c.areIdentical(doEvaluation(expectation.conditionCount, expectation.terrainCount).description, expectation.evaluation.description);
            });
        };
        SimpleEvaluationTests.prototype.allConditionsAllTerrainShouldEvaluateToNotRecommended = function (c) {
            var evaluation = new Avaluator.SlopeEvaluation();
            ko.utils.arrayForEach(evaluation.avalancheConditions(), function (condition) {
                condition.checked(true);
            });
            ko.utils.arrayForEach(evaluation.terrainCharacteristics(), function (terrain) {
                terrain.checked(true);
            });
            c.areIdentical(evaluation.evaluate().description, new Avaluator.NotRecommended().description);
        };
        SimpleEvaluationTests.prototype.whenSlopeSteepnessOverThirtyFiveDegreesIsTrue_SlopeSteepnessOverThirtyDegreesShouldBeTrue = function (c) {
            var evaluation = new Avaluator.SlopeEvaluation();
            evaluation.terrainCharacteristics()[1].checked(true);
            c.areIdentical(evaluation.terrainCharacteristics()[0].checked(), true);
            c.areIdentical(evaluation.terrainCharacteristics()[1].checked(), true);
        };
        SimpleEvaluationTests.prototype.whenSlopeSteepnessOverThirtyDegreesIsFalse_SlopeSteepnessOverThirtyFiveDegreesShouldBeFalse = function (c) {
            var evaluation = new Avaluator.SlopeEvaluation();
            evaluation.terrainCharacteristics()[0].checked(true);
            evaluation.terrainCharacteristics()[1].checked(true);
            evaluation.terrainCharacteristics()[0].checked(false);
            c.areIdentical(evaluation.terrainCharacteristics()[0].checked(), false);
            c.areIdentical(evaluation.terrainCharacteristics()[1].checked(), false);
        };
        return SimpleEvaluationTests;
    })();
    EvaluationTests.SimpleEvaluationTests = SimpleEvaluationTests;    
})(EvaluationTests || (EvaluationTests = {}));
//@ sourceMappingURL=EvaluationTests.js.map
