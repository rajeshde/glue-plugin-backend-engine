
export const isValidGluePlugin = (
  backendPlugins: string[], name: string
): string[] => {
  const validPlugins: string[] = [];

  backendPlugins.forEach(_plugin => {
    if (_plugin === name) {
      validPlugins.push(name);
    }

    if (_plugin.includes('*')) {
      const _name = '@gluestack/glue-plugin-service-';
      if (name && name.startsWith(_name)) {
        validPlugins.push(name);
      }
    }
  });

  return validPlugins;
};

