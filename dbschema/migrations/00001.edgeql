CREATE MIGRATION m1gszkpdznkgk6vz24bfu2h6ueogaejdgjohplama6wshh6jktaadq
    ONTO initial
{
  CREATE TYPE default::Race {
      CREATE REQUIRED PROPERTY autoStart -> std::bool;
      CREATE PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY date -> std::datetime;
      CREATE REQUIRED PROPERTY joinCode -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY name -> std::str;
      CREATE PROPERTY updatedAt -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  CREATE SCALAR TYPE default::Role EXTENDING enum<Runner, Sponsor, Admin>;
  CREATE TYPE default::User {
      CREATE PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY firstname -> std::str;
      CREATE REQUIRED PROPERTY lastname -> std::str;
      CREATE PROPERTY fullname := (((.firstname ++ ' ') ++ .lastname));
      CREATE REQUIRED PROPERTY password -> std::str;
      CREATE PROPERTY phone -> std::str;
      CREATE PROPERTY role -> default::Role;
      CREATE PROPERTY updatedAt -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
  ALTER TYPE default::Race {
      CREATE MULTI LINK administrators -> default::User;
      CREATE REQUIRED LINK owner -> default::User;
      CREATE MULTI LINK runners -> default::User;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK races := (.<runners[IS default::Race]);
  };
  CREATE SCALAR TYPE default::Unit EXTENDING enum<Km, Ml>;
  CREATE TYPE default::Sponsorship {
      CREATE LINK race -> default::Race;
      CREATE LINK runner -> default::User;
      CREATE LINK sponsor -> default::User;
      CREATE REQUIRED PROPERTY amountByUnit -> std::float64;
      CREATE PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY unit -> default::Unit;
      CREATE PROPERTY updatedAt -> std::datetime {
          SET default := (std::datetime_current());
      };
  };
};
