import { configSerialization } from './serialize.js'
import { customerRegisterStrategy } from './strategies/customerRegisterStrategy.js'
import { organizerRegisterStrategy } from './strategies/organizerRegisterStrategy.js'
import { configCustomerLoginStrategy } from './strategies/customerLoginStrategy.js'
import { configOrganizerLoginStrategy } from './strategies/organizerLoginStrategy.js'

function configPassportStrategy(passport) {
    configCustomerLoginStrategy(passport);
    configOrganizerLoginStrategy(passport);
    organizerRegisterStrategy(passport);
    customerRegisterStrategy(passport);
    configSerialization(passport);
}

export { configPassportStrategy }