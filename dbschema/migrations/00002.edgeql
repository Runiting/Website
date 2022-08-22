CREATE MIGRATION m1gvfrgi7zgyslckab6lmakq4qs4bzppxx6a226zgmnx5vqn37oakq
    ONTO m1gszkpdznkgk6vz24bfu2h6ueogaejdgjohplama6wshh6jktaadq
{
  ALTER TYPE default::Race {
      ALTER LINK runners {
          CREATE PROPERTY coordinates -> array<std::json>;
      };
  };
};
