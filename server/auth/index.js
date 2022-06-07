import { configCustomerRegisterStrategy } from './customer/passportConfigRegister.js'
import { configSerialization } from './serialize.js'
import { configOrganizerRegisterStrategy } from './organizer/passportConfigRegister.js'
function configPassportStrategy(passport) {
    configCustomerRegisterStrategy(passport);
    configOrganizerRegisterStrategy(passport);
    configSerialization(passport);
}

export { configPassportStrategy }