import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function deletePatient(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    "/patients/:patientId",
    {
      schema: {
        params: z.object({
          patientId: z.string().uuid(),
        }),
      },
    },

    async (request, reply) => {
      const { patientId } = request.params;

      try {
        const patient = await prisma.patient.delete({
          where: {
            id: patientId,
          },
        });

        return reply.status(200).send({ message: 'Patient deleted successfully.' });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Patient not deleted." });
      }
    }
  );
}
