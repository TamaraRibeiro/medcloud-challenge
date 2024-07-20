import fastify from "fastify";
import cors from "@fastify/cors";
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { env } from "./env";
import { prisma } from "./lib/prisma";
import { createPatient } from "./routes/create-patient";
import { getPatients } from "./routes/get-patients";
import { editPatient } from "./routes/update-patient";
import { deletePatient } from "./routes/delete-patient";

const app = fastify()

app.register(cors, {
    origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)


app.register(createPatient)
app.register(getPatients)
app.register(editPatient)
app.register(deletePatient)

app.listen({ port: env.PORT }).then(() => {
    console.log("Server running!")
})