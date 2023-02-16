function requiredEnvVariablesLoaded(requiredEnvVariables) {
  for (let i = 0; i < requiredEnvVariables.length; i += 1) {
    if (!process.env[requiredEnvVariables[i]]) {
      return false;
    }
  }
  return true;
}

function getMissingEnvVariables(requiredEnvVariables) {
  const missingEnvVariables = [];

  for (let i = 0; i < requiredEnvVariables.length; i += 1) {
    if (!process.env[requiredEnvVariables[i]]) {
      missingEnvVariables.push(requiredEnvVariables[i]);
    }
  }

  return missingEnvVariables;
}

module.exports = {
  getMissingEnvVariables,
  requiredEnvVariablesLoaded
};
