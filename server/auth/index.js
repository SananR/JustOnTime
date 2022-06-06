import { configOrganizerRegisterStrategy } from './organizer/passportConfigRegister.js'
import { configSerialization } from './serialize.js'

function configPassportStrategy(passport) {
    configOrganizerRegisterStrategy(passport);
    configSerialization(passport);
}

export { configPassportStrategy }