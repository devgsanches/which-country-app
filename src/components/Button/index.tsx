import type { ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  src: string
  alt: string
  children: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ src, children, alt, ...props }: ButtonProps) => {
  return (
    <button className="flex gap-1 cursor-pointer" {...props}>
      <img src={src} alt={alt} />
      <span className="text-base font-[Inter] font-bold">{children}</span>
    </button>
  )
}
