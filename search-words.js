<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Search</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        #search {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            margin-bottom: 20px;
            box-sizing: border-box;
        }
        .filter-bar {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        #filterType {
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
            flex-shrink: 0;
        }
        #filterInput {
            flex: 1;
            padding: 10px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }
        #results {
            border: 1px solid #ccc;
            max-height: 500px;
            overflow-y: auto;
        }
        .word {
            padding: 8px;
            border-bottom: 1px solid #eee;
        }
        .count {
            margin-bottom: 10px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Word Search</h1>
    <input type="text" id="search" placeholder="Search for words..." />
    <div class="filter-bar">
        <select id="filterType">
            <option value="none">No Filter</option>
            <option value="prefix">Prefix</option>
            <option value="suffix">Suffix</option>
        </select>
        <input type="text" id="filterInput" placeholder="Enter prefix or suffix..." />
    </div>
    <div class="count">Found: <span id="count">0</span> words</div>
    <div id="results"></div>

    <script>
        let allWords = [];

        // Fetch and parse the JSON file
        async function loadWords() {
            try {
                const response = await fetch('https://raw.githubusercontent.com/zerofxllen/last-letter-words/main/every%20word');
                const data = await response.json();
                allWords = Object.keys(data);
                displayResults(allWords);
            } catch (error) {
                console.error('Error loading words:', error);
                document.getElementById('results').innerHTML = '<div class="word">Error loading words</div>';
            }
        }

        function displayResults(words) {
            const resultsDiv = document.getElementById('results');
            const countSpan = document.getElementById('count');
            
            resultsDiv.innerHTML = '';
            countSpan.textContent = words.length;
            
            words.slice(0, 100).forEach(word => {
                const wordDiv = document.createElement('div');
                wordDiv.className = 'word';
                wordDiv.textContent = word;
                resultsDiv.appendChild(wordDiv);
            });
        }

        function filterWords() {
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const filterType = document.getElementById('filterType').value;
            const filterTerm = document.getElementById('filterInput').value.toLowerCase();
            
            let filtered = allWords;
            
            // Apply search filter
            if (searchTerm) {
                filtered = filtered.filter(word => word.toLowerCase().includes(searchTerm));
            }
            
            // Apply prefix/suffix filter
            if (filterTerm) {
                if (filterType === 'prefix') {
                    filtered = filtered.filter(word => word.toLowerCase().startsWith(filterTerm));
                } else if (filterType === 'suffix') {
                    filtered = filtered.filter(word => word.toLowerCase().endsWith(filterTerm));
                }
            }
            
            displayResults(filtered);
        }

        document.getElementById('search').addEventListener('input', filterWords);
        document.getElementById('filterType').addEventListener('change', filterWords);
        document.getElementById('filterInput').addEventListener('input', filterWords);

        loadWords();
    </script>
</body>
</html>
