import { Link, type LinkProps } from 'react-router-dom'

export function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0 })
}

/** Internal nav link that always scrolls to the top of the destination page. */
export function ScrollLink({ onClick, ...props }: LinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) scrollPageToTop()
      }}
    />
  )
}
