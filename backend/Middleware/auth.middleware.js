import jwt from 'jsonwebtoken'
import user from '../models/user.model.js'

const protectRoute = (req, res, next) => {
    const token = req.cookies.jwt;

    try {
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      } else {
       
      }  
    } catch (error) {
        
    }
    
};