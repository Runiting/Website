CREATE MIGRATION m1t33jsm6ivlx7lkd6hhjwz5frtfaiusie6wosvqbkqzt762x7bwwq
    ONTO m1gvfrgi7zgyslckab6lmakq4qs4bzppxx6a226zgmnx5vqn37oakq
{
  ALTER TYPE default::Race {
      CREATE PROPERTY circuit -> std::json;
  };
};
