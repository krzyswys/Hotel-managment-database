const { Person } = require('models')
module.exports = {
    checkEmployeePositionById: async(id)=>{
        try {
            const employee = await Employee.find({ _id: id, position: 'Manager' }).exec();
            if (employee.length > 0) {
              return true;
            } else {
              return false
            }
          } catch (error) {
            console.log(error);
            return false;
          }
    }
}