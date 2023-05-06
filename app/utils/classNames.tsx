import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const classNames = (...classes: ClassValue[]) => twMerge(clsx(...classes))
