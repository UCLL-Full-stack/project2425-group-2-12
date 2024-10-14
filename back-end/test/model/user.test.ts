import { Profile } from "../../model/profile";
import { User } from "../../model/user"

test("given: valid values for user, when: user is created, then: user is created with those values", () => {
    // given
    const senne = new Profile({
        firstname: 'Senne',
        lastname: 'Rosseel',
        email: 'sennerosseel@hotmail.com',
        street: 'Houwaartstraat',
        housenumber: 20,
        phonenumber: '0478811597',
        postalcode: 3210,
        role: 'user',
    }); 

    // when
    const user = new User({
        username: "sennerosseel",
        password: "test123!",
        profile: senne,
    })

    // then
    expect(user.getUsername()).toEqual("sennerosseel")
    expect(user.getPassword()).toEqual("test123!")
    expect(user.getProfile()).toEqual(senne)
})