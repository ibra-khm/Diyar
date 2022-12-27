import Link from 'next/link'
import Image from 'next/image'
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import styles from '../styles/Home.module.css'
import { baseUrl, fetchApi } from '../utils/fetchApi'
import Hero from '../assets/images/house.jpg'
import Property from '../components/Property'

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10" width='screen'>
    <Image src={imageUrl} width={700} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium">{purpose}</Text>
      <Text fontSize="3xl" fontWeight="bold" mb="3">{title1}<br />{title2}</Text>
      <Text fontSize="lg" color="gray.700" paddingTop="3">{desc1}<br />{desc2}</Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>

    </Box>
  </Flex>
)

export default function Home({ propertiesForSale, propertiesForRent }) {
  return (
    <>
      {/* <section className="max-w-screen  flex flex-wrap h-[30rem] object-cover  bg-center bg-no-repeat bg-cover bg-[url('https://img.freepik.com/free-photo/interior-light-room-with-sofa-empty-dark-blue-wall-3d-rendering_41470-3524.jpg?w=996&t=st=1668909090~exp=1668909690~hmac=635b87fc681e5c566b6e302f0590ab40d313daf9e8b6a25de80fad3f5fab961b')]">
        <div className='container pt-[15%]'>
          <h1 className='text-3xl text-[4rem] text-gray-100' style={{}}>Search Your Next Home</h1>
          <p className='text-[1.4rem] text-gray-100 opacity-80'>Find new & featured property located in your local city.</p>

          <form className='bg-gray-200 rounded mt-12 pt-0 pr-5'>
            <div className='p-3.5 border-l'>
              <span>City/Street</span>
              <input className='p-10 mt-1 w-full border border-gray-300' type='text' placeholder='Location' />
            </div>
            <div className='p-3.5 border-l'>
              <h4>Advance Filter</h4>
            </div>
      
            <button className='btn1'>
              <i className='fa fa-search'></i>
            </button>
          </form>
        </div>
      </section> */}

      <Box>
        <Banner
          purpose='RENT A HOME'
          title1='Rental Homes for'
          title2='Everyone'
          desc1=' Explore from Apartments, builder floors, villas'
          desc2='and more'
          buttonText='Explore Renting'
          linkName='/search?purpose=for-rent'
          imageUrl="https://raw.githubusercontent.com/sunil9813/Real-estate-website/master/public/images/banner.png"
        />
        <div className='flex flex-wrap justify-center align-center mx-auto'>
          {/* Fetch the listings and map over them  */}
          {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
        </div>

        <Banner purpose="BUY A HOME"
          title1="Find, Buy & Own Your"
          title2="Dream Home"
          desc1="Find your perfect home with our wide range of properties"
          desc2="from studio apartments to luxury villas"
          buttonText="Find your Property"
          linkName="/search?purpose=for-sale"
          imageUrl="https://raw.githubusercontent.com/sunil9813/Real-estate-website/master/public/images/banner.png"

        />
        <div className='flex flex-wrap justify-center object-center align-center mx-auto'>
          {propertiesForSale?.map((property) => <Property property={property} key={property.id} />)}
        </div>

      </Box>
    </>
  )
}


export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits
    }
  }
}
