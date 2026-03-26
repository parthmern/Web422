import jwt from 'jsonwebtoken';

let vehicleData = [{
    "id": 1,
    "year": 1994,
    "make": "Suzuki",
    "model": "SJ",
    "vin": "JN8AZ2KR6CT544012"
  }, {
    "id": 2,
    "year": 1999,
    "make": "Chrysler",
    "model": "300",
    "vin": "1B3CC5FB5AN648885"
  }, {
    "id": 3,
    "year": 2005,
    "make": "BMW",
    "model": "X3",
    "vin": "JTHBP5C29E5152916"
  }, {
    "id": 4,
    "year": 2006,
    "make": "Honda",
    "model": "CR-V",
    "vin": "WBAVD53557A338302"
  }, {
    "id": 5,
    "year": 1981,
    "make": "Chevrolet",
    "model": "Camaro",
    "vin": "JM1GJ1T56E1803549"
  }]

export default function handler(req, res) {
  const { verify } = jwt;
  const { method, headers } = req;
  let authHeader = headers.authorization;
  
  switch (method) {
    case 'GET':

        if (!authHeader || !authHeader.toLowerCase().startsWith("jwt ")) {
             res.status(401).json({ error: "Missing or invalid authorization header" });
        }else{
            // Extract JWT token by removing the "jwt " prefix
            const token = authHeader.substring(4).trim();

            try{
                console.log(token);
                verify(token, process.env.JWT_SECRET);
                res.json(vehicleData);
            }catch(err){
                res.status(401).end();
            }
        }

      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}