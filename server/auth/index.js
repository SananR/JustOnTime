import { configOrganizerRegisterStrategy } from './organizer/passportConfigRegister.js'

function configPassportStrategy(passport) {
    configOrganizerRegisterStrategy(passport)
}

export { configPassportStrategy }