module default {

    scalar type Role extending enum<Runner, Sponsor, Admin>;
    scalar type Unit extending enum<Km, Ml>;

    type User {
        required property email -> str {
            constraint exclusive;
        };
        required property password -> str;

        property phone -> str;

        required property firstname -> str;
        required property lastname -> str;
        property fullname := .firstname ++ " " ++ .lastname;
        
        property role -> Role;

        multi link races := .<runners[is Race];

        property createdAt -> datetime {
            default := datetime_current()
        };
        property updatedAt -> datetime{
            default := datetime_current()
        };
    }


    type Race {
        required property name -> str;
        required property date -> datetime;
        required property autoStart -> bool;

        required property joinCode -> str {
            constraint exclusive;
        };

        property createdAt -> datetime {
            default := datetime_current()
        };
        property updatedAt -> datetime{
            default := datetime_current()
        };

        multi link runners -> User {
            property coordinates -> array<json>;
        };
        multi link administrators -> User;
        required link owner -> User;
    }

    type Sponsorship {
        link race -> Race;

        link sponsor -> User;
        link runner -> User;

        required property amountByUnit -> float64;
        required property unit -> Unit;


        property createdAt -> datetime {
            default := datetime_current()
        };
        property updatedAt -> datetime{
            default := datetime_current()
        };
    }

}
