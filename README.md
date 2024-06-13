
# Simple Blockchain Implementation

Simple Blockchain Implementation is a basic blockchain project developed using Node.js. This repository demonstrates fundamental blockchain concepts including block creation, chain validation, proof of work, and peer-to-peer synchronization using a pub/sub system.

## Features

- **Blockchain Mechanism**: Manages a chain of blocks with proof-of-work and difficulty adjustment.
- **Networking**: Nodes communicate to synchronize their chains using a pub/sub system.
- **Express Server**: Provides API endpoints to interact with the blockchain.
- **Peer-to-Peer Synchronization**: Ensures all nodes agree on the blockchain state.

## Project Structure

- `index.js`: Entry point for the application, sets up the server and handles API requests.
- `block.js`: Defines the structure and functionality of individual blocks.
- `blockchain.js`: Manages the blockchain, including adding new blocks and validating the chain.
- `config.js`: Contains configuration constants such as the genesis block and mining rate.
- `crypto-hash.js`: Provides a hashing function using SHA-256 for creating block hashes.
- `publishsubscribe.js`: Implements a pub/sub system using Redis for broadcasting and receiving blockchain updates across nodes.

## Installation

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/rohit-kumawat12/Simple-Blockchain-Implementation.git
   cd Simple-Blockchain-Implementation
   ```

2. **Install Dependencies**:
   ```sh
   npm install
   ```

3. **Run the Application**:
   - Start the main node:
     ```sh
     npm run dev
     ```
   - To simulate additional peer nodes, use:
     ```sh
     npm run dev-peer
     ```

## Usage

### API Endpoints

- **Get Blockchain**:
  ```sh
  curl http://localhost:3000/api/blocks
  ```

- **Mine a New Block**:
  ```sh
  curl -X POST -H "Content-Type: application/json" -d '{"data":"Your block data"}' http://localhost:3000/api/mine
   ```

## Future Enhancements

- Implement more sophisticated consensus algorithms.
- Add transaction handling and wallet features.
- Develop a frontend interface for easier interaction with the blockchain.
- Enhance security features and add unit tests.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.
