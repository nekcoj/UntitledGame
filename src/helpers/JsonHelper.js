export default function JsonHelper() {

  async function readJsonFile() {
    return require('../assets/levels.json');
  }

  return { readJsonFile }
}