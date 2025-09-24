const jwt = require('jsonwebtoken');
const authorizationQuery = require('./authorization.queries');


async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(404).json({ error: true, message: 'Access denied. No token provided.' });
  }

  // console.log("token",token)
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(404).json({ error: true, message: 'Access denied. No token provided.' });
    }
    req.user = decoded; 



    let userId = req.user.token;
    const roleMethodPermissionData = await authorizationQuery.getRoleByuserId({ userId });
    // console.log("Role Method Permission Data:", roleMethodPermissionData);

    if (roleMethodPermissionData?.error === false) {
      req.user.roleName = roleMethodPermissionData.data.name || null;
      req.user.bnRoleName = roleMethodPermissionData.data.bn_name || null;
      req.user.roleCode = roleMethodPermissionData.data.code || null;
    } else {
      
      req.user.roleName = null;
      req.user.bnRoleName = null;
      req.user.roleCode = null;
    }
    // console.log("User  data:", req.user);

    next(); 
  } catch (err) {
    console.error("eror:", err);
    res.status(403).json({ error: true, message: 'Invalid or expired token.' });
  }
}



function authMiddlewareMock(req, res, next) {
    next();
  }

module.exports =
{
   authMiddleware: authMiddleware,
  //  authMiddleware: authMiddlewareMock,

};