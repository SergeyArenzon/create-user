'use client'
import "./globals.css";
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { store } from './store'
import { Provider } from 'react-redux'


export default function RootLayout({ children }) {

  const pathname = usePathname()


  console.log({pathname});
  return (
    <html lang="en" className="bg-white">

        <Provider store={store}>
            <body className="p-8">
              <ul className=" border-gray-400 text-gray-400 font-bold border-t border-b-2  flex  list-none h-10 items-center gap-4 mb-9">
                <li className={` h-full flex items-center justify-center border-b-2 w-20  ${pathname === "/" ? "text-blue-400  border-blue-400 " : "border-white"}`}><Link href="/">FORM</Link></li>
                <li className={`h-full flex items-center justify-center  border-b-2 w-20 ${pathname === "/user" ? "text-blue-400  border-blue-400" : "border-white"}`}><Link href="/user">USER</Link></li>
              </ul>
              <main>
                {children}
              </main>
              
            </body>
        </Provider>
    </html>
  );
}
