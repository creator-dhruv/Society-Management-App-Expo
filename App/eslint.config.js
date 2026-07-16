const expoConfig = require("eslint-config-expo/flat");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  expoConfig,
  {
    rules: {
      // Reanimated shared values are intentionally mutated to drive UI-thread animations.
      "react-hooks/immutability": "off",
      "import/no-named-as-default": "off",
    },
  },
]);
