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

}