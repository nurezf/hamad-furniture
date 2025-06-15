import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const subCategoryMap = {
  Table: ['Material', 'Office', 'Others'],
  Chair: ['Swivel', 'Visitor', 'Others'],
  Shelf: ['Wooden', 'Metal', 'Plastic'],
};

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('none');

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
    setSubCategory([]); // Reset subcategories on category change
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'modelNumber':
        fpCopy.sort((a, b) => {
          const extractNum = (str) => {
            const match = str?.match(/\d+/);
            return match ? parseInt(match[0], 10) : 0;
          };
          return extractNum(a.modelNumber) - extractNum(b.modelNumber);
        });
        break;

      case 'name':
        fpCopy.sort((a, b) => {
          const aName = a.name?.toLowerCase() || '';
          const bName = b.name?.toLowerCase() || '';
          return aName.localeCompare(bName);
        });
        break;

      case 'none':
      default:
        applyFilter();
        return;
    }

    setFilterProducts(fpCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const availableSubCategories = category.flatMap((cat) => subCategoryMap[cat] || []);

  return (
    <div className='flex flex-col sm:flex-row gap-6 pt-10 border-t px-4 sm:px-10 bg-gray-50'>
      {/* Filter Panel */}
      <div className='min-w-60'>
        <p
          onClick={() => setShowFilter(!showFilter)}
          className='my-2 text-xl flex items-center cursor-pointer gap-2 font-semibold'
        >
          FILTERS
          <img
            className={`h-3 sm:hidden transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt='dropdown'
          />
        </p>

        <div className={`border border-gray-300 p-4 rounded-lg bg-white ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-2 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm text-gray-700'>
            {['Table', 'Chair', 'Shelf'].map((cat) => (
              <label key={cat} className='flex items-center gap-2'>
                <input type='checkbox' value={cat} onChange={toggleCategory} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {availableSubCategories.length > 0 && (
          <div className={`border border-gray-300 p-4 rounded-lg mt-5 bg-white ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-2 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm text-gray-700'>
              {availableSubCategories.map((type) => (
                <label key={type} className='flex items-center gap-2'>
                  <input type='checkbox' value={type} onChange={toggleSubCategory} />
                  {type}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Display Section */}
      <div className='flex-1'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className='border border-gray-300 px-3 py-2 text-sm rounded-md bg-white'
          >
            <option value='none'>Sort: None</option>
            <option value='modelNumber'>Sort: Model Number (e.g. HF-001 → HF-999)</option>
            <option value='name'>Sort: Product Name (A-Z)</option>
          </select>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filterProducts.map((item, index) => (
            <div
              key={index}
              className="transition-transform duration-300 hover:scale-[1.03]"
            >
              <ProductItem
                name={item.name}
                id={item._id}
                image={item.image}
                hoverImage={item.hoverImage || item.image}
              />
            </div>
          ))}
        </div>

        {filterProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-6">No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default Collection;
