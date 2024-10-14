import { Profile } from '../../model/profile';

test('given: valid values for profile, when: creating profile, then: profile is created with those values', () => {
    // given

    // when
    const profile = new Profile({
        firstname: 'Senne',
        lastname: 'Rosseel',
        email: 'sennerosseel@hotmail.com',
        street: 'Houwaartstraat',
        housenumber: 20,
        phonenumber: '0478811597',
        postalcode: 3210,
        role: 'user',
    });

    // then
    expect(profile.getFirstName()).toEqual('Senne');
    expect(profile.getLastName()).toEqual('Rosseel');
    expect(profile.getEmail()).toEqual('sennerosseel@hotmail.com');
    expect(profile.getStreet()).toEqual('Houwaartstraat');
    expect(profile.getHouseNumber()).toEqual(20);
    expect(profile.getPhoneNumber()).toEqual('0478811597');
    expect(profile.getPostalCode()).toEqual(3210);
    expect(profile.getRole()).toEqual('user');
});
