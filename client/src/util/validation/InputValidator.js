export class InputValidator {

    constructor(input) {
        this.input = input
        this.isValid = true;
    }

    minLength(min) {
        this.isValid = this.isValid && this.input.length >= min;
        return this;
    }

    maxLength(max) {
        this.isValid = this.isValid && this.input.length <= max;
        return this;
    }

    equals(string) {
        this.isValid = string.length>0 ? this.isValid && this.input === string && this.input.length > 0 : true;
        return this;
    }

    matches(string) {
        this.isValid = this.isValid && this.input.match(string);
        return this;
    }

    isInRange(min, max) {
        this.isValid = this.isValid && this.input >= min && this.input <= max;
        return this;
    }

}