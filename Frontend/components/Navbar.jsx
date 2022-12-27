import Link from 'next/link';
import { Menu, MenuButton, MenuList, div, IconButton, Flex, Box, Spacer } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import {useSession, signIn, signOut} from 'next-auth/react'



function Navbar() {
  const {data: session} = useSession();

  return (
  <header aria-label="Site Header" class="bg-white border-gray-100 border-b-2">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <Box fontSize='3xl' color='blue.400' fontWeight='bold'>
          <Link href='/' paddingLeft='2'>Diyar</Link>
        </Box>

        <div class="md:flex md:items-center md:gap-12">
          <nav aria-label="Site Nav" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75" href='/search?purpose=for-sale' passHref>
                  Buy
                </Link>
              </li>

              <li>
                <Link className="text-gray-500 transition hover:text-gray-500/75"
                  href='/search?purpose=for-rent' passHref>
                  Rent
                </Link>
              </li>
              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/About"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  class="text-gray-500 transition hover:text-gray-500/75"
                  href="/Contact"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              {session ? <>
              <div>
                <Link href={'/Profile'}>
              {session.user.name}
                </Link>
              </div>
              </> :
              <>
              <Link
                class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                href="/Registration"
              >
                Login
              </Link>

              <div class="hidden sm:flex">
                <a
                  class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-600"
                  href='/Registration' passHref>
                  Register
                </a>
              </div>
              </> }
            </div>

            <div class="block md:hidden">
              <button
                class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  )
};

export default Navbar;