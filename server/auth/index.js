import { configOrganizerRegisterStrategy } from './organizer/passportConfigRegister.js'
import { configSerialization } from './serialize.js'
import {configCustomerRegisterStrategy} from './customer/passportConfigRegister.js'

function configPassportStrategy(passport) {
    configOrganizerRegisterStrategy(passport);
    configCustomerRegisterStrategy(passport);
    configSerialization(passport);
}

export { configPassportStrategy }