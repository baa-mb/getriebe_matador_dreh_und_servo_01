function schalte () {
    schritt = (wink_1 - wink_0) / 10
    if (lauf_b) {
        faktor = 1
        startwinkel = wink_0
    } else {
        faktor = -1
        startwinkel = wink_1
    }
    for (let Index = 0; Index <= 10; Index++) {
        w = schritt * Index * faktor
        pins.servoWritePin(AnalogPin.P15, startwinkel + w)
        basic.pause(500)
    }
}
input.onButtonPressed(Button.A, function () {
    lauf_a = !(lauf_a)
    if (lauf_a) {
        kitronik_motor_driver.motorOn(kitronik_motor_driver.Motors.Motor1, kitronik_motor_driver.MotorDirection.Forward, 50)
    } else {
        kitronik_motor_driver.motorOff(kitronik_motor_driver.Motors.Motor1)
    }
})
function init () {
    radio.setGroup(54)
    basic.showIcon(IconNames.Yes)
    lauf_a = false
    lauf_b = false
    wink_0 = 75
    wink_1 = 152
}
function test () {
    for (let index = 0; index < 4; index++) {
        basic.pause(500)
        pins.servoWritePin(AnalogPin.P15, wink_1)
        basic.pause(500)
        pins.servoWritePin(AnalogPin.P15, wink_0)
    }
}
input.onButtonPressed(Button.B, function () {
    lauf_b = !(lauf_b)
    schalte()
})
radio.onReceivedStringDeprecated(function (receivedString) {
    if (receivedString == "A") {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_BUTTON_A,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    } else if (receivedString == "B") {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_BUTTON_B,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    } else {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_BUTTON_AB,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    }
})
let lauf_a = false
let w = 0
let startwinkel = 0
let faktor = 0
let lauf_b = false
let wink_0 = 0
let wink_1 = 0
let schritt = 0
init()
test()
