import Logo from "../Logo";
import { COLUMNS, PAYMENTS, SOCIALS } from "../Footer/data";
import LinkColumn from "../Footer/LinkColumn";
import PaymentBadge from "../Footer/PaymentBadge";
import SocialIcon from "../Footer/SocialIcon";

export default function Footer() {
  return (
    <footer className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 flex flex-col gap-5">
            <Logo className="w-32" />
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
              We have clothes that suits your style and which you're proud to
              wear. From women to men.
            </p>
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <SocialIcon key={social.label} {...social} />
              ))}
            </div>
          </div>

          {COLUMNS.map((column) => (
            <LinkColumn key={column.title} {...column} />
          ))}
        </div>

        <hr className="my-8 border-neutral-200" />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-500">
            Shop.co © 2000-2026, All Rights Reserved
          </p>
          <div className="flex gap-2">
            {PAYMENTS.map((name) => (
              <PaymentBadge key={name} name={name} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
