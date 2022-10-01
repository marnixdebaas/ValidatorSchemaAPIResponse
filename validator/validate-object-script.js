function validateObjectBasedOnPredefinedSchema(schema, inputObject, caseNumber) {
    let isValid = true;
    let invalidReason = '';
    for(const key in schema) {
        // Always check if key of schema exists in object
        // Reason: If API response is not consistent and can contain errors/breaking changes
        if (inputObject[key]) {
            // First we check the most probable case 
            // Reason: This case will break/continue the loop faster meaning more effeciency
            if (!(inputObject[key] instanceof Array) && typeof inputObject[key] !== schema[key]) {
                isValid = false;
                invalidReason += 'Object value: ' + inputObject[key] + ' does not meet the required type: ' + schema[key] + ' <br>';
            }
            // Second we check if the value is an array
            // Reason: Javascript returns object on typeof check when value is an array 
            else if (inputObject[key] instanceof Array && schema[key] !== 'array') {
                isValid = false;
                invalidReason += 'Object value: ' + inputObject[key] + ' does not meet the required type: ' + schema[key] + ' <br>';
            }
        } else {
            // If the key doesn't exist in object the API response is also invalid
            isValid = false;
            invalidReason += 'Schema property: ' + key + ' does not exist in object <br>';
        }
    }

    this.displayResult(isValid, invalidReason, caseNumber);
}

// This is a scenario which wasn't described how to handle in the assignment
// The scenario when the inputObject has a value which doesn't exist in the schema which was provided
// This scenario is left optional and only used in the person case but if this would be necessary
// Then the check can be executed before or after the validation
function extraScenario(schema, inputObject) {
    for (const key in inputObject) {
        if (!schema[key]) {
            const extraScenarioElement = document.createElement('div');
            extraScenarioElement.classList.add('m-t-20');
            extraScenarioElement.innerHTML += 'Object key: ' + key + ' does not exist in the provided schema<br>';
            document.getElementById('extraScenarioResult').appendChild(extraScenarioElement);
        }
    }
}

function displayResult(isValid, invalidReason, caseNumber) {
    const divElementForResult = document.createElement('div');
    divElementForResult.classList.add('m-t-20');
    divElementForResult.innerHTML = '<strong>Result ' + caseNumber + '<br>';
    divElementForResult.innerHTML += '<strong>Valid API response = </strong>' + isValid + '<br>';
    if (!isValid) {
        divElementForResult.innerHTML += '<strong>Reason: </strong> <br>' + invalidReason;
    }
    document.getElementById('result').appendChild(divElementForResult); 
}

function displaySchemaAndInputObject(schema, inputObject, caseNumber) {
    const divElementForSchema = document.createElement('div');
    divElementForSchema.classList.add('m-t-20');
    const divElementForInputObject = document.createElement('div');
    divElementForInputObject.classList.add('m-t-20');
    divElementForSchema.innerHTML = '<strong>Schema ' + caseNumber + ' = </strong>' + JSON.stringify(schema);
    divElementForInputObject.innerHTML = '<strong>Objec ' + caseNumber + ' = </strong>' + JSON.stringify(inputObject);
    document.getElementById('schemaDisplay').appendChild(divElementForSchema); 
    document.getElementById('inputObject').appendChild(divElementForInputObject);
}