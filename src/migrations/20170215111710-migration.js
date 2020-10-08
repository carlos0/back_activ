module.exports = {
  up: (migration, DataTypes, done) => {
    const sql = (
       ''
    );

    migration.sequelize.query(sql)
      .finally(done);
  },

  down: (migration, DataTypes, done) => {
    migration.sequelize.query('')
      .finally(done);
  },
};
