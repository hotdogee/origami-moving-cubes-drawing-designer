'use client'
import DeFlag from '@/images/de.svg'
import TwFlag from '@/images/tw.svg'
import UsFlag from '@/images/us.svg'
import Image from 'next/image'

export default function LocaleSelect() {
  const onblur = (e: React.FocusEvent<HTMLDetailsElement>) => {
    e.preventDefault()
    e.stopPropagation()
    e.currentTarget.removeAttribute('open')
  }
  return (
    <div className="relative right-0 top-0 z-50">
      <details className="" onBlur={onblur}>
        <summary>
          <Image src={UsFlag} width={24} height={18} alt="US Flag" className="inline" />
          Locale
        </summary>
        <ul className="absolute left-0 top-[calc(100%+10px)]">
          <a>
            <li>
              <Image
                src={UsFlag}
                width={24}
                height={18}
                alt="US Flag"
                className="inline"
              />
              English
            </li>
          </a>
          <a>
            <li>
              <Image
                src={DeFlag}
                width={24}
                height={18}
                alt="DE Flag"
                className="inline"
              />
              German
            </li>
          </a>
          <a>
            <li>
              <Image
                src={TwFlag}
                width={24}
                height={18}
                alt="TW Flag"
                className="inline"
              />
              Taiwan
            </li>
          </a>
        </ul>
      </details>
    </div>
  )
}
