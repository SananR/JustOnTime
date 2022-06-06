import { configCustomerRegisterStrategy } from './customer/passportConfigRegister.js'
import { configSerialization } from './serialize.js'

function configPassportStrategy(passport) {
    configCustomerRegisterStrategy(passport);
    configSerialization(passport);
}

export { configPassportStrategy }