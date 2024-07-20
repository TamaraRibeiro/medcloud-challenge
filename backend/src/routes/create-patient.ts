import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function createPatient(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/createPatient",
    {
      //validate body
      schema: {
        body: z.object({
          name: z.string().min(2, 'Name is required'),
          email: z.string().min(2, 'Email is required'),
          birth: z.string().min(2, 'Birthday is required'),
          cpf: z.string().max(11),
          address: z.string().min(1, 'Address is required'),
          cep: z.string().max(8).min(1, 'CEP is required'),
          addressNumber: z.string().min(1, 'Address number is required'),
          complement: z.string(),
          neighbourhood: z.string().min(1, 'Neighbourhood is required'),
          city: z.string(),
          uf: z.string().max(2),
          country: z.string(),
        }),
      },
    },
    async (request, reply) => {
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

      const patient = await prisma.patient.create({
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

      if (!patient) throw new Error("Patient not created");

      return reply.status(201).send({ patientId: patient.id });
    }
  );
}
