# Infinite Craft Pair Finder

This project is a Node.js script that finds all possible pairs in the game [Infinite Craft](https://neal.fun/infinite-craft/). It uses the game's API to find pairs and writes the results to a JSON file.

## Installation

1. Clone this repository:
```
git clone https://github.com/VGontier-cmd/infinite-craft-pair-finder.git
```
2. Navigate to the project directory:
```
cd infinite-craft-pair-finder
```
3. Install the dependencies:
```
npm install 
```
or
```
pnpm install 
```
    
## Usage

To run the script, use the following command:

```
node index.js
```

The script will start finding pairs and writing them to a file named `pairs.json`. Each pair is represented as a JSON object with the following structure:

```json
{
  "firstParent": "Water",
  "secondParent": "Fire",
  "result": {
    "result": "Steam",
    "emoji": "💨",
    "isNew": false
  }
}
```

## Note

This script makes a large number of HTTP requests to the game's API. Please use it responsibly to avoid overloading the server.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
