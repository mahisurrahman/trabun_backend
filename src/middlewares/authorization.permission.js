const authorizationQuery = require('./authorization.queries');


const authorization = (methodCode) => {
    return async (req, res, next) => {
        try {
            const roleCode = req.user?.roleCode;
            if (!roleCode) {
                console.warn('Unauthorized access attempt', { roleCode, methodCode });
                return res.status(401).json({ error: true, message: 'Unauthorized access attempt' });
            }

            const roleMethodPermissionCheck = await authorizationQuery.getByRoleMethodCode({ methodCode, roleCode });
            if (roleMethodPermissionCheck.error) {
                console.warn('Permission denied', { roleCode, methodCode });
                return res.status(401).json({ error: true, message: 'Unauthorized access attempt' });
            }

            console.info('Authorization successful', { roleCode, methodCode });
            next();
        } catch (err) {
            console.error('Error in authorization middleware', err);
            res.status(500).json({ error: true, message: 'Internal server error' });
        }
    };
};


const mockAuthorization = (methodCode) => {
    return async (req, res, next) => {
        // console.log('Mock authorization middleware');
        return next();
    };
};

module.exports ={
    authorization: mockAuthorization,
   
} 
