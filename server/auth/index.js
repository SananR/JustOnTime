import { configSerialization } from './serialize.js'
import { customerRegisterStrategy } from './strategies/customerRegisterStrategy.js'
import { organizerRegisterStrategy } from './strategies/organizerRegisterStrategy.js'

function configPassportStrategy(passport) {
    organizerRegisterStrategy(passport);
    customerRegisterStrategy(passport);
    configSerialization(passport);
}

export { configPassportStrategy }