import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Property from '../components/Property';
import SearchFilters from '../components/SearchFilters';
import { baseUrl, fetchApi } from '../utils/fetchApi';
import noresult from '../assets/images/noresult.svg'
import Profile from './Profile';

const Search = ({ properties }) => {
  const [searchFilters, setSearchFilters] = useState(false);
  const router = useRouter();

  return (
    <Box> 
      <Flex
        onClick={() => setSearchFilters(!searchFilters)}
        cursor='pointer'
        bg='gray.100'
        borderBottom='1px'
        borderColor='gray.200'
        p='2'
        borderRadius={'3'}
        mt={'5'}
        w={'96'}
        fontWeight='black'
        fontSize='lg'
        justifyContent='center'
        mx={'auto'}
        alignItems='center'
      >
        <Text>Search Property By Filters</Text>
        <Icon className='' paddingLeft='2' w='8' as={BsFilter} />
      </Flex>
      <div className='w-9/12 mx-auto'>

      { searchFilters && <SearchFilters/> }
      </div>
      
      <Text fontSize='2xl' p='4' ml={'16'} fontWeight='bold'>
        Properties {router.query.purpose}
      </Text>
      <Flex flexWrap='wrap' className='mx-auto justify-center align-center '>
        {properties.map((property) => <Property property={property} key={property.id} />)}
      </Flex>
  {
    properties.length === 0 && (
      <Flex justifyContent='center' alignItems='center' flexDir='column' marginTop='5' marginBottom='5'>
        <Image src={noresult} />
        <Text fontSize='xl' marginTop='3'>No Result Found.</Text>
      </Flex>
    )
  }
    </Box >
  );
};

export async function getServerSideProps({ query }) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);

  return {
    props: {
      properties: data?.hits,
    },
  };
}

export default Search;