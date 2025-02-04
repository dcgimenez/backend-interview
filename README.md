# Appointment Priority API

## Technologies Used
- Node.js (Runtime)
- TypeScript (Static Typing)
- Express.js (API Framework)
- Jest + Supertest (Testing)
- Docker (Containerization)
- ESLint & Prettier (Code Linting & Formatting)
- Geolib (Geographical distance calculations)


## Dependencies
| Package       | Version   | Description                                      |
|--------------|-----------|--------------------------------------------------|
| `express`    | `^4.18.2` | Web framework for Node.js                        |
| `typescript` | `^4.9.5`  | TypeScript compiler                              |
| `ts-node`    | `^10.9.1` | Runs TypeScript directly                        |
| `jest`       | `^29.6.3` | Testing framework                               |
| `supertest`  | `^6.3.3`  | API testing utility                             |
| `geolib`     | `^3.3.1`  | Library for calculating geographical distances  |

---

## How to Run the Project
This project can be run using npm or Docker.

### Prerequisites
- Node.js
- npm
- (Optional) Docker

### Steps to Run
#### Option 1: Using npm
```bash
# Install dependencies
npm install

# Compile TypeScript files
npm run build

# Start the server
npm start
```

#### **Option 2: Using Docker**
```bash
# Build the Docker image
docker build -t ts-appointment-priority .

# Run the container
docker run -p 3000:3000 ts-appointment-priority
```
## **API Usage**
### **Query params**
- `lat` (required) - Latitude of the hospital location.
- `long`  (required) - Longitude of the hospital location.
```
curl "http://localhost:3000/api/patients?lat=50.1234&long=-82.5678"
```

