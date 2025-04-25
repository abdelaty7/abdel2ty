import React, { useState, useEffect } from 'react';

const PortfolioCategory = ({ categoriesFilter, allCategory }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  // تعيين أول فئة كفئة نشطة عند تحميل المكون، فقط مرة واحدة
  useEffect(() => {
    if (allCategory.length > 0 && activeCategory === null) {
      const firstCategory = allCategory[0];
      setActiveCategory(firstCategory);
      categoriesFilter(firstCategory); // تطبيق الفلتر على الفئة الأولى
    }
  }, [allCategory, categoriesFilter, activeCategory]);

  const onFilter = (cat) => {
    categoriesFilter(cat);
    setActiveCategory(cat); // تعيين الفئة النشطة بعد الضغط عليها
  };

  return (
    <div className='flex flex-wrap justify-center gap-1.5 sm:gap-3 text-[11px] sm:text-[13px] font-medium'>
      {
        allCategory.length >= 1 && allCategory.map((item, index) => (
          <button
            key={index}
            onClick={() => onFilter(item)}
            className={`transition-all duration-300 ease-in-out py-0.5 px-2.5 rounded-xs cursor-pointer 
              ${activeCategory === item ? 'bg-blue-900 text-white' : 'text-gray-700 hover:text-black'}
              transform`} // تأثير تكبير وتحسين الألوان
          >
            {item}
          </button>
        ))
      }
    </div>
  );
};

export default PortfolioCategory;