/*
 * Implement all your JavaScript in this file!
 */

var stored = 0;
var register = 0;
var operator = '';
var lastKeyOp = false;
var lastKeyEq = false;

$('#clearButton').click(function() {
	clearCalc();
});

$('#addButton').click(function () {
	updateOp('add');
});
$('#subtractButton').click(function () {
	updateOp('subtract');
});
$('#multiplyButton').click(function () {
	updateOp('multiply');
});
$('#divideButton').click(function () {
	updateOp('divide');
});

$('#equalsButton').click(function() {
	if (!lastKeyOp) {
		lastKeyEq = true;
		if (operator == '') {
			stored = register;
			updateDisplay(stored);
		} else {
			doMath();
			// register = 0;
		}
	}
});

function doMath() {
	switch(operator) {
		case "add":
			stored += register;
			updateDisplay(stored);
			break;
		case "subtract":
			stored -= register;
			updateDisplay(stored);
			break;
		case "multiply":
			stored *= register;
			updateDisplay(stored);
			break;
		case "divide":
			if (register == 0) {
				clearCalc();
				$('#display').val('Infinity');
			} else {
				stored = stored / register;
				updateDisplay(stored);
			}
	}
}

function updateOp(myOp) {
	if (!lastKeyOp) {
		if (lastKeyEq) {
			operator = myOp;
			lastKeyEq = false;
		} else if (operator == '') {
			stored = register;
			operator = myOp;
		} else {
			doMath();
			operator = myOp;
		}
		lastKeyOp = true;
	} else {
		operator = myOp;
	}
}
function clearCalc() {
	lastKeyOp = false;
	lastKeyEq = false;
	register = 0;
	stored = 0;
	operator = '';
	$('#display').val('');
}

function updateRegister(num) {
	if ((lastKeyOp) || (lastKeyEq)) {
		register = 0;
		lastKeyOp = false;
	}
	register *= 10;
	register += num;
	updateDisplay(register);
}
function updateDisplay(value) {
	$('#display').val(value);
}
$('#button0').click(function() {
	updateRegister(0);
});
$('#button1').click(function() {
	updateRegister(1);
});
$('#button2').click(function() {
	updateRegister(2);
});
$('#button3').click(function() {
	updateRegister(3);
});
$('#button4').click(function() {
	updateRegister(4);
});
$('#button5').click(function() {
	updateRegister(5);
});
$('#button6').click(function() {
	updateRegister(6);
});
$('#button7').click(function() {
	updateRegister(7);
});
$('#button8').click(function() {
	updateRegister(8);
});
$('#button9').click(function() {
	updateRegister(9);
});
