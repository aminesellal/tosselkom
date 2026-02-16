#!/bin/bash
cd /home/amine/2cpprojet/tosselcom-backend
npx prisma migrate dev --name add_vehicle_to_user
npx prisma generate
