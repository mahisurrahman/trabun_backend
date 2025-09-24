const pool = require('../config/db');


const getByRoleMethodCode = async ({ methodCode, roleCode }) => {
    if (!methodCode || !roleCode) {
        return { error: true, message: 'Method code or role code missing' };
    }

    const methodQuery = `SELECT id FROM methods WHERE code = $1 AND is_delete = FALSE;`;
    const roleQuery = `SELECT id FROM roles WHERE code = $1 AND is_delete = FALSE;`;

    const [methodResult, roleResult] = await Promise.all([
        pool.query(methodQuery, [methodCode]),
        pool.query(roleQuery, [roleCode])
    ]);

    if (methodResult.rows.length === 0) {
        return { error: true, message: 'Method not found' };
    }
    if (roleResult.rows.length === 0) {
        return { error: true, message: 'Role not found' };
    }

    const query = `SELECT id FROM module_method_role_maps WHERE method_id = $1 AND role_id = $2 AND is_delete = FALSE;`;
    const result = await pool.query(query, [methodResult.rows[0].id, roleResult.rows[0].id]);

    if (result.rows.length === 0) {
        return { error: true, message: 'Role method permission not found' };
    }

    return { error: false, message: 'Authorization successful', data: result.rows[0] };
};



const getRoleByuserId = async ({ userId }) => {
    if (!userId) {
        return { error: true, message: 'userId  missing' };
    }

    const userRoleMapQuery = `SELECT role_id FROM role_user_maps WHERE user_id = $1 AND is_delete = FALSE;`;
    const userRoleResult = await pool.query(userRoleMapQuery, [userId]);

    if (userRoleResult.rows.length === 0) {
        return { error: true, message: 'User role not found' };
    }

    let role_id = userRoleResult.rows[0].role_id;
    const roleQuery = `SELECT * FROM roles WHERE id = $1 AND is_delete = FALSE;`;
    const roleResult = await pool.query(roleQuery, [role_id]);
    if (roleResult.rows.length === 0) {
        return { error: true, message: 'Role not found' };
    }


    return { error: false, message: 'Authorization successful', data: roleResult.rows[0]};
};


module.exports = {
    getByRoleMethodCode: getByRoleMethodCode,
    getRoleByuserId: getRoleByuserId
 

};