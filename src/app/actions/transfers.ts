'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { format } from 'date-fns'

export type TransferData = {
  title: string
  mode: string
  status: string
}

export async function getTransfers() {
  const transfers = await prisma.transfer.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  return transfers.map((t: { createdAt: string | number | Date; lastUpdate: string | number | Date }) => ({
    ...t,
    createdAt: format(t.createdAt, 'dd/MM/yyyy'),
    lastUpdate: format(t.lastUpdate, 'dd/MM/yyyy')
  }))
}

export async function createTransfer(data: TransferData) {
  const transfer = await prisma.transfer.create({
    data
  })
  
  revalidatePath('/')
  return {
    ...transfer,
    createdAt: format(transfer.createdAt, 'dd/MM/yyyy'),
    lastUpdate: format(transfer.lastUpdate, 'dd/MM/yyyy')
  }
}

export async function updateTransfer(id: number, data: Partial<TransferData>) {
  const transfer = await prisma.transfer.update({
    where: { id },
    data
  })

  revalidatePath('/')
  return {
    ...transfer,
    createdAt: format(transfer.createdAt, 'dd/MM/yyyy'),
    lastUpdate: format(transfer.lastUpdate, 'dd/MM/yyyy')
  }
}

export async function deleteTransfer(id: number) {
  await prisma.transfer.delete({
    where: { id }
  })
  
  revalidatePath('/')
}
