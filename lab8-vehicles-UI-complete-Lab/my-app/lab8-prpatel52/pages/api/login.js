import jwt from 'jsonwebtoken';

export default function handler(req, res) {
  const { userName, password } = req.body;
  const { sign } = jwt;
  const { method } = req;

  switch (method) {
    case 'POST':

        if(userName == process.env.ADMIN_USER && password == process.env.ADMIN_PASSWORD){
            let payload = {
                userName: process.env.ADMIN_USER,
                fullName: "Admin User"
            }
            let token = sign(payload, process.env.JWT_SECRET);
            res.json({ "message": "login successful", "token": token });    
        }else{
            res.status(422).json({ "message": "invalid credentials" });
        }

      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}