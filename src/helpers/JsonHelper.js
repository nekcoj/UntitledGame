export default function JsonHelper() {

  async function readJsonFile(filename) {
    return require(`../assets/${filename}.json`);
  }

  return { readJsonFile }
}