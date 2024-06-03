const db = require('../config/databaseConnection');

const getStaffUsers = (callback) => {
    const sqlGetStaffUsers = `
      SELECT users.userID, users.firstName, users.username, users.email, users.phoneNumber
      FROM users
      JOIN userroles ON users.userID = userroles.userID
      JOIN usertype ON userroles.userTypeID = usertype.userTypeID
      WHERE usertype.userType = 'Staff';
    `;
    db.query(sqlGetStaffUsers, callback);
};

const deleteStaff = (userID, callback) => {
    // SQL to check userTypeID
    const checkUserTypeIDSQL = `SELECT userTypeID FROM userroles WHERE userID = ?;`;

    // SQL to delete from userroles table
    const deleteUserRolesSQL = `DELETE FROM userroles WHERE userID = ?;`;

    // SQL to delete from user table
    const deleteUserSQL =` DELETE FROM users WHERE userID = ?;`;

    // Begin transaction
    db.beginTransaction(err => {
        if (err) {
            return callback(err);
        }

        // Check userTypeID
        db.query(checkUserTypeIDSQL, userID, (error, [userRoleRow]) => {
            if (error) {
                return db.rollback(() => {
                    callback(error, null);
                });
            }

            // Check if userTypeID is 1 or 2
            if (userRoleRow && (userRoleRow.userTypeID === 1 || userRoleRow.userTypeID === 3)) {
                return callback({ message: 'Deletion not allowed for this user type' }, null);
            }

            // Delete from userroles table
            db.query(deleteUserRolesSQL, userID, (error, results) => {
                if (error) {
                    return db.rollback(() => {
                        callback(error, null);
                    });
                }

                // Delete from user table
                db.query(deleteUserSQL, userID, (error, results) => {
                    if (error) {
                        return db.rollback(() => {
                            callback(error, null);
                        });
                    }

                    // Commit transaction
                    db.commit(err => {
                        if (err) {
                            return db.rollback(() => {
                                callback(err, null);
                            });
                        }
                        callback(null, results);
                    });
                });
            });
        });
    });
};

module.exports = { getStaffUsers, deleteStaff };