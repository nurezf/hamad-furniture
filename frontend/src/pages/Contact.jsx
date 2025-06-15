import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const locations = [
  {
    title: 'Hamad Furniture Factory',
    address: 'Bole Sub City, Zone 5, Addis Ababa, Ethiopia',
    phone: '(+251) 11 123 4567',
    email: 'factory@hamad.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=...', // Replace with full embed URL
    mapLink: 'https://www.google.com/maps/place/Abubaker+Furnitures/@11.1170218,39.6322329,21z/data=!4m6!3m5!1s0x16470b46d6ca7781:0xba0aec0d0bdec930!8m2!3d11.1170214!4d39.6323999!16s%2Fg%2F11s69v88wl?hl=am&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    title: 'Hamad Shop 1',
    address: 'Friendship Building, Ground Floor, Addis Ababa, Ethiopia',
    phone: '(+251) 11 234 5678',
    email: 'shop1@hamad.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=...',
    mapLink: 'https://www.google.com/maps/place/Abubaker+Furnitures/@11.1170218,39.6322329,21z/data=!4m6!3m5!1s0x16470b46d6ca7781:0xba0aec0d0bdec930!8m2!3d11.1170214!4d39.6323999!16s%2Fg%2F11s69v88wl?hl=am&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    title: 'Hamad Shop 2',
    address: 'Edna Mall, 2nd Floor, Addis Ababa, Ethiopia',
    phone: '(+251) 11 345 6789',
    email: 'shop2@hamad.com',
    mapSrc: 'https://www.google.com/maps/embed?pb=...',
    mapLink: 'https://www.google.com/maps/place/Abubaker+Furnitures/@11.1170218,39.6322329,21z/data=!4m6!3m5!1s0x16470b46d6ca7781:0xba0aec0d0bdec930!8m2!3d11.1170214!4d39.6323999!16s%2Fg%2F11s69v88wl?hl=am&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D',
  }
];

const Contact = () => {
  return (
    <div className='px-4 md:px-16 lg:px-28 py-10'>
      <div className='text-center pt-10 border-t'>
        <Title text1="CONTACT" text2="US" />
      </div>

      <div className='my-12 flex flex-col md:flex-row items-center gap-10'>
        <img className='w-full md:max-w-[480px] rounded-xl shadow-lg' src={assets.contact_img} alt="Contact" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-700'>Get in Touch</p>
          <p className='text-gray-600'>
            We'd love to hear from you. Whether you're looking to visit our factory or shop at one of our retail locations,
            find the details below.
          </p>
          <button className='border border-black px-8 py-4 text-sm font-medium hover:bg-black hover:text-white transition-all duration-300'>
            Explore Careers
          </button>
        </div>
      </div>

      {locations.map((loc, index) => (
        <div key={index} className='my-12 border-t pt-10'>
          <h3 className='text-xl font-semibold text-gray-800 mb-2'>{loc.title}</h3>
          <p className='text-gray-600 mb-1'>{loc.address}</p>
          <p className='text-gray-600 mb-1'>Tel: {loc.phone}</p>
          <p className='text-gray-600 mb-4'>Email: {loc.email}</p>
          
          <iframe
            src={loc.mapSrc}
            className='w-full h-[300px] rounded-lg shadow-md border'
            allowFullScreen=""
            loading="lazy"
            title={loc.title}
          ></iframe>

          <a
            href={loc.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-sm text-white bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Open in Google Maps
          </a>
        </div>
      ))}

      <NewsletterBox />
    </div>
  );
};

export default Contact;
