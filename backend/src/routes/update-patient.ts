import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function editPatient(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/patients/:patientId",
    {
      schema: {
        params: z.object({
          patientId: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          email: z.string(),
          birth: z.string(),
          cpf: z.string().max(11),
          address: z.string(),
          cep: z.string().max(8),
          addressNumber: z.string(),
          complement: z.string(),
          neighbourhood: z.string(),
          city: z.string(),
          uf: z.string().max(2),
          country: z.string(),
        }),
      },
    },

    async (request, reply) => {
      const { patientId } = request.params;
      const {
        name,
        email,
        birth,
        cpf,
        address,
        cep,
        addressNumber,
        complement,
        neighbourhood,
        city,
        uf,
        country,
      } = request.body;

      try {
        const patient = await prisma.patient.findUnique({
          where: {
            id: patientId,
          },
        });

        if (!patient) throw new Error("Patient does not exist.");

        await prisma.patient.update({
          where: {
            id: patientId,
          },
          data: {
            name,
            email,
            birth,
            cpf,
            address,
            cep,
            addressNumber,
            complement,
            neighbourhood,
            city,
            uf,
            country,
          },
        });

        return reply.status(200).send({ patientid: patientId });
      } catch (error) {
        return reply
          .status(500)
          .send({ message: "Patient not loaded." });
      }
    }
  );

  app.withTypeProvider<ZodTypeProvider>().get(
    "/patients/:patientId",{
      schema: {
        params: z.object({
          patientId: z.string().uuid(),
        }),
      },
    },

    async (request, reply) => {
      const { patientId } = request.params;
      try {
        const patients = await prisma.patient.findUnique({
          where: {
            id: patientId,
          },
        });
        return reply.status(200).send({ patients });
      } catch (error) {
        return reply.status(500).send({ message: 'Patients not loaded.' });
      }
    }
  );
}
