import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function getPatients(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/patients",

    async (_, reply) => {
      try {
        const patients = await prisma.patient.findMany({
          select: {
            id: true,
            name: true,
            email: true,
            birth: true,
          },
        });
        return reply.status(200).send({ patients });
      } catch (error) {
        return reply.status(500).send({ message: 'Patients not loaded.' });
      }
    }
  );

  
}
