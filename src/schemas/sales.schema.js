const {z} = require('zod');

const salesRegisterSchema = z.object({
    employeeId: z.string().min(1).optional(),
    ownerId: z.string().min(1).optional(),
    payments: z.array(
        z.object({
            productId: z.string().min(1).optional(),
            serviceId: z.string().min(1).optional(),
            name: z.string().min(1).optional(),
            price: z.number().positive().min(0),
            quantity: z.number().positive().int(),
        })
    ),
    total: z.number().optional()
  });

  module.exports = {
    salesRegisterSchema
  }