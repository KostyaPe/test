const lib = (function() {

    const methods = {};

    methods.calculateString = function calculateString(str) {
        if (typeof str !== 'string') {
            throw new Error(`${arguments.callee.name} requires string as argument.`);
        }

        let newStr = str.replace(/\s/g, '');
        const multiplying = /[a-zA-Z]+\*\d+|\d+\*[a-zA-Z]+/gi;
        const addition = /\(([a-zA-Z]+(\+)[a-zA-Z]+)+\)|([a-zA-Z]+(\+)[a-zA-Z]+)+/gi;

        function multiplyingStr(str) {
            const operandStr = str.match(/[a-zA-Z]+/i)[0];
            const operandNum = str.match(/\d+/)[0];
            const result = operandStr.repeat(operandNum);

            return result;
        }

        let founded = newStr.match(multiplying);

        if(founded) {
            founded.forEach(el => {
                newStr = newStr.replace(el, multiplyingStr(el))
            });
        }

        founded = newStr.match(addition);
        if(founded) {
            founded.forEach(el => {
                const temp = el.replace(/[\+\(\)]/g, '');
    
                newStr = newStr.replace(el, temp);
            });
        }

        founded = newStr.match(/\w+[\*]\d+|\d+[\*]\w+/gi);
        if(founded) {
            founded.forEach(el => {
                newStr = newStr.replace(el, multiplyingStr(el))
            });
        }

        if (newStr.match(multiplying) || newStr.match(addition) || newStr.match(/[\(\)]/g)) {
            newStr = newStr.split('').map((el, i) => {
                if (i === newStr.indexOf('(')) {
                    el = '';
                }

                if (i === newStr.lastIndexOf(')')) {
                    el = '';
                }

                return el;
            }).join('');

            newStr = calculateString(newStr);
        }

        
        return newStr;
    };

    return methods;
})();

const result = lib.calculateString('(((abc*3+trc)*2 + (kostya*2))*1) + qwer');
