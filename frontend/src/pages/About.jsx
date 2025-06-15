import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px] rounded-lg shadow-md' src={assets.about_img} alt="About Hamad Furniture" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>
            Hamad Furniture is a premier importer and manufacturer of high-quality office furniture based in Addis Ababa, Ethiopia. With years of expertise and a deep understanding of modern workspace needs, we specialize in delivering both luxury and ergonomic office furniture designed to elevate professional environments.
          </p>
          <p>
            Our collection features a wide range of products—from executive desks and ergonomic chairs to conference tables, reception units, and modular workstations. Whether outfitting a corporate office, a startup hub, or a government institution, Hamad Furniture ensures style, durability, and comfort in every piece.
          </p>
          <b className='text-gray-800'>Our Mission</b>
          <p>
            At Hamad Furniture, our mission is to empower businesses with world-class furniture solutions that blend function, aesthetics, and well-being. We are committed to delivering excellence—from product sourcing and in-house manufacturing to personalized customer service and after-sales support.
          </p>
        </div>
      </div>

      <div className='text-xl py-4'>
       <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* Why Choose Us Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-sm mb-20'>
        {[
          {
            title: 'Quality Materials & Craftsmanship',
            desc: 'Every product we offer is crafted from premium materials and goes through rigorous quality control to ensure long-lasting performance.',
          },
          {
            title: 'Elegant & Ergonomic Designs',
            desc: 'We design furniture that not only looks sophisticated but also supports comfort and productivity in the workplace.',
          },
          {
            title: 'Trusted Partner for Institutions',
            desc: 'From corporate offices to government projects, we are a reliable partner trusted for timely delivery and tailored workspace solutions.',
          },
        ].map((item, index) => (
          <div
            key={index}
            className='border border-gray-200 p-8 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:scale-[1.03] transition-transform duration-300 ease-in-out flex flex-col gap-4'
          >
            <b className='text-lg text-gray-800'>{item.title}</b>
            <p className='text-gray-600'>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Newsletter */}
      <NewsletterBox />
    </div>
  );
};

export default About;
