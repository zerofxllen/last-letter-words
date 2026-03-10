const fs = require('fs');
const path = require('path');

// Load word data
const wordData = JSON.parse(fs.readFileSync(path.join(__dirname, 'every word'), 'utf8'));

/**
 * Search words by prefix
 * @param {string} prefix - The prefix to search for
 * @returns {Object} Matching words with their data
 */
function searchByPrefix(prefix) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.startsWith(prefix)) {
      results[word] = data;
    }
  }
  return results;
}

/**
 * Search words by suffix
 * @param {string} suffix - The suffix to search for
 * @returns {Object} Matching words with their data
 */
function searchBySuffix(suffix) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.endsWith(suffix)) {
      results[word] = data;
    }
  }
  return results;
}

/**
 * Search words by both prefix and suffix
 * @param {string} prefix - The prefix to search for
 * @param {string} suffix - The suffix to search for
 * @returns {Object} Matching words with their data
 */
function searchByPrefixAndSuffix(prefix, suffix) {
  const results = {};
  for (const [word, data] of Object.entries(wordData)) {
    if (word.startsWith(prefix) && word.endsWith(suffix)) {
      results[word] = data;
    }
  }
  return results;
}

/**
 * Get all words
 * @returns {Object} All words with their data
 */
function getAllWords() {
  return wordData;
}

// Export functions
module.exports = {
  searchByPrefix,
  searchBySuffix,
  searchByPrefixAndSuffix,
  getAllWords
};

// CLI usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch(command) {
    case 'prefix':
      console.log(searchByPrefix(args[1]));
      break;
    case 'suffix':
      console.log(searchBySuffix(args[1]));
      break;
    case 'both':
      console.log(searchByPrefixAndSuffix(args[1], args[2]));
      break;
    case 'all':
      console.log(getAllWords());
      break;
    default:
      console.log('Usage:');
      console.log('  node search-words.js prefix <prefix>');
      console.log('  node search-words.js suffix <suffix>');
      console.log('  node search-words.js both <prefix> <suffix>');
      console.log('  node search-words.js all');
  }
}